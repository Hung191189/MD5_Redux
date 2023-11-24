// import {Link, Outlet, useNavigate} from "react-router-dom";
// import {useEffect, useState} from "react";
// import axios from "axios";
// import Swal from 'sweetalert2';
// import {number} from "yup";
//
// export default function Home() {
//     const userID = localStorage.getItem("id")
//     const token = {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//     }
//     // const loadList = ()=>{
//     //         axios.get("http://localhost:8000/blogs", token).then(res => {
//     //             setList(res.data);
//     //         })
//     // }
//     const navigate = useNavigate()
//     const [list, setList] = useState([]);
//     useEffect(() => {
//         axios.get("http://localhost:8000/blogs", token).then(res => {
//             setList(res.data);
//         })
//     },[])
//     const handleDelete = (blogId) => {
//         Swal.fire({
//             title: 'Bạn có chắc chắn muốn xóa bài viết này?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Xóa'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // Gọi API xóa bài viết ở đây
//                 axios.delete(`http://localhost:8000/blogs/${blogId}`, token)
//                     .then((res) => {
//                         // Xóa bài viết khỏi state hoặc làm bất kỳ cập nhật nào khác
//                         setList(list.filter(blog => blog.id !== blogId));
//                         // loadList()
//                         Swal.fire({
//                             title: 'Sửa blog thành công!',
//                             icon: 'success',
//                             timer: 1000, // Thời gian hiển thị thông báo (miligiây)
//                             showConfirmButton: true // Ẩn nút xác nhận
//                         })
//                     })
//                     .catch((error) => {
//                         console.error('Lỗi khi xóa bài viết:', error);
//                         Swal.fire('Đã xảy ra lỗi!', 'Vui lòng thử lại sau.', 'error');
//                     });
//             }
//         });
//     };
//
//
//     return(
//         <>
//             <table className="table table-striped">
//                 <thead>
//                 <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">Title</th>
//                     <th scope="col">Content</th>
//                     <th scope="col">User</th>
//                     <th scope="col">Created at</th>
//                     <th scope="col" rowSpan={2}>Action at</th>
//                     <th scope="col"></th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {list.map((item, index) =>{
//                     return(
//                         <tr key={index}>
//                             <th scope="row">{item.id}</th>
//                             <td>{item.title}</td>
//                             <td>
//                                 <div dangerouslySetInnerHTML={{__html: item.content}}/>
//                             </td>
//                             <td>{item.user.username}</td>
//                             <td>{item.createdAt}</td>
//                             {parseInt(userID) === item.user.id ?(
//                             <td>< Link to={"/edit/" + item.id}>Edit</Link> </td>): ""}
//                             {parseInt(userID) === item.user.id ?(
//                             <td onClick={() => handleDelete(item.id)}  >Delete</td>): ""}
//                         </tr>
//                     )
//                 })}
//                 </tbody>
//             </table>
//         </>
//     )
// }
//


import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useEffect} from "react";
import {getBlogs} from "../services/blogsService";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function Home() {
    const userID = localStorage.getItem("id")

    const dispatch = useDispatch();
    const list = useSelector(state => {
        return state.blogs.blogs;
    })
    useEffect(() => {
        dispatch(getBlogs())
    }, []);
    console.log(list)

    const handleDelete = (blogId) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa bài viết này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa'
        }).then((result) => {
            if (result.isConfirmed) {
                // Gọi API xóa bài viết ở đây
                axios.delete(`http://localhost:8000/blogs/${blogId}`)
                    .then((res) => {
                        // Xóa bài viết khỏi state hoặc làm bất kỳ cập nhật nào khác
                        // setList(list.filter(blog => blog.id !== blogId));
                        // loadList()
                        Swal.fire({
                            title: 'Sửa blog thành công!',
                            icon: 'success',
                            timer: 1000, // Thời gian hiển thị thông báo (miligiây)
                            showConfirmButton: true // Ẩn nút xác nhận
                        })
                    })
                    .catch((error) => {
                        console.error('Lỗi khi xóa bài viết:', error);
                        Swal.fire('Đã xảy ra lỗi!', 'Vui lòng thử lại sau.', 'error');
                    });
            }
        });
    };

    return (
        <>
            <table className="table table-striped">
                             <thead>
                            <tr>
                                <th scope="col">#</th>
                                     <th scope="col">Title</th>
                                 <th scope="col">Content</th>
                                     <th scope="col">User</th>
                                     <th scope="col">Created at</th>
                                     <th scope="col" rowSpan={2}>Action at</th>
                                     <th scope="col"></th>
                                 </tr>
                             </thead>
                                 <tbody>
                             {list.map((item, index) =>{
                    return(
                        <tr key={index}>
                            <th scope="row">{item.id}</th>
                            <td>{item.title}</td>
                            <td>
                                <div dangerouslySetInnerHTML={{__html: item.content}}/>
                            </td>
                            <td>{item.user.username}</td>
                            <td>{item.createdAt}</td>
                            {parseInt(userID) === item.user.id ?(
                            <td>< Link to={"/edit/" + item.id}>Edit</Link> </td>): ""}
                            {parseInt(userID) === item.user.id ?(
                            <td onClick={() => handleDelete(item.id)}  >Delete</td>): ""}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}