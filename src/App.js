import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/Modal';
import Navbar from 'components/Navbar';
import Loading from 'components/Loading';
import CartContainer from 'components/CartContainer';
import { fetchCartItems } from 'features/cart/cartSlice';
import { calculateTotals } from 'features/cart/cartSlice';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <ToastContainer />
      <CartContainer />
    </main>
  );
}

export default App;
