import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { apiCreateOrder } from '../../apis';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// This value is from the props in the UI
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, currency, amount, payload, setIsSuccess }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);
  const handleSaveOrder = async () => {
    const response = await apiCreateOrder({ ...payload, status: 'Success' });
    if (response.success) {
      setIsSuccess(true);
      setTimeout(() => {
        Swal.fire('Congratulation!!!', 'Order was Created', 'success').then(() => window.close());
        navigate('/');
      }, 1500);
    }
  };

  return (
    <>
      {showSpinner && isPending && <div className="spinner">Loading...</div>}
      <PayPalButtons
        style={style}
        disabled={isPending}
        // Remove unnecessary forceReRender prop
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [{ amount: { currency_code: currency, value: amount } }],
            })
            .then((orderId) => orderId)
        }
        onApprove={(data, actions) => {
          actions.order.capture().then(async (response) => {
            console.log(payload);
            console.log(response);
            if (response.status === 'COMPLETED') {
              handleSaveOrder();
            }
          });
        }}
      />
    </>
  );
};

export default function Paypal({ amount, payload, setIsSuccess }) {
  return (
    <div style={{ maxWidth: '750px', minHeight: '200px', margin: 'auto' }}>
      <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
        <ButtonWrapper showSpinner={false} currency={'USD'} amount={amount} payload={payload} setIsSuccess={setIsSuccess} />
      </PayPalScriptProvider>
    </div>
  );
}
