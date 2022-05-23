import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import AdminProductsRow from './AdminProductsRow';

const ManageOrders = () => {
    const [user, loading] = useAuthState(auth)
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
    console.log(data?.data);
    if (loading || isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
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
                        {data?.data?.map((product, index) => <AdminProductsRow
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