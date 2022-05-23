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
import UpdateModal from './UpdateModal';
const Profile = () => {
    const [user, loading] = useAuthState(auth)
    const [updateModal, setUpdateModal] = useState(false)
    const { data, isLoading, refetch } = useQuery(['singleProduct', user], async () => {
        try {
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
            console.log(err);
        }
    })
    const { email, name, avatar, education, location, phone, linkdin } = data?.data || {}
    console.log(avatar);
    if (loading || isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="min-h-[500px] flex justify-center">
            <div className="flex flex-col w-full sm:w-3/4 mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl">Welcome to Your Profile</h1>
                    {avatar && <div className="avatar online">
                        <div className="w-[60px] rounded-full">
                            <img src={avatar} alt="profile" />
                        </div>
                        <button>Update Avatar</button>
                    </div>}
                    {!avatar &&
                        <div className="flex flex-col items-center">
                            <BiUserCircle className="text-6xl"></BiUserCircle>
                            <h1>Not  Added Yet</h1>
                        </div>}
                </div>
                <div className="text-xl">
                    <h1 className="flex items-center"><HiIdentification className="mx-2"></HiIdentification> Name : {name}</h1>
                    <h1 className="flex items-center"><MdEmail className="mx-2"></MdEmail> Email : {email}</h1>
                    <h1 className="flex items-center"><IoIosSchool className="mx-2"></IoIosSchool>Education : {education ? education : 'Not  Added Yet'}</h1>
                    <h1 className="flex items-center"><HiLocationMarker className="mx-2"></HiLocationMarker>Location : {location ? location : 'Not  Added Yet'}</h1>
                    <h1 className="flex items-center"><AiFillPhone className="mx-2"></AiFillPhone>Phone : {phone ? phone : 'Not  Added Yet'}</h1>
                    <h1 className="flex items-center"><AiFillLinkedin className="mx-2"></AiFillLinkedin>LinkdIn : {linkdin ? linkdin : 'Not  Added Yet'}</h1>
                </div>
                <label htmlFor="reset-modal" className="modal-button cursor-pointer" onClick={() => setUpdateModal(true)}>Forget Password?</label>
                {updateModal && <UpdateModal
                    setUpdateModal={setUpdateModal}
                ></UpdateModal>}
            </div>
        </div>
    );
};

export default Profile;