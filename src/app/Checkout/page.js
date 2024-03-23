"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Form, Input, Switch, message } from "antd";
import { useStateContext } from "../context/Statecontext";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";


const Page = () => {
  const [form] = Form.useForm();
  const [btp, setBtp] = useState(false);
  const [cdp, setCdp] = useState(false);
  const [formData, setFormData] = useState(null);
  const { totalPrice, cartItems } = useStateContext();

const router = useRouter()

  const placeOrder = () => {
    if (formData === null) {
      message.error("please fill Full Billing Form");
    }
  };

  const handlesubmit = async (data) => {
    console.log(data);
    setFormData(data);
    try {
      const response = await axios.post(
        "https://api-ap-south-1.hygraph.com/v2/clt05bx260pne07wekcgnv3a2/master",
        {
          query: `
          mutation MyMutation {
            createOrder(
              data: {address: "${data.address}", apartnumber: "${data.apartnumber}", city: "${data.city}", companyName: "${data.companyName}", country: "${data.country}", email: "${data.email}", firstName: "${data.firstName}", lastName: "${data.lastName}", phone: "${data.phone}", state: "${data.state}", zipcode: "${data.zipcode}",note:"${data.Notes}",total:${totalPrice} ,items:"${cartItems}"}
            ) {
              address
              apartnumber
              city
              companyName
              country
              email
              firstName
              id
              lastName
              phone
              state
              total
              zipcode
              note
              total
              items
            }
          }
          `,
        }
      );

      const {
        data: { createOrder },
      } = response.data;

      
      router.push("/success");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const onChange = () => {
    console.log("first");
  };

  const onChange1 = () => {
    console.log("first");
  };

  return (
    <div>
      <NavBar />
      <h1 className="m-4 text-4xl text-center text-slate-400 font-semibold">
        CheckOut
      </h1>
      {cartItems.length < 1 ? (
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
      ) : (
        <div className="flex flex-row justify-between ">
          <div>
            <h1 className="text-black font-bold text-2xl m-10 p-4">
              Billing Details
            </h1>
            <Form
              form={form}
              onFinish={handlesubmit}
              id="formEvents"
              layout="vertical"
              className="main-form bg-slate-200"
            >
              {" "}
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please enter Country !" }]}
              >
                <Input placeholder="Country" />
              </Form.Item>
              <div className="flex justify-between">
                <Form.Item
                  label="FirstName"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter FirstName !" },
                  ]}
                >
                  <Input
                    placeholder="First name"
                    className="width-input-half"
                  />
                </Form.Item>
                <Form.Item
                  label="LastName"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter LastName !" },
                  ]}
                >
                  <Input placeholder="Last name" className="width-input-half" />
                </Form.Item>
              </div>
              <Form.Item
                label="CompanyName"
                name="companyName"
                rules={[
                  { required: true, message: "Please enter CompanyName !" },
                ]}
              >
                <Input placeholder="Company name" />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please enter Address !" }]}
              >
                <Input placeholder="Address" />
              </Form.Item>
              <Form.Item
                label="Apartment or House number"
                name="apartnumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter Apartnumber House number!",
                  },
                ]}
              >
                <Input placeholder="Apartment , House number" />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please enter city!",
                  },
                ]}
              >
                <Input placeholder="Apartment , House number" />
              </Form.Item>
              <div className="flex justify-between">
                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: true, message: "Please enter State !" }]}
                >
                  <Input
                    placeholder="Province or State"
                    className="width-input-half"
                  />
                </Form.Item>
                <Form.Item
                  label="ZipCode"
                  name="zipcode"
                  rules={[
                    { required: true, message: "Please enter ZipCode !" },
                  ]}
                >
                  <Input
                    placeholder="Postal/Zip code"
                    className="width-input-half"
                  />
                </Form.Item>
              </div>
              <div className="flex justify-between">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please enter Email !" }]}
                >
                  <Input placeholder="Email" className="width-input-half" />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: "Please enter Phone !" }]}
                >
                  <Input placeholder="Phone" className="width-input-half" />
                </Form.Item>
              </div>
              <Form.Item
                label="Note"
                name="Notes"
                rules={[{ required: true, message: "Please enter Notes !" }]}
              >
                <textarea placeholder="Notes" className="width-ta" />
              </Form.Item>
              <input
                type="submit"
                className="width-ta hover:bg-black hover:text-white"
              />
            </Form>
          </div>
          <div className="Place-Order m-8 mt-0 ">
            <h1 className="text-black font-bold text-2xl m-10 p-4">
              Your Orders
            </h1>
            <div className="bg-slate-200 p-10 rounded-lg flex flex-col justify-center">
              <table className=" rounded-md">
                <thead className="border-th-f p-10">
                  <tr className="m-8 p-8">
                    <th className="m-8 p-8">Product</th>
                    <th className="m-8 p-8">Price</th>
                  </tr>
                </thead>

                {cartItems.length >= 1 &&
                  cartItems.map((item) => {
                    return (
                      <tr key={item.slug} className="border-tr-f">
                        <td className="m-8 p-8">
                          {item.title} X {item.quantity}
                        </td>
                        <td className="m-8 p-8">{item.price}</td>
                      </tr>
                    );
                  })}
                <tr className="border-tr-f">
                  <th className="m-8 p-8">Cart Total</th>
                  <th className="m-8 p-8">Pkr {totalPrice}</th>
                </tr>
                <tr className="border-tr-f">
                  <th className="m-8 p-8">Shipping Fee</th>
                  <th className="m-8 p-8">Pkr 250</th>
                </tr>
                <tr className="border-tr-f">
                  <th className="m-8 p-8">Sub Total</th>
                  <th className="m-8 p-8">Pkr {totalPrice + 250}</th>
                </tr>
              </table>
              <div>
                <h1
                  className="font-bold text-2xl"
                  onClick={() => {
                    setBtp(!btp);
                  }}
                >
                  Direct Bank Transfer
                </h1>
                <Switch defaultChecked onChange={onChange} />
                {btp && (
                  <p>
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order won’t be
                    shipped until the funds have cleared in our account.
                  </p>
                )}
                <h1
                  className="font-bold text-2xl"
                  onClick={() => {
                    setCdp(!cdp);
                  }}
                >
                  Cash on Delivery
                </h1>
                <Switch defaultChecked onChange={onChange1} />
                {cdp && (
                  <p>
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order won’t be
                    shipped until the funds have cleared in our account.
                  </p>
                )}
              </div>
              <button
                className="w-44 h-24 m-12 bg-teal-600 rounded-full text-white text-center hover:bg-teal-300 hover:transition-all hover:scale-110 text-2xl font-bold"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Page;
