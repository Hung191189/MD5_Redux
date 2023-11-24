import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup"
import Swal from 'sweetalert2';
export default function Login(){
const navigate =useNavigate();
const validate = Yup.object().shape({
    username: Yup.string()
        .min(2,"Too short!")
        .max(50, "Too Long!")
        .required("Required"),
    password: Yup.string()
        .required("Required")

}) ;
    const handleLogin = async (values) => {
        try {
            const response = await axios.post('http://localhost:8000/login', values);
            let user = response.data
            localStorage.setItem('token',user.accessToken)
            localStorage.setItem('name',user.username)
            localStorage.setItem('id',user.id)
            await Swal.fire({
                title: 'Đăng nhập thành công!',
                icon: 'success',
                timer: 1000, // Thời gian hiển thị thông báo (miligiây)
                showConfirmButton: false // Ẩn nút xác nhận
            })
            navigate('/home');
        } catch (error) {
            console.error('Lỗi khi tạo mới blog:', error);
            await Swal.fire('Đã xảy ra lỗi!', 'Vui lòng thử lại sau.', 'error');
        }
    };
    return(
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <h1 style={{textAlign: "center"}}>Login</h1>

                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="exampleInputEmail1">Email address</label>*/}
                        {/*    <input type="text" className={"form-control"}/>*/}
                        {/*</div>*/}
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="exampleInputPassword1">Password</label>*/}
                        {/*    <input type="password" className={"form-control"}/>*/}
                        {/*</div>*/}
                        <Formik initialValues={{
                            username:'',
                            password:''
                        }}
                                validationSchema={validate}
                                onSubmit={handleLogin}
                                >
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <Field  className={"form-control"} name={"username"}></Field>
                                    <ErrorMessage name="username"></ErrorMessage>
                                    {/*<input type="text" className={"form-control"}/>*/}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <Field type="password" className={"form-control"} name={"password"}></Field>
                                    <ErrorMessage name="password"></ErrorMessage>
                                    {/*<input type="password" className={"form-control"}/>*/}
                                </div>

                                <button type="submit" className="btn btn-primary ml-3">Login</button>
                                <button type="submit" className="btn btn-primary ml-3" >
                                    <Link to={"/register"} style={{textDecoration: "none", color: "white" }}>Register</Link>
                                </button>
                            </Form>
                        </Formik>
                        {/*<button type="submit" className="btn btn-primary">Submit</button>*/}



                </div>
            </div>
        </>
    )
}