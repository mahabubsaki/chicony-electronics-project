import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../utilities/Loading';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import useAdminCheck from '../../hooks/useAdminCheck';
import NotFound from '../NotFound/NotFound';

const SingleProduct = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)
    const [error, setError] = useState('')
    const [quantityInput, setQuantityInput] = useState(0)
    // checking if admin or user
    const { admin } = useAdminCheck(user?.email)
    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    // getting parametar by useparam
    const { productId } = useParams()
    const [processing, setProcessing] = useState(false)
    // data loaded with usequery
    const { data, isLoading, refetch } = useQuery(['singleProduct-user', productId], async () => {
        try {
            return await axios({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email
                },
                url: `https://mysterious-shore-40767.herokuapp.com/product?id=${productId}`
            })
        }
        catch (err) {
            navigate('/')
            toast.error('Something Went Wrong', toastConfig)
            signOut(auth)
            localStorage.removeItem('accessToken')
        }
    })
    // destructuring usequery data
    const { img, name, available, id, minimum, price, description } = data?.data || {}
    // on first page load setting qunatity input state to minimum quantity
    useEffect(() => {
        if (minimum) {
            setQuantityInput(minimum)
        }
    }, [minimum])
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = ({ phone, address }) => {
        setProcessing(true)
        // checking if it is not user
        if (admin) {
            toast.error('Admin can not place order', toastConfig)
            setProcessing(false)
            setQuantityInput(minimum)
            reset()
            return
        }
        // some extra check if user somehow able to click purchase button with invalid or unwanted input
        if (isNaN(parseInt(quantityInput)) || quantityInput <= 0) {
            toast.error('Invalid Quantity Given', toastConfig)
            setProcessing(false)
            setQuantityInput(minimum)
            reset()
            return
        }
        if (parseInt(quantityInput) < minimum) {
            toast.error(`You have to set the quantity minimum ${minimum}`, toastConfig)
            setProcessing(false)
            setQuantityInput(minimum)
            reset()
            return
        }

        if (parseInt(quantityInput) > available) {
            toast.error(`You can't set the quantity more than ${available}`, toastConfig)
            setProcessing(false)
            setQuantityInput(minimum)
            reset()
            return
        }
        // asking confirmation
        Swal.fire({
            text: `Do you want order ${parseInt(quantityInput)} pieces ${name} for $${parseInt(quantityInput) * price}?`,
            icon: 'info',
            title: 'Your Order',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                const saveOrder = async () => {
                    try {
                        // processing order if all ok
                        const { data } = await axios({
                            method: 'POST',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                email: user?.email
                            },
                            data: {
                                productId: id,
                                phone: phone,
                                address: address,
                                quantity: parseInt(quantityInput),
                                cost: parseInt(quantityInput) * price,
                                orderId: Math.round(Math.random() * 100000000000).toString(16),
                                email: user?.email,
                                productName: name,
                                productImg: img,
                                status: 'Not Paid',
                            },
                            url: `https://mysterious-shore-40767.herokuapp.com/add-order?current=${available - parseInt(quantityInput)}`
                        })
                        if (data.acknowledged) {
                            // showing the actual data immediately if order saved in backend successfully
                            refetch()
                            setProcessing(false)
                            toast.success('Your Order Placed Successfully', toastConfig)
                        }
                        else {
                            setProcessing(false)
                            toast.error('Something went wrong', toastConfig)
                        }
                    }
                    catch (err) {
                        setProcessing(false)
                        navigate('/')
                        toast.error('Something Went Wrong', toastConfig)
                        signOut(auth)
                        localStorage.removeItem('accessToken')
                    }
                }
                saveOrder()
            }
        })
        setProcessing(false)
        reset()
    }
    // this use effect will keep eye on quantityInput and show error if users input is incorrect
    useEffect(() => {
        if (quantityInput) {
            if (quantityInput < minimum) {
                setError(`You have to set the quantity minimum ${minimum}`)
            }
            else if (quantityInput > available) {
                setError(`You can't set the quantity more than ${available}`)
            }
            else {
                setError('')
            }
        }
    }, [quantityInput, available, minimum])
    // showing not found page if any user set invalid parameter in searchbox
    if (!data?.data) {
        return <NotFound></NotFound>
    }
    if (isLoading || loading) {
        return <Loading></Loading>
    }
    return (
        <div className="min-h-[500px] grid gap-2 grid-cols-1 md:grid-cols-2">
            <div className="flex justify-center items-center">
                <div className="text-center">
                    <img src={img} alt="" width="350" height="350" className='border rounded-xl mx-auto' />
                    <h1 className="text-3xl">{name}</h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col">
                <div className="text-xl font-bold">
                    <h1>Available Pieces : {available}</h1>
                    <h1>Minimum Buy : {minimum} Pieces</h1>
                    <h1>Price Per Piece : ${price}</h1>
                </div>
                <div className="w-4/5 mt-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" value={user?.email} disabled readOnly className='w-full p-2 rounded-md border border-info mb-2 bg-[#d3cece]' />
                        <input type="text" value={user?.displayName} disabled readOnly className='w-full p-2 rounded-md border border-info mb-2 bg-[#d3cece]' />
                        <input type="text" placeholder='Your Address' {...register("address")} className='w-full p-2 rounded-md border border-info' required /> <br />
                        <input type="tel" placeholder='Your Phone Number' {...register("phone")} className='w-full p-2 rounded-md border border-info my-2' required /> <br />
                        <input type="number" placeholder='Enter Quantity' className='w-full p-2 rounded-md border border-info mb-2' defaultValue={minimum} onChange={(e) => setQuantityInput(parseInt(e.target.value))} required /> <br />
                        {processing &&
                            <div className="flex justify-center">
                                <svg role="status" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>}
                        <button type='submit' className="btn btn-primary block mx-auto" disabled={available === 0 || !(quantityInput >= minimum) || !(quantityInput <= available)}>Purchase</button>
                    </form>
                    {error && <p className="text-error text-center">{error}</p>}
                    {available === 0 && <p className="text-center text-error">Stock Out</p>}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;