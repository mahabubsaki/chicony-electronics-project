import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import AdminProductsRow from './AdminProductsRow';

const ManageOrders = () => {
    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    const [childAction, setChildAction] = useState(false)
    const [user, loading] = useAuthState(auth)
    const [array, setArray] = useState([])
    const [myLoading, setMyloading] = useState(true)
    const { data, isLoading, refetch } = useQuery(['all-orders', user], async () => {
        try {
            return await axios({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email,
                },
                url: `http://localhost:5000/manage-orders?first=first`
            })
        }
        catch (err) {
            console.log(err);
        }
    })
    useEffect(() => {
        if (data?.data) {
            setArray(data?.data)
            setMyloading(false)
        }
    }, [data])
    const handleSearchByEmail = async (e) => {
        e.preventDefault()
        setMyloading(true)
        try {
            const { data } = await axios({
                method: 'GET',
                url: `http://localhost:5000/manage-orders?search=${e.target.email.value}`,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email
                }
            })
            if (data.length > 0) {
                setArray(data)
                setMyloading(false)
            }
            else {
                toast.error(`No user found with ${e.target.email.value}`, toastConfig)
                setMyloading(false)
            }
            e.target.reset()
        }
        catch (err) {

        }
    }
    const handleDropdown = async (e) => {
        setMyloading(true)
        try {
            const { data } = await axios({
                method: 'GET',
                url: `http://localhost:5000/manage-orders?${e.target.value}=${e.target.value}`,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email
                }
            })
            if (data.length > 0) {
                setArray(data)
                setMyloading(false)
            }
            else {
                toast.error(`No order found with ${e.target.value} sorting order`, toastConfig)
                setMyloading(false)
            }
        }
        catch (err) {

        }
    }
    if (loading || isLoading || childAction) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="flex justify-center my-2">
                <select class="select select-bordered w-full max-w-xs" defaultValue='none' onChange={handleDropdown}>
                    <option disabled value="none">Sort Orders</option>
                    <option value="all">All</option>
                    <option value="unpaid">By Unpaid</option>
                    <option value="paid">By Paid</option>
                    <option value="shipped">By Shipped</option>
                </select>
            </div>
            <form className="flex justify-center my-2" onSubmit={handleSearchByEmail}>
                <div class="form-control">
                    <div class="input-group">
                        <input type="email" placeholder="Search by Email" class="input input-bordered" name="email" required />
                        <button class="btn btn-square" type='submit'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </form>
            {myLoading && <div className="my-3 flex justify-center"><svg role="status" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg></div>}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {array.map((product, index) => <AdminProductsRow
                            key={product._id}
                            product={product}
                            no={index + 1}
                            refetch={refetch}
                            setChildAction={setChildAction}
                        ></AdminProductsRow>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;