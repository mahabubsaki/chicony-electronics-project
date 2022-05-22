import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Blogs from './components/pages/Blogs/Blogs';
import Portfolio from './components/pages/Portfolio/Portfolio';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Orders from './components/pages/Dashboard/Orders';
import Profile from './components/pages/Dashboard/Profile';
import ManageOrders from './components/pages/Dashboard/ManageOrders';
import ManageUsers from './components/pages/Dashboard/ManageUsers';
import ManageProducts from './components/pages/Dashboard/ManageProducts';
import AddProduct from './components/pages/Dashboard/AddProduct';
import AddReview from './components/pages/Dashboard/AddReview';
function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route path="/portfolio" element={<Portfolio></Portfolio>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route index element={<Profile></Profile>}></Route>
          <Route path="orders" element={<Orders></Orders>}></Route>
          <Route path="review" element={<AddReview></AddReview>}></Route>
          <Route path="manage-orders" element={<ManageOrders></ManageOrders>}></Route>
          <Route path="manage-users" element={<ManageUsers></ManageUsers>}></Route>
          <Route path="manage-products" element={<ManageProducts></ManageProducts>}></Route>
          <Route path="add-product" element={<AddProduct></AddProduct>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
