import React from 'react';
import { IoMdOptions } from 'react-icons/io'


const AdminProductsRow = ({ product, no }) => {
    const { status, email, quantity, cost, productName
    } = product;
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
            <td>ok</td>
            <td>
                <div className="dropdown dropdown-left">
                    <label tabIndex="0" className="btn m-1"><IoMdOptions></IoMdOptions></label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="text-error"><span></span></li>
                    </ul>
                </div>
            </td>
            {/* {
                status === "Not Paid" && <td>
                    <div>
                        <button className="btn btn-info block mx-auto" onClick={() => navigate(`/payment/${orderId}`)}>Pay Now</button><br />
                        <p className="text-error text-center">Not Paid</p>
                    </div>
                </td>
            }
            {
                status === "Paid" && <td>
                    <p className="text-primary text-center">Paid</p>
                    <p className="text-center text-xs font-bold">Transaction Id: {paymentId
                    }</p>
                </td>
            }
            {
                status === "Shipped" && <td>
                    <p className="text-primary font-bold text-center">Shipped</p>
                </td>
            }
            {
                status === "Not Paid" && <td>
                    <div className="dropdown dropdown-left">
                        <label tabIndex="0" className="btn m-1"><IoMdOptions></IoMdOptions></label>
                        <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="text-error"><span onClick={handleCancelOrder}><MdCancel></MdCancel> Cancel Order</span></li>
                        </ul>
                    </div>
                </td>
            } */}
        </tr>
    );
};

export default AdminProductsRow;