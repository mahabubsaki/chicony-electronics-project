import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import { BiUserCircle } from 'react-icons/bi';
import { HiIdentification, HiLocationMarker } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'
import { IoIosSchool } from 'react-icons/io'
import { AiFillPhone, AiFillLinkedin } from 'react-icons/ai'
import UpdateProfileModal from './UpdateProfileModal';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
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
    const [updateModal, setUpdateModal] = useState(false)
    const { data, isLoading, refetch } = useQuery(['profile', user], async () => {
        try {
            // getting profile information with ausequerry with axios
            return await axios({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email
                },
                url: `http://localhost:5000/user-profile?email=${user?.email}`
            })
        }
        catch (err) {
            navigate('/')
            toast.error('Something Went Wrong', toastConfig)
            signOut(auth)
            localStorage.removeItem('accessToken')
        }
    })
    const { email, name, avatar, education, location, phone, linkedin } = data?.data || {}
    if (loading || isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="min-h-[500px] flex justify-center">
            <div className="flex flex-col w-full sm:w-3/4 mx-auto">
                <div className="flex justify-between items-center my-3">
                    {/* conditionally showing user information */}
                    <h1 className="text-3xl">Welcome to Your Profile</h1>
                    {avatar && <div className="avatar online">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <img src={avatar} alt="avatar" />
                            </div>
                        </div>
                    </div>}
                    {!avatar &&
                        <div className="flex flex-col items-center">
                            <BiUserCircle className="text-6xl"></BiUserCircle>
                            <h1>Not  Added Yet</h1>
                        </div>}
                </div>
                <div className="text-xl flex flex-col gap-4">
                    <h1 className="flex items-center"><HiIdentification className="mx-2"></HiIdentification> Name : {name}</h1>
                    <h1 className="flex items-center"><MdEmail className="mx-2"></MdEmail> Email : {email}</h1>
                    <h1 className="flex items-center"><IoIosSchool className="mx-2"></IoIosSchool>Education : {education ? education : 'Not  Added Yet'}</h1>
                    <h1 className="flex items-center"><HiLocationMarker className="mx-2"></HiLocationMarker>Location : {location ? location : 'Not  Added Yet'}</h1>
                    <h1 className="flex items-center"><AiFillPhone className="mx-2"></AiFillPhone>Phone : {phone ? phone : 'Not  Added Yet'}</h1>
                    <h1 className="flex items-center"><AiFillLinkedin className="mx-2"></AiFillLinkedin>LinkdIn : {linkedin ? linkedin : 'Not  Added Yet'}</h1>
                </div>
                <label htmlFor="update-modal" className="modal-button cursor-pointer btn btn-success w-48 mx-auto my-4" onClick={() => setUpdateModal(true)}>Update Profile</label>
                {updateModal && <UpdateProfileModal
                    setUpdateModal={setUpdateModal}
                    refetch={refetch}
                    profileOwner={data?.data}
                ></UpdateProfileModal>}
            </div>
        </div>
    );
};

export default Profile;