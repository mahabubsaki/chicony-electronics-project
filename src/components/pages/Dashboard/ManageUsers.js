import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import ManageUsersRow from './ManageUsersRow';

const ManageUsers = () => {
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
    const [user, loading] = useAuthState(auth)
    const [array, setArray] = useState([])
    const [changing, setChanging] = useState(false)
    const { data, isLoading, refetch } = useQuery(['all-users-admin', user], async () => {
        try {
            return await axios({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email
                },
                url: `https://mysterious-shore-40767.herokuapp.com/all-users?first=first`
            })
        }
        catch (err) {
            navigate('/')
            toast.error('Something Went Wrong', toastConfig)
            signOut(auth)
            localStorage.removeItem('accessToken')
        }
    })
    useEffect(() => {
        if (data?.data) {
            setArray(data?.data)
        }
    }, [data])
    if (loading || isLoading || changing) {
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
                            eachUser={user}
                            no={index + 1}
                            refetch={refetch}
                            setChanging={setChanging}
                        ></ManageUsersRow>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;