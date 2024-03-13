import React, { useContext, useEffect, useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

//import { Container } from 'react-bootstrap';

const PaymentMethodScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [ paymentMethodName, setPaymentMethod]   = useState(
    paymentMethod || 'PayPal' 
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1>Payment Method</h1>
        <Form
          onSubmit={submitHandler}
          style={{
            width: '600px',
          }}
        >
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              value="PayPal"
              label="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              value="Stripe"
              label="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Direct_Bank_Transfer"
              value="Direct_Bank_Transfer"
              label="Direct Bank Transfer"
              checked={paymentMethodName === 'Direct_Bank_Transfer'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="mb">
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: '#ff006a' }}
            >
              Continue
            </Button>
          </div>
          <br />
          <br />
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
