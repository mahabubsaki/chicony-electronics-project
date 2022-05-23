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
import Footer from './components/shared/Footer';
import SingleProduct from './components/pages/SingleProduct/SingleProduct';
import RequireAuth from './components/utilities/RequireAuth';
import RequireAdmin from './components/utilities/RequireAdmin';
import RequireUser from './components/utilities/RequireUser';
import AllProducts from './components/pages/AllProducts/AllProducts';
import auth from './components/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from './components/utilities/Loading';
import IsVarified from './components/shared/Isverified';
import Payment from './components/pages/Payment/Payment';
function App() {
  const [user, loading] = useAuthState(auth)
  if (loading) {
    return <Loading></Loading>
  }
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      {(!user?.emailVerified && user?.uid) && <IsVarified></IsVarified>}
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route path="/portfolio" element={<Portfolio></Portfolio>}></Route>
        <Route path="/all-products" element={<AllProducts></AllProducts>}></Route>
        <Route path="/product/:productId" element={
          <RequireAuth>
            <SingleProduct></SingleProduct>
          </RequireAuth>}></Route>
        <Route path="/payment/:orderId" element={
          <RequireAuth>
            <Payment></Payment>
          </RequireAuth>}></Route>
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>
        }>
          <Route index element={<Profile></Profile>}></Route>
          <Route path="orders" element={<RequireUser><Orders></Orders></RequireUser>}></Route>
          <Route path="review" element={<RequireUser><AddReview></AddReview></RequireUser>}></Route>
          <Route path="manage-orders" element={<RequireAdmin>
            <ManageOrders></ManageOrders>
          </RequireAdmin>}></Route>
          <Route path="manage-users" element={<RequireAdmin><ManageUsers></ManageUsers></RequireAdmin>}></Route>
          <Route path="manage-products" element={<RequireAdmin><ManageProducts></ManageProducts></RequireAdmin>}></Route>
          <Route path="add-product" element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
