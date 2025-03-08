import './App.css';
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './screens/Home';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Link
} from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ComponentReducer.js';
import MyOrder from './screens/MyOrder';
import PaymentSuccess from './screens/PaymentSuccess';
import PaymentFail from './screens/PaymentFail';
import PaymentCancel from './screens/PaymentCancel';

function App() {
  return (
    <CartProvider>

      <Router>
        <div>

          <Routes>

            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/creatuser" element={<SignUp />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/payment-success" element={<PaymentSuccess />} />
            <Route exact path="/payment-fail" element={<PaymentFail />} />
            <Route exact path="/payment-cancel" element={<PaymentCancel />} />

          </Routes>

        </div>
      </Router>

      </CartProvider>
   

  );
}

export default App;
