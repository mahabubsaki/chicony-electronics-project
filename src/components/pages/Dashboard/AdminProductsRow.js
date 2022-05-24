import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoMdOptions } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';


const AdminProductsRow = ({ product, no, refetch, setChildAction }) => {
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
    const { status, email, quantity, cost, productName, productId, _id
    } = product;
    const handleCancelOrder = async () => {
        Swal.fire({
            text: 'Are you sure you want to cancel this order?',
            icon: 'error',
            title: "Cancel Order",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                setChildAction(true)
                try {
                    const deleteProduct = async () => {
                        const { data } = await axios({
                            method: 'DELETE',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                email: user?.email
                            },
                            data: {
                                productId: productId,
                                quantity: quantity,
                            },
                            url: `http://localhost:5000/admin-delete-order?id=${_id}`

                        })
                        if (data.acknowledged) {
                            toast.success('Product cancelled successfully', toastConfig)
                            refetch()
                            setChildAction(false)
                        }
                        else {
                            setChildAction(false)
                            toast.error('Something went wrong', toastConfig)
                        }
                    }
                    deleteProduct()
                }
                catch (err) {
                    // navigate('/')
                    // toast.error('Something Went Wrong', toastConfig)
                    // signOut(auth)
                    // localStorage.removeItem('accessToken')
                }
            }
        })
    }
    const handleShipOrder = async () => {
        Swal.fire({
            text: 'Are you sure you want to ship this order?',
            icon: 'info',
            title: "Ship Order",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                setChildAction(true)
                try {
                    const shipOrder = async () => {
                        const { data } = await axios({
                            method: 'PUT',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                email: user?.email
                            },
                            url: `http://localhost:5000/ship-order?id=${_id}`
                        })
                        if (data.acknowledged) {
                            toast.success('Product shipped successfully', toastConfig)
                            refetch()
                            setChildAction(false)
                        }
                        else {
                            toast.error('Something went wrong', toastConfig)
                            setChildAction(false)
                        }
                    }
                    shipOrder()
                }
                catch (err) {

                }
            }
        })
    }
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <tr>
            <th>{no}</th>
            <td>
                {email}
            </td>
            <td>{productName
            }</td>
            <td>{quantity} Pcs</td>
            <td>${cost}</td>
            {
                status === "Not Paid" && <td className="text-error">{status}</td>
            }
            {
                status === "Paid" && <td className="text-primary">Pending Shipping</td>
            }
            {
                status === "Shipped" && <td className="text-info">{status}</td>
            }
            {
                status !== "Shipped" && <td>
                    <div className="dropdown dropdown-left">
                        <label tabIndex="0" className="btn m-1"><IoMdOptions></IoMdOptions></label>
                        <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            {status === 'Not Paid' &&
                                <li className="text-error"><span onClick={handleCancelOrder}><MdCancel></MdCancel> Cancel Order</span></li>
                            }
                            {status === 'Paid' &&
                                <li className="text-success"><span onClick={handleShipOrder}>Ship Order</span></li>
                            }
                        </ul>
                    </div>
                </td>
            }
        </tr>
    );
};

export default AdminProductsRow;