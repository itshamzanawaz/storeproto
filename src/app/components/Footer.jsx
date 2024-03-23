"use client";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { RiTiktokLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer>
      <div className="flex flex-col sm:flex-row justify-center align-middle m-20 mb-8">
        <div className="sm:m-20 mb-8">
          <h1 className="text-black text-3xl sm:w-96 text-center">
            Get updates on fun stuff you probably want to know about in your
            inbox
          </h1>
          <input
            placeholder="Email..."
            onChange={() => {
              setEmail(e.value.target);
            }}
            className="email w-44 sm:w-96 mt-6"
            value={email}
          />
        </div>
        <div className="my-20 sm:mx-20">
          <h1 className="font-semibold mb-5">Menu</h1>
          <ul>
            <li>Shop All</li>
            <li>Vibes</li>
            <li>About Us</li>
            <li>Community</li>
          </ul>
        </div>
        <div className="my-20 sm:mx-20 mb-8">
          {" "}
          <h1 className="font-semibold mb-5">Support</h1>
          <ul>
            <li>Shipping and returns</li>
            <li>Help & FAQ</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="flex m-8 text-center justify-center ">
        <a href="facebook">
          <FaFacebook className="text-2xl mx-4" />
        </a>
        <a href="facebook">
          <RiTiktokLine className="text-2xl mx-4" />
        </a>

        <a href="facebook">
          <FaInstagram className="text-2xl mx-4" />
        </a>
      </div>
      <p className="text-center m-6">All Rights Reserved copyright 2024</p>
    </footer>
  );
};

export default Footer;
