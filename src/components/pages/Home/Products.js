import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../utilities/Loading';
import Product from './Product';

const Products = () => {
    const { data, isLoading } = useQuery('products', async () => {
        return await axios({
            method: 'GET',
            url: 'http://localhost:5000/all-products'
        })
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="mb-5" id="product-div">
            <h1 className="text-3xl text-center mb-5">Products Available</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {
                    data?.data?.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    );
};

export default Products;