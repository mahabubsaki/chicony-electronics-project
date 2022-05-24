import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import AdminProducCard from './AdminProducCard';
import ProductModal from './ProductModal';

const ManageProducts = () => {
    const [user, loading] = useAuthState(auth)
    const [productModal, setProductModal] = useState(null)
    const { data, isLoading, refetch } = useQuery(['allProducts-admin', user], async () => {
        try {
            return await axios({
                method: 'GET',
                url: `http://localhost:5000/admin-all-product`,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email
                }
            })
        }
        catch (err) {

        }
    })
    if (loading || isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className="text-center font-bold text-3xl my-3">{data?.data?.length} Products available in this site</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
                {data?.data?.map(product => <AdminProducCard
                    key={product._id}
                    product={product}
                    setProductModal={setProductModal}
                    refetch={refetch}
                ></AdminProducCard>)}
            </div>
            {productModal && <ProductModal
                refetch={refetch}
                product={productModal}
                setProductModal={setProductModal}
            ></ProductModal>}
        </div>
    );
};

export default ManageProducts;