import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ClearIcon from '@mui/icons-material/Clear';

import { addToWishlist } from "../../features/products/productSlice";

import { MyContext } from '../../App';
import { useDispatch } from 'react-redux';
import { getUserProductWishlist } from '../../features/users/userSlice';


const Product = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productData, setProductData] = useState();
    const [isAdded, setIsadded] = useState(false);
    
    console.log(props, "inside Product Component");

    const context  = useContext(MyContext);

    useEffect(() => {
        setProductData(props.item);
    }, [])

    const setProductCat=()=>{
        sessionStorage.setItem('parentCat', productData.parentCatName);
        sessionStorage.setItem('subCatName', productData.subCatName);
    }


    const addToCart=(item)=>{
        context.addToCart(item);
        setIsadded(true);
    }

    const addWishlist = (id) => {
        console.log(id, "addtowishlist id");
        dispatch(addToWishlist(id))

    
    }

    return (
        <div className='productThumb' onClick={setProductCat}>
            {/* {
                // productData.tags !== null && productData.tags !== undefined &&
                <span className={`badge ${productData.tags}`}>{productData.tags}</span>
            } */}

            {
                productData !== undefined &&
                <>
                   
                        <div className='imgWrapper'>
                            <div className='p-4 wrapper mb-3'>
                               
                                <img  src={productData.images[0].url+'?im=Resize=(420,420)'} className='w-100' />
                               
                            </div>

                            <div className='overlay transition' >
                                <ul className='list list-inline mb-0'>
                                  
                                    <li className='list-inline-item' onClick={()=>{addWishlist(productData?._id)}}>
                                       
                                           {props.wishlistProduct ? <a className='cursor' tooltip="Remove to Wishlist" >
                                            <ClearIcon />
                                            </a> :
                                            <a className='cursor' tooltip="Add to Wishlist" ><FavoriteBorderOutlinedIcon /></a>} 
                                            
                                        
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Compare">
                                            <CompareArrowsOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className='list-inline-item' onClick={()=>{navigate("/product/"+productData._id)}}>
                                        <a className='cursor' tooltip="Quick View">
                                            <RemoveRedEyeOutlinedIcon />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    <div className='info' onClick={()=>{navigate("/product/"+productData._id)}}>
                        <span className='d-block catName'>{productData.category}</span>
                        <h4 className='title'><Link>{productData.title.substr(0,50)+'...'}</Link></h4>
                        <Rating name="half-rating-read" 
                        value={parseFloat(productData.totalrating)} precision={0.5} readOnly />
                        <span className='brand d-block text-g'>By <Link className='text-g'>{productData.brand}</Link></span>

                        <div className='d-flex align-items-center mt-3'>
                            <div className='d-flex align-items-center w-100'>
                                <span className='price text-g font-weight-bold'>
                                    Rs {productData.price}</span> 
                                    {/* <span className='oldPrice ml-auto'>Rs {productData.oldPrice}</span> */}
                            </div>
                        </div>

                        <Button className='w-100 transition mt-3' onClick={()=>addToCart(productData)}><ShoppingCartOutlinedIcon /> 
                            {
                                isAdded===true ? 'Added' : 'Add'
                            }
                        </Button>
                    </div>
                </>
            }

        </div>
    )
}

export default Product;