import React, { useEffect, useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../utilities/Loading';
import { signOut } from 'firebase/auth';

const PaymentFrom = ({ product }) => {
    const [user, authLoading] = useAuthState(auth)
    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false)
    // setting client secret and creating payment intent with page first time load
    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const { data } = await axios({
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        email: user?.email
                    },
                    data: product,
                    url: `http://localhost:5000/create-payment-intent`
                })
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            }
            catch (err) {
                navigate('/')
                toast.error('Something Went Wrong', toastConfig)
                signOut(auth)
                localStorage.removeItem('accessToken')
            }
        }
        createPaymentIntent()
    }, [product, user])
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: 'First Last',
                address: { postal_code: '90210' }
            },
        });
        // showing toast if any error occur
        if (error) {
            setLoading(false)
            toast.error(error.message, toastConfig)
            return
        }
        // setting up billing details 
        const { paymentIntent, error1 } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: product.email,
                        name: product.name,
                        phone: product.phone,
                    },
                },
            },
        );
        // showing toast if any error occur
        if (error1) {
            setLoading(false)
            toast.error(error1?.message, toastConfig)
            return
        }
        if (!error1) {
            try {
                // if all is ok then setting status of order to paid
                const { data } = await axios({
                    method: 'PUT',
                    data: {
                        paymentId: paymentIntent.id,
                        status: 'Paid',
                    },
                    url: `http://localhost:5000/complete-payment?id=${product.orderId}`,
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        email: user?.email,
                    }
                })
                if (data.acknowledged) {
                    // if all ok navigating to order page with toast
                    setLoading(false)
                    toast.success('Your payment recieved successfully', toastConfig)
                    navigate('/dashboard/orders')
                }
                else {
                    setLoading(false)
                    toast.error('Something went wrong, please try again', toastConfig)
                }
            }
            catch (err) {
                navigate('/')
                toast.error('Something Went Wrong', toastConfig)
                signOut(auth)
                localStorage.removeItem('accessToken')
            }
        }
    };
    if (authLoading) {
        return <Loading></Loading>
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className="btn bg-green-500 border-0 block mx-auto mt-2" disabled={!stripe || !clientSecret || !product.status === 'Not Paid'}>
                    Pay ${product?.cost}
                </button>
                {
                    product.status !== 'Not Paid' && <p className="font-bold">
                        You have already paid this product
                    </p>
                }
            </form>
            {loading &&
                <div className="flex justify-center my-3">
                    <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
            }
        </>
    );
};

export default PaymentFrom;