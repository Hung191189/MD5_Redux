import {Link, Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {logDOM} from "@testing-library/react";
import {string} from "yup";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
   useEffect(() => {
       const handleLogin = async () => {
           await setUser(localStorage.getItem("name"))
       }
       handleLogin();
   })

    const handleLogout = async () => {
        try {
            // Xóa thông tin người dùng từ localStorage
            localStorage.clear();

            // Cập nhật state của user để ẩn trên giao diện
            setUser(null);

            // Chuyển hướng sau khi đăng xuất (nếu cần)
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    // let [user, setUser] = useState([])
    // useEffect(() => {
    //         setUser(localStorage.getItem('name'))
    //     }
    //
    // )



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={"/home"} className="nav-link">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                               aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu">
                                <Link to={"create"} className="dropdown-item">Add Blog</Link>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled">Disabled</a>
                        </li>
                    </ul>
                    {/*<Link to={"login"} className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</Link>*/}
                    {/*<Link to={"register"} className="btn btn-outline-success my-2 my-sm-0 ml-3" type="submit">Register</Link>*/}
                    {user === null ? (
                        <>
                            <Link to="/login" className="btn btn-outline-success my-2 my-sm-0">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-outline-success my-2 my-sm-0 ml-3">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="btn btn-outline-success my-2 my-sm-0">
                                {user}
                            </Link>
                            <button
                                className="btn btn-outline-success my-2 my-sm-0 ml-3"
                                type="button"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </>
                    )}
                </div>
            </nav>
            <Outlet></Outlet>


        </>
    )
}