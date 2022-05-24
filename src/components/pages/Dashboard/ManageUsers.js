import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import ManageUsersRow from './ManageUsersRow';

const ManageUsers = () => {
    const [user, loading] = useAuthState(auth)
    const [childAction, setChildAction] = useState(false)
    const [array, setArray] = useState([])
    const { data, isLoading, refetch } = useQuery(['all-users-admin', user], async () => {
        try {
            return await axios({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email
                },
                url: `http://localhost:5000/all-users?first=first`
            })
        }
        catch (err) {

        }
    })
    useEffect(() => {
        if (data?.data) {
            setArray(data?.data)
        }
    }, [data])
    if (loading || isLoading || childAction) {
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
                            <th>Name</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {array.map((user, index) => <ManageUsersRow
                            key={user._id}
                            user={user}
                            no={index + 1}
                            refetch={refetch}
                            setChildAction={setChildAction}
                        ></ManageUsersRow>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;