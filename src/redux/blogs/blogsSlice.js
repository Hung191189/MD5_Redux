import {createSlice} from "@reduxjs/toolkit";
import {getBlogs} from "../../services/blogsService";
const initialState = {
    blogs: []
}
const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.blogs = action.payload;
        });
        // builder.addCase(addBlogs.fulfilled, (state, action) => {
        //     state.blogs.push(action.payload)
        // });
        // builder.addCase(deleteBlogs.fulfilled, (state, action) => {
        //     state.blogs = state.blogs.filter(blog => blog.id !== action.payload.id);
        // });
        // builder.addCase(editBlogs.fulfilled, (state, action) => {
        //     state.blogs = state.blogs.filter(blog => blog.id !== action.payload.id);
        // });
    }
})
export default blogsSlice.reducer;