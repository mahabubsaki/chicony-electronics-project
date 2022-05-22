import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';


const Login = () => {
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
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [actualError, setActualError] = useState('')
    const [resetModal, setResetModal] = useState(false)
    const [initialUser, initialLoading] = useAuthState(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        normalUser,
        normalLoading,
        normalError,
    ] = useSignInWithEmailAndPassword(auth);
    useEffect(() => {
        if (initialUser) {
            if (!googleUser || !normalUser) {
                navigate('/')
            }
        }
    }, [initialUser, normalUser, googleUser])
    useEffect(() => {
        if (googleUser) {
            const googleUserToken = async () => {
                const { data } = await axios({
                    method: 'GET',
                    url: `http://localhost:5000/token-issue?email=${googleUser.user.email}`,
                })
                localStorage.setItem('accessToken', data.token)
            }
            googleUserToken()
            const saveGoogleUserDb = async () => {
                await axios({
                    method: 'PUT',
                    url: `http://localhost:5000/user`,
                    data: { email: googleUser.user.email, name: googleUser.user.displayName }
                })
                toast.success('Successfully logged in', toastConfig)
            }
            saveGoogleUserDb()
            navigate(from)
        }
        else if (normalUser) {
            const normalUserToken = async () => {
                const { data } = await axios({
                    method: 'GET',
                    url: `http://localhost:5000/token-issue?email=${normalUser.user.email}`,
                })
                localStorage.setItem('accessToken', data.token)
            }
            normalUserToken()
            const saveNormalUserDb = async () => {
                await axios({
                    method: 'PUT',
                    url: `http://localhost:5000/user`,
                    data: { email: normalUser.user.email, name: normalUser.user.displayName }
                })
                toast.success('Successfully logged in', toastConfig)
            }
            saveNormalUserDb()
            navigate(from)
        }
    }, [googleUser, normalUser])
    useEffect(() => {
        if (actualError) {
            toast.error(actualError, toastConfig)
        }
    }, [actualError])
    useEffect(() => {
        if (googleError) {
            setActualError('Something went wrong!')
        }
        else if (normalError) {
            if (normalError?.message.includes('user-not-found')) {
                setActualError('User not found with given email address')
            }
            else if (normalError?.message.includes('wrong-password')) {
                setActualError('Password is wrong, please try again')
            }
            else {
                setActualError('Something went wrong!')
            }
        }
        else {
            setActualError('')
        }
    }, [googleError, normalError])
    const handleLogin = async (e) => {
        await signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
    }
    if (initialLoading || googleLoading || normalLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="min-h-[500px] flex justify-center items-center">
            <div className="w-[385px] mx-auto testimonial-card p-7">
                <h1 className="text-3xl font-bold mb-9 text-center">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="w-full mb-3">
                        <label htmlFor="email">Email</label><br />
                        <input type="email" name="email" id="email" className="w-full rounded-lg border border-[#CFCFCF] p-2 mt-1" required />
                    </div>
                    <div className="w-full mb-3">
                        <label htmlFor="password">Password</label><br />
                        <input type="password" name="password" id="password" className="w-full rounded-lg border border-[#CFCFCF] p-2 mt-1" required />
                    </div>
                    <button className="text-sm text-white btn w-full" type="submit">Login</button>
                </form>
                {/* <label htmlFor="reset-modal" className="modal-button cursor-pointer" onClick={() => setResetModal(true)}>Forget Password?</label>
                {resetModal && <ResetPasswordModal
                    setResetModal={setResetModal}
                ></ResetPasswordModal>} */}
                <div className="flex flex-col w-full border-opacity-50 mt-3">
                    <div className="grid card rounded-box place-items-center">
                        <span className="text-md">New to Chicony Electronics? <Link to="/register" className="text-info">Create new account</Link></span>
                    </div>
                    <div className="divider">OR</div>
                    <div>
                        <button className="btn btn-outline w-full border border-[#3A4256] bg-white box-border rounded-lg" onClick={() => signInWithGoogle()}>CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;