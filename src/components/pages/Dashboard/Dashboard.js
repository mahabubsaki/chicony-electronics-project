import React from 'react';
import { Outlet } from 'react-router-dom';
import Customlink from '../../utilities/Customlink';

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                {/* <!-- Page content here --> */}
                <h1>Welcome to dashboard</h1>
                <Outlet></Outlet>
            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-48 bg-secondary text-base-content">
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