import axios from 'axios';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import NotFound from '../NotFound/NotFound';

const Payment = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)
    const { orderId } = useParams()
    const { data, isLoading } = useQuery(['order', orderId], async () => {
        try {
            return await axios({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email
                },
                url: `http://localhost:5000/payment?id=${orderId}`
            })
        }
        catch (err) {

        }
    })
    const { status, productName, productImg, cost, phone, address, quantity } = data?.data || {}
    useEffect(() => {
        if (status !== 'Not Paid') {
            navigate('/')
        }
    }, [status])
    if (!data?.data) {
        return <NotFound></NotFound>
    }
    if (loading || isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="min-h-[500px] grid grid-cols-1 sm:grid-cols-2">
            <div className="flex justify-center items-center">
                <img src={productImg} alt="" className="w-full" />
            </div>
            <div className="flex justify-center items-center">
                <div>
                    <h1 className="text-bold text-3xl">Order Information</h1>
                    <p className="text-lg">Product Name : {productName}</p>
                    <p className="text-lg">Phone : {phone}</p>
                    <p className="text-lg">Address : {address}</p>
                    <p className="text-lg">Quantity : {quantity} pieces</p>
                    <p className="text-lg">Cost : ${cost}</p>
                </div>
            </div>
        </div>
    );
};

export default Payment;