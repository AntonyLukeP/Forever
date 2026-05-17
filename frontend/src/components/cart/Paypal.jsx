import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({ amount, onSuccess, onError }) => {
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

    const initialOptions = {
        "client-id": clientId,
        currency: "USD",
        intent: "capture",
        "disable-funding": "credit,card" // Optional: hide credit card option
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: parseFloat(amount).toFixed(2),
                    currency_code: "USD"
                },
                description: "RabbitStore Purchase"
            }]
        });
    };

    const onApprove = async (data, actions) => {
        try {
            const details = await actions.order.capture();
            console.log("Payment successful:", details);
            onSuccess(details);
        } catch (error) {
            console.error("Payment capture error:", error);
            onError(error);
        }
    };

    const onPayPalError = (err) => {
        console.error("PayPal Error:", err);
        onError(err);
    };

    const onCancel = (data) => {
        console.log("Payment cancelled:", data);
    };

    if (!clientId) {
        return <div>PayPal Client ID not configured</div>;
    }

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onPayPalError}
                onCancel={onCancel}
                style={{
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal'
                }}
            />
        </PayPalScriptProvider>
    );
};

export default Paypal;