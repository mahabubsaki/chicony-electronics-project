import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import ProductRow from './ProductRow';

const Orders = () => {
    const [user, loading] = useAuthState(auth)
    const { data, isLoading, refetch } = useQuery(['orders', user], async () => {
        try {
            return await axios({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email,
                },
                url: `http://localhost:5000/all-orders?email=${user?.email}`
            })
        }
        catch (err) {
            // navigate('/')
            // toast.error('Something Went Wrond', toastConfig)
            // signOut(auth)
            // localStorage.removeItem('accessToken')
        }
    })
    if (loading || isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th className="text-center">Product</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                            <th className="text-center">Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((product, index) => <ProductRow
                            key={product._id}
                            product={product}
                            no={index + 1}
                            refetch={refetch}
                        ></ProductRow>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;