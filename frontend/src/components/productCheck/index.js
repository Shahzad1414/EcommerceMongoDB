import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { MyContext } from "../../App";

const Product = (props) => {
    const {data} = props;
  console.log(props, "check value");
  let location = useLocation();

  return (
    <>

     {data?.map((item, indexedDB) => {
        return (
          <div className="productThumb" key={indexedDB}>
            <span className={`badge ${item.tag}`}>{item.tag}</span>

            <Link to={`/product/${item.id}`}>
              <div className="imgWrapper">
                <div className="p-4 wrapper mb-3">
                  <img src={item.images[0]} className="w-100" />
                </div>

                <div className="overlay transition">
                  <ul className="list list-inline mb-0">
                    <li className="list-inline-item">
                      <a className="cursor" tooltip="Add to Wishlist">
                        <FavoriteBorderOutlinedIcon />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="cursor" tooltip="Compare">
                        <CompareArrowsOutlinedIcon />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="cursor" tooltip="Quick View">
                        <RemoveRedEyeOutlinedIcon />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>

            <div className="info">
              <span className="d-block catName">{item.category}</span>
              <h4 className="title">
                <Link>{item.title.substr(0, 50) + "..."}</Link>
              </h4>
              <Rating
                name="half-rating-read"
                value={parseFloat(item.totalrating)}
                precision={0.5}
                readOnly
              />
              <span className="brand d-block text-g">
                By <Link className="text-g">{item.brand}</Link>
              </span>

              <div className="d-flex align-items-center mt-3">
                <div className="d-flex align-items-center w-100">
                  <span className="price text-g font-weight-bold">
                    Rs {item.price}
                  </span>
                  {/* <span className='oldPrice ml-auto'>Rs {item.oldPrice}</span> */}
                </div>
              </div>

              <Button
                className="w-100 transition mt-3"
                // onClick={() => addToCart(item)}
              >
                <ShoppingCartOutlinedIcon />
                {/* {isAdded === true ? "Added" : "Add"} */}
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Product;
