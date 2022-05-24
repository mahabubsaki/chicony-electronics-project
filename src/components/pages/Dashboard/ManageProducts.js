import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import ManageProductCard from './ManageProductCard';
import ProductModal from './ProductModal';

const ManageProducts = () => {
    const navigate = useNavigate()
    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
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
            navigate('/')
            toast.error('Something Went Wrong', toastConfig)
            signOut(auth)
            localStorage.removeItem('accessToken')
        }
    })
    if (loading || isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className="text-center font-bold text-3xl my-3">{data?.data?.length} Products available in this site</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
                {data?.data?.map(product => <ManageProductCard
                    key={product._id}
                    product={product}
                    setProductModal={setProductModal}
                    refetch={refetch}
                ></ManageProductCard>)}
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