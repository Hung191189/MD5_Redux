import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
// const token = {
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//     }
// }

export const getBlogs = createAsyncThunk(
    'blogs/getBlogs',
    async () => {
        const res = await axios.get('http://localhost:8000/blogs');
        return res.data;

    }
)