import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const UpdateModal = ({ setUpdateModal, refetch }) => {
    const [updating, setUpdating] = useState(false)
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
    const handleUpdateForm = async (e) => {
        e.preventDefault()
        setUpdating(true)
        const formdata = new FormData();
        const image = e.target.image.files[0]
        const name = e.target.image.files[0].name
        formdata.append('image', image, name)
        const upload = await axios.post('https://api.imgbb.com/1/upload?key=28f7e689e78cbdf683b41d414ebda692', formdata)
        if (upload.data.success) {
            try {
                const updateProfile = async () => {
                    const { data } = await axios({
                        method: 'PUT',
                        url: `http://localhost:5000/update-profile?email=${user?.email}`,
                        data: {
                            avatar: upload.data.data.display_url,
                            education: e.target.education.value,
                            location: e.target.location.value,
                            phone: e.target.phone.value,
                            linkedin: e.target.linkedin.value,
                        },
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            email: user?.email
                        }
                    })
                    if (data.acknowledged) {
                        e.target.reset()
                        setUpdateModal(false)
                        toast.success('Updated profile successfully', toastConfig)
                        refetch()
                    }
                    else {
                        e.target.reset()
                        setUpdateModal(false)
                        toast.error('Something went wrong', toastConfig)
                    }
                }
                updateProfile()
            }
            catch (err) {
                setUpdateModal(false)
                navigate('/')
                toast.error('Something Went Wrong', toastConfig)
                signOut(auth)
                localStorage.removeItem('accessToken')
            }
        }
        else {
            e.target.reset()
            setUpdateModal(false)
            toast.error('Something went wrong', toastConfig)
        }
    }
    return (
        <>
            <input type="checkbox" id="update-modal" className="modal-toggle" />
            <div className="modal modal-middle">
                <div className="modal-box">
                    <label htmlFor="update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Update Your Profile</h3>
                    <form onSubmit={handleUpdateForm}>
                        <input type="text" name="education" className="w-full rounded-lg border border-[#CFCFCF] p-2 my-3" placeholder="Enter Your Education" required />
                        <input type="text" name="location" className="w-full rounded-lg border border-[#CFCFCF] p-2 my-3" placeholder="Enter Your Location" required />
                        <input type="text" name="phone" className="w-full rounded-lg border border-[#CFCFCF] p-2 my-3" placeholder="Enter Your Contact Number" required />
                        <input type="text" name="linkedin" className="w-full rounded-lg border border-[#CFCFCF] p-2 my-3" placeholder="Enter Your LinkdIn profile link" required />
                        <input type="file" name="image" className="w-full rounded-lg border border-[#CFCFCF] p-2 my-3" required />
                        <button className="text-sm text-white btn w-full bg-projectNeutral" type="submit" disabled={!user}>Update</button>
                    </form>
                    {(updating || loading) && <div className="flex justify-center mt-3">
                        <svg role="status" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default UpdateModal;