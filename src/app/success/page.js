'use client'
import React, {  useEffect } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { useStateContext } from '../context/Statecontext';
import { runFireworks } from './utils';

const Success = () => {
  const router = useRouter();

  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);
  
  const goToHome = () => {
    router.push('/');
  }
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:itshamzanawaz@gmail.com">
            DealsTime.Order@gmail.com
          </a>
        </p>
        
          <button type="button" width="300px" className="btn" onClick={goToHome}>
            Continue Shopping
          </button>
        
      </div>
    </div>
  )
}

export default Success