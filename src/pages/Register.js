import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup"
export default function Register(){
    const navigate =useNavigate();
   const validate = Yup.object().shape({
       username: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
       password: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống"),
       confirmPassword: Yup.string()
           .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Không được để trống")
    });
    return(
        <>

            <div className="row">
                <div className="offset-3 col-6">
                    <h1 style={{textAlign: "center"}}>Register</h1>
                    <Formik initialValues={{
                        username:'',
                        password:''
                    }}
                            validationSchema={validate}
                            onSubmit={(values)=>{
                                axios.post("http://localhost:8000/register", values).then(()=>{
                                    navigate("/")
                                })
                            }}>
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
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                <Field type="password" className={"form-control"} name={"confirmPassword"}></Field>
                                <ErrorMessage name="confirmPassword"></ErrorMessage>
                                {/*<input type="password" className={"form-control"}/>*/}
                            </div>

                            <button type="submit" className="btn btn-primary ml-3">Register</button>
                            <button type="submit" className="btn btn-primary ml-3" >
                                <Link to={"/login"} style={{textDecoration: "none", color: "white" }}>Back To Login</Link>
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}