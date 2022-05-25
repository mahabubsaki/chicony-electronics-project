import React from 'react';
import { IoMdOptions } from 'react-icons/io'
import { GrUserAdmin } from 'react-icons/gr'
import { FaUserFriends } from 'react-icons/fa'
import Swal from 'sweetalert2';
import axios from 'axios';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../utilities/Loading';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const ManageUsersRow = ({ eachUser, no, refetch, setChanging }) => {
    const { name, email, role } = eachUser
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth)
    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    // here asked for both case if admin want to change the role with a confirmation
    const handleMakeAdmin = async () => {
        Swal.fire({
            text: "Are you sure you want to change this user's role to admin?",
            icon: 'question',
            title: "Make Admin",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    // if confirmation is ok trying to change the role
                    const changeRole = async () => {
                        setChanging(true)
                        const { data } = await axios({
                            method: 'PUT',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                email: user?.email
                            },
                            url: `http://localhost:5000/change-role?role=Admin&email=${email}`

                        })
                        if (data.acknowledged) {
                            // showing toast if changes made successfully
                            toast.success('Successfully changed role to Admin', toastConfig)
                            refetch()
                            setChanging(false)
                        }
                        else {
                            toast.error('Something went wrong', toastConfig)
                            setChanging(false)
                        }
                    }
                    changeRole()
                }
                catch (err) {
                    navigate('/')
                    toast.error('Something Went Wrong', toastConfig)
                    signOut(auth)
                    localStorage.removeItem('accessToken')
                }
            }
        });
    }
    const handleMakeUser = async () => {
        Swal.fire({
            text: "Are you sure you want to change this admin's role to user?",
            icon: 'question',
            title: "Make User",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const changeRole = async () => {
                        setChanging(true)
                        const { data } = await axios({
                            method: 'PUT',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                email: user?.email
                            },
                            url: `http://localhost:5000/change-role?role=User&email=${email}`
                        })
                        if (data.acknowledged) {
                            toast.success('Successfully changed role to User', toastConfig)
                            refetch()
                            setChanging(false)
                        }
                        else {
                            toast.error('Something went wrong', toastConfig)
                            setChanging(false)
                        }
                    }
                    changeRole()
                }
                catch (err) {
                    navigate('/')
                    toast.error('Something Went Wrong', toastConfig)
                    signOut(auth)
                    localStorage.removeItem('accessToken')
                }
            }
        });
    }
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <tr>
            <th>{no}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role ? role : 'User'}</td>
            {user?.email !== email && <td>
                <div className="dropdown dropdown-left">
                    <label tabIndex="0" className="btn m-1"><IoMdOptions></IoMdOptions></label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {(!role || role === 'User') &&
                            <li><span onClick={handleMakeAdmin}><GrUserAdmin></GrUserAdmin>Make Admin</span></li>}
                        {role === 'Admin' &&
                            <li><span onClick={handleMakeUser}><FaUserFriends></FaUserFriends> Make User</span></li>}
                    </ul>
                </div>
            </td>}
        </tr>
    );
};

export default ManageUsersRow;