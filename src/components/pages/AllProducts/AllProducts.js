import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../utilities/Loading';
import Product from '../Home/Product';

const AllProducts = () => {
    // homepage have a limit of 6 products so all products showen will be here
    const { data, isLoading } = useQuery('all-products', async () => {
        return await axios({
            method: 'GET',
            url: 'http://localhost:5000/all-products?location=true'
        })
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="min-h-[500px] my-10">
            <h1 className="text-3xl text-center">Total Products Available {data?.data?.length}</h1>
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

export default AllProducts;