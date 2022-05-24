import React from 'react';
import { IoMdOptions } from 'react-icons/io'
import { GrUserAdmin } from 'react-icons/gr'
import { FaUserFriends } from 'react-icons/fa'


const ManageUsersRow = ({ user, no, refetch, setChildAction }) => {
    const { name, email, role } = user
    return (
        <tr>
            <th>{no}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role ? role : 'User'}</td>
            <td>
                <div className="dropdown dropdown-left">
                    <label tabIndex="0" className="btn m-1"><IoMdOptions></IoMdOptions></label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {(!role || role === 'User') &&
                            <li><span><GrUserAdmin></GrUserAdmin>Make Admin</span></li>}
                        {role === 'Admin' &&
                            <li><span><FaUserFriends></FaUserFriends> Make User</span></li>}
                    </ul>
                </div>
            </td>
        </tr>
    );
};

export default ManageUsersRow;