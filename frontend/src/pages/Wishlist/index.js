import React, {useRef, useState } from 'react';


import "./style.css";
import Product from '../../components/product';

const Wishlist= (props) =>{
    const wishlistAddUser = props.data;

    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const productRow=useRef();


    return(
        <div className="productRow" ref={productRow}>

        {
            wishlistAddUser?.length !== 0 &&
            wishlistAddUser?.map((item, index) => {
                return (
                    <div className='item' key={index}>

                        <Product tag={item.type} item={item} wishlistProduct={true}/>
                    </div>
                )
            })
        }

    </div>
        
    )
}

export default Wishlist;