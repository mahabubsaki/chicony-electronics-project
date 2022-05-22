import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../utilities/Loading';
import auth from '../../firebase.init';

const Register = () => {
    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    const [normalName, setNormalName] = useState('')
    const [resetModal, setResetModal] = useState(false)
    const [actualError, setActualError] = useState('')
    const formSchema = Yup.object().shape({
        confirm: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords does not match')
            .required('Please confirm your password'),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character example !@#$%"
            ),
        email: Yup.string()
            .required("Email is required")
            .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                "Please provide a valid email address"),
        fullName: Yup.string()
            .required('Full Name is required')
            .min(5, "Full Name is too short")
            .max(20, "Full Name is too long")
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const onSubmit = async ({ fullName, email, password }) => {
        await createUserWithEmailAndPassword(email, password)
        await setNormalName(fullName)
        await updateProfile({ displayName: fullName });
        await sendEmailVerification()
    }


    const navigate = useNavigate()
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const [initialUser, initialLoading] = useAuthState(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        normalUser,
        normalLoading,
        normalError,
    ] = useCreateUserWithEmailAndPassword(auth);
    // This useeffect will keep away user from register page while they are logged in
    useEffect(() => {
        if (initialUser) {
            if (!googleUser && !normalUser) {
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
            navigate('/')
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
                    data: { email: normalUser.user.email, name: normalName }
                })
                toast.success('Successfully signed up', toastConfig)
            }
            saveNormalUserDb()
            navigate('/')
        }
    }, [googleUser, normalUser])
    useEffect(() => {
        if (googleError) {
            setActualError('Something went wrong!')
        }
        else if (normalError) {
            if (normalError.message.includes('email-already-in-use')) {
                setActualError('User already exists with given e-mail!')
            }
            else {
                setActualError('Something went wrong!')
            }
        }
        else {
            setActualError('')
        }
    }, [googleError, normalError])
    useEffect(() => {
        if (actualError) {
            toast.error(actualError, toastConfig)
        }
    }, [actualError])
    if (googleLoading || normalLoading || initialLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="min-h-[500px] flex justify-center items-center">
            <div className="w-[385px] mx-auto testimonial-card p-7">
                <h1 className="text-xl mb-9 text-center">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full mb-3">
                        <label htmlFor="name">Full Name</label><br />
                        <input type="text" name="name" id="name" className={`w-full rounded-lg border ${errors.fullName?.message ? 'border-red-500' : 'border-[#CFCFCF]'} p-2 mt-1`}
                            {...register("fullName")}
                        />
                        <label className="label">
                            {<span className="label-text-alt text-red-500">{errors.fullName?.message}</span>}
                        </label>
                    </div>
                    <div className="w-full mb-3">
                        <label htmlFor="email">Email</label><br />
                        <input type="email" name="email" id="email" className={`w-full rounded-lg border ${errors.email?.message ? 'border-red-500' : 'border-[#CFCFCF]'} p-2 mt-1`}
                            {...register("email")}
                        />
                        <label className="label">
                            {<span className="label-text-alt text-red-500">{errors.email?.message}</span>}
                        </label>
                    </div>
                    <div className="w-full mb-3">
                        <label htmlFor="password">Password</label><br />
                        <input type="password" name="password" id="password" className={`w-full rounded-lg border ${errors.password?.message ? 'border-red-500' : 'border-[#CFCFCF]'} p-2 mt-1`}
                            ref={register}
                            {...register("password")} />
                        <label className="label">
                            {<span className="label-text-alt text-red-500">{errors.password?.message}</span>}
                        </label>
                    </div>
                    <div className="w-full mb-3">
                        <label htmlFor="confirm">Confirm Password</label><br />
                        <input type="password" name="confirm" id="confirm" className={`w-full rounded-lg border ${errors.confirm?.message ? 'border-red-500' : 'border-[#CFCFCF]'} p-2 mt-1`}
                            {...register("confirm")}
                        />
                        <label className="label">
                            {<span className="label-text-alt text-red-500">{errors.confirm?.message}</span>}
                        </label>
                    </div>
                    <button className="text-sm text-white btn w-full bg-projectNeutral" type="submit">Sign Up</button>
                </form>
                {/* <label htmlFor="reset-modal" className="modal-button cursor-pointer" onClick={() => setResetModal(true)}>Forget Password?</label>
                {resetModal && <ResetPasswordModal
                    setResetModal={setResetModal}
                ></ResetPasswordModal>} */}
                <div className="flex flex-col w-full border-opacity-50">
                    <div className="grid card rounded-box place-items-center">
                        <span className="text-xs">Already member? <Link to="/login" className="text-projectPrimary">Log In</Link></span>
                    </div>
                    <div className="divider">OR</div>
                    <div>
                        <button className="btn btn-outline w-full border border-[#3A4256] bg-white box-border text-projectAccent rounded-lg" onClick={() => signInWithGoogle()}>CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;