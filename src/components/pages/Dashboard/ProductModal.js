import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const ProductModal = ({ product, refetch, setProductModal }) => {
    const [user, loading] = useAuthState(auth)
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
    const { available, description, _id, price, name, minimum } = product;
    const navigate = useNavigate()
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setUpdating(true)
        // chicking some validation of number input
        if ((e.target.price.value < 0) || (e.target.minimum.value < 0) || (e.target.available.value < 0)) {
            toast.error('Invalid input given', toastConfig)
            setProductModal(null)
            setUpdating(false)
            return
        }
        try {
            // updating product if all ok
            const { data } = await axios({
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    email: user?.email
                },
                url: `https://mysterious-shore-40767.herokuapp.com/product-update?id=${_id}`,
                data: {
                    name: e.target.name.value,
                    description: e.target.description.value,
                    minimum: parseInt(e.target.minimum.value),
                    price: parseInt(e.target.price.value),
                    available: parseInt(e.target.available.value),
                }
            })
            if (data.acknowledged) {
                // if successfull refetcing to show the changes immediatly with toast
                setUpdating(false)
                refetch()
                toast.success('Product edited successfully', toastConfig)
                setProductModal(null)
            }
            else {
                setProductModal(null)
                setUpdating(false)
                toast.error('Something went wrong', toastConfig)
            }
        }
        catch (err) {
            setUpdating(false)
            navigate('/')
            toast.error('Something Went Wrong', toastConfig)
            signOut(auth)
            localStorage.removeItem('accessToken')
        }
    }
    return (
        <>
            <input type="checkbox" id="product-modal" className="modal-toggle" />
            <div className="modal modal-top">
                <div className="modal-box z-10">
                    <label htmlFor="product-modal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setProductModal(null)}>✕</label>
                    <h3 className="font-bold text-lg">Edit Product</h3>
                    <form onSubmit={handleUpdateProduct}>
                        <label htmlFor="id">Name</label>
                        <input type="text" name="name" id="name" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3" defaultValue={name} required />
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" cols="10" rows="3" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3" defaultValue={description}></textarea>
                        <label htmlFor="available">Available</label>
                        <input type="number" name="available" id="available" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3" defaultValue={available} required />
                        <label htmlFor="minimum">Minimum</label>
                        <input type="number" name="minimum" id="minimum" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3" defaultValue={minimum} required />
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3" defaultValue={price} required />
                        {(updating || loading) && <div className="flex justify-center my-3">
                            <svg role="status" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>}
                        <button className="text-sm text-white btn w-full bg-projectNeutral" type="submit" disabled={loading}>Update</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductModal;