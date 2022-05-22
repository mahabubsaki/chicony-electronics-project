import React from 'react';
import { Outlet } from 'react-router-dom';
import Customlink from '../../utilities/Customlink';

const Dashboard = () => {
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* <!-- Page content here --> */}
                <h1>Welcome to dashboard</h1>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-secondary text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Customlink to="/dashboard">My Profile</Customlink></li>
                    <li><Customlink to="/dashboard/orders">My Orders</Customlink></li>
                    <li><Customlink to="/dashboard/review">Add Review</Customlink></li>
                    <li><Customlink to="/dashboard/manage-orders">Manage All Orders</Customlink></li>
                    <li><Customlink to="/dashboard/manage-products">Manage Products</Customlink></li>
                    <li><Customlink to="/dashboard/add-product">Add Product</Customlink></li>
                    <li><Customlink to="/dashboard/manage-users">Manage Users</Customlink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;