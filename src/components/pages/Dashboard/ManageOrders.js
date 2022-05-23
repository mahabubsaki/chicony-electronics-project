import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';

const ManageOrders = () => {
    const [user, loading] = useAuthState(auth)
    const { data, isLoading, refetch } = useQuery(['all-orders', user], async () => {
        try {
            return await axios({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email,
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    })
    return (
        <div>

        </div>
    );
};

export default ManageOrders;