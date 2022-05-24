import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import { loadStripe } from '@stripe/stripe-js';
import NotFound from '../NotFound/NotFound';
import {
    Elements,
} from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

const Payment = () => {
    const [stripePromise, setStripePromise] = useState(() => loadStripe('pk_test_51L1169ERhNvrJqfb95HV9RKyiSyhJkiwMPJYAf2sSsVKGTedSm0qr1heEwq7sYvOIaxWlI0DrmorUQzk40ekn3Nh00Cfe6cxc8'))
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
    const { orderId } = useParams()
    const { data, isLoading } = useQuery(['order-payment-user', orderId], async () => {
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
            navigate('/')
            toast.error('Something Went Wrong', toastConfig)
            signOut(auth)
            localStorage.removeItem('accessToken')
        }
    })
    const { productName, productImg, cost, phone, address, quantity } = data?.data || {}
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
                    <div className="w-full my-3">
                        <Elements stripe={stripePromise}>
                            <PaymentForm
                                product={data?.data}
                            ></PaymentForm>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;