"use client";
import React from "react";
import { useStateContext } from "../context/Statecontext";
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai"; // Correct import statement for icons
import Link from "next/link";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Cart = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  return (
    <div>
      <NavBar />
      <div>
        <h1 className="text-center text-4xl font-semibold text-slate-400 p-10">
          Shopping Cart
        </h1>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="flex justify-center align-middle size-table">
          <table className="size-table sm:scale-100 scale-50  ">
            <tbody>
              {cartItems.length >= 1 && (
                <div>
                  {
                    <thead className="border-th">
                      <tr className="border-b1">
                        <th className="p-6">Image</th>

                        <th className="p-6">Product</th>
                        <th className="p-6">Quantity</th>
                        <th className="p-6">Price</th>
                        <th className="p-6">Total</th>
                        <th className="p-6"></th>
                      </tr>
                    </thead>
                  }
                  {cartItems.length >= 1 && cartItems.map((item) => (
                    <tr key={item.id} className=" align-middle">
                      <td className="text-center m-5 p-5">
                        {" "}
                        <img
                          src={item.image[0].url}
                          className="w-40 h-24 sm:h-40"
                        />
                      </td>
                      <td className="text-center m-5 p-5">{item.title}</td>
                      <td className="text-center m-5 p-5">
                        <div>
                          <div>
                            <p className="flex flex-row text-center align-middle space-x-4">
                              <span
                                onClick={() =>
                                  toggleCartItemQuanitity(item.id, "dec")
                                }
                              >
                                <AiOutlineMinus className="text-center text-red-600 text-lg" />
                              </span>
                              <span>{item.quantity}</span>
                              <span
                                onClick={() =>
                                  toggleCartItemQuanitity(item.id, "inc")
                                }
                              >
                                <AiOutlinePlus className="text-center text-cyan-600 text-lg" />
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center m-5 p-5">{item.price}</td>
                      <td className="text-center m-5 p-5">
                        {item.quantity * item.price}
                      </td>
                      <td className="text-center m-5 p-5">
                        <button onClick={() => onRemove(item.id)}>
                          Remove
                        </button>{" "}
                        {/*Added onClick handler*/}
                      </td>
                    </tr>
                  ))}
                </div>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center space-x-4 text-2xl font-semibold m-10">
          <h1>Sub Total : Pkr {totalPrice} </h1>
          <h1>Total Quantities : {totalQuantities} </h1>
        </div>
        {cartItems.length >= 1 && (
          <div className="flex  justify-center space-x-10">
            <button className="w-48 text-white font-semibold hover:transition-all hover:scale-110 sm:scale-100 scale-75  rounded-full h-16 bg-teal-500">
              <Link href={"/"}> Continue Shopping</Link>
            </button>
            <button className="w-48 text-white hover:transition-all hover:scale-110 font-semibold rounded-full h-16 sm:scale-100 scale-75 bg-teal-900">
              <Link href={"/Checkout"}> CheckOut</Link>
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
