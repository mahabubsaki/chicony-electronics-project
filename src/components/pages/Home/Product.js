import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const navigate = useNavigate()
    const { name, available, minimum, id, description, price, img } = product;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Product" className="rounded-xl h-[200px]" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className="flex flex-col mt-4 gap-2">
                    <h1 className='text-xl'>Available : {available} pices</h1>
                    <h1 className='text-xl'>Minimum Buy : {minimum} pices</h1>
                    <h1 className='text-xl'>Price Per Piece : ${price}</h1>
                    <button className="btn btn-primary" onClick={() => navigate(`/product/${id}`)} disabled={available === 0}>Order Now</button>
                    {available === 0 && <p className="text-center text-error">Stock Out</p>}
                </div>
            </div>
        </div>
    );
};

export default Product;