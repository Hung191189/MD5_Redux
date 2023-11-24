import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import ReactQuill from "react-quill";
import React, {useEffect, useState} from "react";

export default function EditBlog(){
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id)
    const token = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const [blog, setBlog] = useState({});
    useEffect(() => {
        axios.get("http://localhost:8000/blogs/" + id, token).then(res => {
            setBlog(res.data);
            console.log("aaaaaaa",res.data)
        })
    }, [])

    return(

        <>
            {Object.keys(blog).length > 0 &&
            <div className="row">
                <div className="offset-3 col-6">
                    <h1 style={{textAlign: "center"}}>Edit a blog</h1>
                    <Formik initialValues={{
                        title: blog.title || "",
                        content: blog.content || "",
                        user: {id: localStorage.getItem("id")}
                    }}
                            enableReinitialize={true}
                            onSubmit={(values)=>{
                                axios.put("http://localhost:8000/blogs/"+ id, values).then(()=>{
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
            </div>}
        </>
    )
}