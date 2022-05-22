import React from 'react';

const Product = ({ product }) => {
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
                    <button className="btn btn-primary">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;