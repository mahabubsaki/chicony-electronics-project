import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import AdminProductsRow from './AdminProductsRow';

const ManageOrders = () => {
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
                url: `http://localhost:5000/manage-orders`
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
        // setMyloading(true)
        try {
            const { data } = await axios({
                method: 'GET',
                url: `http://localhost:5000/manage-orders?search=${e.target.email.value}`,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email
                }
            })
            if (data.acknowledged) {
                console.log(data)
            }
        }
        catch (err) {

        }
    }
    if (loading || isLoading || myLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="flex justify-center my-2">
                <select class="select select-bordered w-full max-w-xs" defaultValue='none'>
                    <option disabled value="none">Sort Orders</option>
                    <option className="all">All</option>
                    <option className="unpaid">By Unpaid</option>
                    <option className="paid">By Paid</option>
                    <option className="shipper">By Shipped</option>
                </select>
            </div>
            <form className="flex justify-center my-2" onSubmit={handleSearchByEmail}>
                <div class="form-control">
                    <div class="input-group">
                        <input type="email" placeholder="Search by Email" class="input input-bordered" name="email" />
                        <button class="btn btn-square" type='submit'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </form>
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
                        ></AdminProductsRow>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;