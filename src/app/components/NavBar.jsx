"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../assets/gslogo.webp";
import Logo1 from "../../../assets/shopping-cart.svg";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { useStateContext } from "../context/Statecontext";
const NavBar = () => {
  const { totalQuantities } = useStateContext();
  const [list, setList] = useState(false);
  const newin = "newin";
  const bestreview = "best-review";
  const bestseller = "best-seller";

  const categories_list = [
    { title: "new in", category: "newin" },
    { title: "Top Seller", category: "top-seller" },
    { title: "Best Review", category: "best-review" },
  ];
  return (
    <div className="main-nav-container">
      <div className="logo flex align-middle width-1">
        <Link href={"/"}>
          <Image
            src={Logo}
            alt="logo"
            width={100}
            height={100}
            className="img-logo logo1"
          />
        </Link>
        <div className="flex flex-col">
          <button>
            <IoIosMenu
              id="menu"
              className={list && "mt-40"}
              onClick={() => {
                setList(!list);
              }}
            />
          </button>
          {list && (
            <ul className="bg-slate-300 text-black rounded-md z-50 p-8 space-y-12">
              {categories_list.map((item) => {
                return(
                <Link href={`/category/${item.category}` } key={Link.category}>
                  {" "}
                  <li>{item.title}</li>
                </Link>
          )})}
            </ul>
          )}
        </div>
        <ul className="ul-1 space-x-6 font-semibold ml-5">
        {categories_list.map((item) => {
          return(
          <Link href={`/category/${item.category}`} key={Link.category}>
            {" "}
            <li>{item.title}</li>
          </Link>
  )})}
        </ul>
      </div>
      <div>
        <Link href={"/cart"}>
          <span className="cart-item-qty mr-8">{totalQuantities}</span>
          <Image
            src={Logo1}
            className="text-black img-logo"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
