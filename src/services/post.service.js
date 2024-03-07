import axios from 'axios'
import authHeader from './auth.header';

const create_post = async (values) => {
    return axios.post("/posts/add", values,
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const edit_post = async (post_id, values) => {
    return axios.put(`/posts/edit/${post_id}`, values, 
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const delete_post = async (post_id) => {
    return axios.delete(`/posts/delete/${post_id}`, 
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const get_post = async (values) => {
    return axios.get(`/${values.postId}`, 
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const get_all_posts = async () => {
    return axios.get("posts/all", 
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const PostService = {
    create_post,
    edit_post,
    delete_post,
    get_post,
    get_all_posts
}

export default PostService;