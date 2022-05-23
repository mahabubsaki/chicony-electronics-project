import React from 'react';
import { IoMdOptions } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'

const ProductRow = ({ product, no, refetch }) => {
    const { quantity, cost, productImg, productName, paid } = product;
    return (
        <tr>
            <th>{no}</th>
            <td>
                <p className="text-center">{productName}</p>
                <img src={productImg} alt="" className="w-8 mx-auto my-3" />
            </td>
            <td>{quantity} Pcs</td>
            <td>${cost}</td>
            <td>{paid ?
                <span className="text-primary">Paid</span> :
                <>
                    <div>
                        <button className="btn btn-info block mx-auto">Pay Now</button><br />
                        <p className="text-error text-center">Not Paid</p>
                    </div>
                </>
            }</td>
            <td>
                <div class="dropdown dropdown-left">
                    <label tabindex="0" class="btn m-1"><IoMdOptions></IoMdOptions></label>
                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="text-error"><span><MdCancel></MdCancel> Cancel Order</span></li>
                    </ul>
                </div>
            </td>
        </tr>
    );
};

export default ProductRow;