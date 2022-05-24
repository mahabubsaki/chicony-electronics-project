import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';

const AddProduct = () => {
    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    const [user, loading] = useAuthState(auth)
    const [adding, setAdding] = useState(false)
    const handleUAddProduct = async (e) => {
        e.preventDefault()
        setAdding(true)
        if ((e.target.price.value < 0) || (e.target.minimum.value < 0) || (e.target.available.value < 0)) {
            toast.error('Invalid input given', toastConfig)
            setAdding(false)
            return
        }
        const formdata = new FormData();
        const image = e.target.image.files[0]
        const name = e.target.image.files[0].name
        formdata.append('image', image, name)
        const upload = await axios.post('https://api.imgbb.com/1/upload?key=28f7e689e78cbdf683b41d414ebda692', formdata)
        if (upload.data.success) {
            try {
                const { data } = await axios({
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        email: user?.email
                    },
                    url: 'http://localhost:5000/add-product-admin',
                    data: {
                        img: upload.data.data.display_url,
                        name: e.target.name.value,
                        minimum: e.target.minimum.value,
                        available: e.target.available.value,
                        price: e.target.price.value,
                        description: e.target.description.value,
                        id: Math.round(Math.random() * 100000000000).toString(16),
                    }
                })
                if (data.acknowledged) {
                    setAdding(false)
                    toast.success('Product added successfully', toastConfig)
                }
                else {
                    setAdding(false)
                    toast.error('Something went wrong', toastConfig)
                }
                e.target.reset()
            }
            catch (err) {
                setAdding(false)
            }
        }
        else {
            setAdding(false)
            toast.error('Something went wrong', toastConfig)
        }
    }
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div className="w-4/5 mx-auto">
            <form onSubmit={handleUAddProduct}>
                <label htmlFor="id">Product Name</label>
                <input type="text" name="name" id="name" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3" required />
                <label htmlFor="description">Product Description</label>
                <textarea name="description" id="description" rows="3" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3"></textarea>
                <label htmlFor="available">Set Available</label>
                <input type="number" name="available" id="available" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3" required />
                <label htmlFor="minimum">Set Minimum</label>
                <input type="number" name="minimum" id="minimum" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3" required />
                <label htmlFor="price">Set Price</label>
                <input type="number" name="price" id="price" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3" required />
                <label htmlFor="image">Set Product Image</label>
                <input type="file" name="image" id="image" className="w-full rounded-lg border border-[#CFCFCF] p-2 mb-3" required />
                {(adding || loading) && <div className="flex justify-center my-3">
                    <svg role="status" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>}
                <button className="text-sm text-white btn block mx-auto bg-projectNeutral" type="submit" disabled={loading}>Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;