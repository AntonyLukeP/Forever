import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import AllRoutes from './routes/AllRoutes'
import { Toaster } from 'sonner'

import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Toaster position='top-right' />
    <AllRoutes/>
    </BrowserRouter>
    </Provider>
  )
}

export default App