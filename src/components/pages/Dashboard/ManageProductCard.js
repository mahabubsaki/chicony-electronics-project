import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ManageProductCard = ({ product, setProductModal, refetch }) => {
    const { img, available, description, _id, price, name, minimum } = product;
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
    const handleDeleteProduct = async () => {
        Swal.fire({
            text: 'Are you sure you want to delete this product?',
            icon: 'error',
            title: "Delete",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const deleteProduct = async () => {
                        const { data } = await axios({
                            method: 'DELETE',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                email: user?.email
                            },
                            url: `http://localhost:5000/delete-product?id=${_id}`
                        })
                        if (data.acknowledged) {
                            toast.success('Product deleted successfully', toastConfig)
                            refetch()
                        }
                        else {
                            toast.error('Something went wrong', toastConfig)
                        }
                    }
                    deleteProduct()
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
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" className="rounded-xl h-[200px]" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <p>Available : {available} pcs</p>
                <p>Minimum buy : {minimum} pcs</p>
                <p>Price Per Piece : ${price}</p>
                <div className="card-actions justify-between">
                    <label htmlFor="product-modal" className="modal-button cursor-pointer btn btn-success" onClick={() => setProductModal(product)}>Edit</label>
                    <button className="btn btn-error" onClick={handleDeleteProduct}>Delete</button>
                </div>
            </div>
        </div >
    );
};

export default ManageProductCard;