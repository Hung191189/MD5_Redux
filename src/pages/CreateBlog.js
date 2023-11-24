import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import React from "react";
import ReactQuill from "react-quill";

export default function CreateBlog(){
    const navigate = useNavigate();
    const token = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    return(
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <h1 style={{textAlign: "center"}}>Create a blog</h1>
                    <Formik initialValues={{
                        title:'',
                        content:'',
                        user: {id: localStorage.getItem("id")}
                    }}
                            onSubmit={(values)=>{
                                axios.post("http://localhost:8000/blogs", values, token).then(()=>{
                                    navigate("/home")
                                })
                            }}>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Title</label>
                                <Field  className={"form-control"} name={"title"}></Field>
                                {/*<input type="text" className={"form-control"}/>*/}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Content</label>
                                <Field type="text" className={"form-control"} name={"content"}>
                                    {({ field }) => (
                                        <ReactQuill
                                            theme="snow"
                                            value={field.value}
                                            onChange={field.onChange(field.name)}
                                        />
                                    )}
                                </Field>

                                {/*<input type="password" className={"form-control"}/>*/}
                            </div>


                            <button type="submit" className="btn btn-primary ml-3">Save</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}