import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getBlogs} from "./services/blogsService";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

function App() {



  return (
   <>
     <div className="container-fluid">
        {/*<Routes>*/}
        {/*    <Route path={""} element={<Login></Login>}></Route>*/}
        {/*    <Route path={"register"} element={<Register></Register>}></Route>*/}
        {/*</Routes>*/}
         <Routes>
             <Route path={"/"} element={<Navbar></Navbar>}>
                 <Route path={"/login"} element={<Login></Login>}></Route>
                 <Route path={"/register"} element={<Register></Register>}></Route>
                 <Route path={"/home"} element={<Home></Home>}></Route>
                 <Route path={"/create"} element={<CreateBlog></CreateBlog>}></Route>
                 <Route path={"/edit/:id"} element={<EditBlog></EditBlog>}></Route>
             </Route>
         </Routes>
     </div>

   </>
  );
}

export default App;
