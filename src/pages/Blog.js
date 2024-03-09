import React, { useEffect, useState } from 'react';
import PostService from '../services/post.service';
import AuthService from '../services/auth.service';
import "./Blog.css"

function Blog(props) {
    const [editValues, setEditValues] = useState({})
    const [posts, setPosts] = useState({})
    const [user, setUser] = useState({})
    const [values, setValues] = useState({title: "", main: ""})

    useEffect(() => {
        PostService.get_all_posts().then((result) => {
            setPosts(result)
        })

        if (props.user) {
            AuthService.data().then((result) => {
                setUser(result.claims);
            })
        }
    // eslint-disable-next-line
    }, [])

    const submit_create_post = (e) => {
        e.preventDefault();
        PostService.create_post(values).then((result) => {
            setPosts({...posts, [result.created_at]: result})
            setValues({title: "", main: ""})
        })
    }

    const handle_delete = (key) => {
        PostService.delete_post(key).then(() => {
        const { [key]: _, ...newPosts } = posts;
        setPosts(newPosts);
        });
    }

    const handle_edit = (key, value) => {
        const newPosts = { ...posts };
        newPosts[key] = { ...newPosts[key], edited: true };
        setPosts(newPosts);
        setEditValues({
            title: value.title,
            main: value.main
        })
    }

    const handle_save = (key) => {
        PostService.edit_post(key, editValues).then(() => {
            const newPosts = { ...posts };
            newPosts[key] = { 
                ...newPosts[key], 
                title: editValues.title,
                main: editValues.main,
                edited: false
            };
            setPosts(newPosts);
        })
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handle_change = (e) => {
        setEditValues({...editValues, [e.target.name]: e.target.value})
    }

    return (
        <div className='all_posts format_page'>
            <h1>Blog</h1>
            {user.is_staff &&
            <form onSubmit={submit_create_post} className='create_container bc_3'>
                <input 
                type='text'
                placeholder='Enter the post title'
                name='title'
                value={values.title}
                onChange={onChange}
                /><br/>
                <textarea
                placeholder='Enter the main text'
                name='main'
                value={values.main}
                onChange={onChange}
                style={{whiteSpace: "pre-wrap"}}
                />
                <div className='post_buttons'>
                    <button>Create</button>
                </div>
            </form> }
            {Object.values(posts).reverse().map((value) => {
                if (value.edited === false) {
                    return (
                        <div className='post_container bc_3' key={value.created_at}>
                            <h3>{value.title}</h3>
                            {value.main.split("\n").map((par, index) => (<p key={index}>{par}</p>))}
                            {user.sub === value.user_id && 
                            <div className='post_buttons'>
                                <button onClick={() => handle_edit(value.created_at, value)}>Edit</button>
                                <button onClick={() => handle_delete(value.created_at)}>Delete</button>
                            </div>
                            }
                        </div>
                    )
                } else {
                    return (
                        <div className='post_container' key={value.created_at}>
                            <input 
                            type='text'
                            placeholder='Enter the post title'
                            name='title'
                            value={editValues.title}
                            onChange={handle_change}
                            /><br/>
                            <textarea
                            placeholder='Enter the main text'
                            name='main'
                            value={editValues.main}
                            onChange={handle_change}
                            />
                            <div className='post_buttons'>
                                <button onClick={() => handle_save(value.created_at)}>Save</button>
                                <button onClick={() => handle_delete(value.created_at)}>Delete</button>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    );
}

export default Blog;