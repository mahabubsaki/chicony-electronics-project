import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoMdOptions } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import Loading from '../../utilities/Loading';

const ProductRow = ({ product, no, refetch }) => {
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
    const { quantity, cost, productImg, productName, status, _id, productId } = product;
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
                            url: `http://localhost:5000/delete-order?id=${_id}`

                        })
                        if (data.acknowledged) {
                            toast.success('Product cancelled successfully', toastConfig)
                            refetch()
                        }
                        else {
                            toast.error('Something went wrong', toastConfig)
                        }
                    }
                    deleteProduct()
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
                <p className="text-center">{productName}</p>
                <img src={productImg} alt="" className="w-8 mx-auto my-3" />
            </td>
            <td>{quantity} Pcs</td>
            <td>${cost}</td>
            {
                status === "Not Paid" && <td>
                    <div>
                        <button className="btn btn-info block mx-auto">Pay Now</button><br />
                        <p className="text-error text-center">Not Paid</p>
                    </div>
                </td>
            }
            {
                status === "Paid" && <td>
                    <span className="text-primary">Paid</span>
                </td>
            }
            {
                status === "Shipped" && <td>
                    <span className="text-primary font-bold">Shipper</span>
                </td>
            }
            {
                status === "Not Paid" && <td>
                    <div class="dropdown dropdown-left">
                        <label tabindex="0" class="btn m-1"><IoMdOptions></IoMdOptions></label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="text-error"><span onClick={handleCancelOrder}><MdCancel></MdCancel> Cancel Order</span></li>
                        </ul>
                    </div>
                </td>
            }
        </tr>
    );
};

export default ProductRow;