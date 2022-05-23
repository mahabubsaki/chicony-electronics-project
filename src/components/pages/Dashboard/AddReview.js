import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';

const AddReview = () => {
    const [user, loading] = useAuthState(auth)
    const [processing, setProcessing] = useState(false)
    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    const [rate, setRate] = useState(0)
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (rate === 0) {
            toast.error('Please add a rating to your review', toastConfig)
            setProcessing(false)
            return
        }
        try {
            const { data } = await axios({
                method: 'POST',
                url: `http://localhost:5000/add-review`,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email,
                },
                data: {
                    email: user?.email,
                    name: user?.displayName,
                    date: new Date(),
                    rating: rate,
                    feedback: e.target.feedback.value,
                }
            })
            if (data.acknowledged) {
                toast.success('Your review added successfully', toastConfig)
                e.target.reset()
                setProcessing(false)
            }
            else {
                toast.error('Something went wrong', toastConfig)
                setProcessing(false)
            }
        }
        catch (err) {
            setProcessing(false)
        }
    }
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div className="min-h-[500px] flex justify-center">
            <div className="w-full sm:w-4/5 mx-auto">
                <h1 className="text-2xl text-center">Add A Review</h1>
                <div className="flex items-center w-full justify-between my-4">
                    <p className="text-xl">Select A Rating: </p>
                    <div className="text-3xl flex justify-center">
                        <Rater onRate={({ rating }) => setRate(rating)} rating={0} total={5}>
                        </Rater>
                    </div>
                </div>
                <form onSubmit={handleReviewSubmit}>
                    <textarea name="feedback" className="border border-[#d3cece] rounded-lg w-full p-3 text-xl" placeholder="Enter Your Feedback" cols="30" rows="10" maxLength={250} required></textarea>
                    {processing &&
                        <div className="flex justify-center my-3">
                            <svg role="status" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>}
                    <button className="btn btn-primary block mx-auto" type="submit">Add Review</button>
                </form>
            </div>
        </div>
    );
};

export default AddReview;