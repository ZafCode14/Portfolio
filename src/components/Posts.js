import React from 'react';
import { useState, useEffect } from 'react';
import PostService from '../services/post.service';

function Posts(props) {
    const [posts, setPosts] = useState(props.posts);
    const [clicked, setClicked] = useState(props.clicked);
    const [editValues, setEditValues] = useState({})
    return (
        <div>
        {Object.entries(posts).map(([key, value]) => {
            const handle_delete = () => {
                PostService.delete_post(key).then(() => {
                const { [key]: _, ...newPosts } = posts;
                setPosts(newPosts);
                    console.log(posts);
                });
            }
            const handle_edit = () => {
                const newPosts = { ...posts };
                newPosts[key] = { ...newPosts[key], edited: true };
                setPosts(newPosts);
                setEditValues({
                    title: value.title,
                    main: value.main
                })
            }
            const handle_save = () => {
                PostService.edit_post(key, editValues).then(() => {
                    setClicked(!clicked);
                })
            }
            const handle_change = (e) => {
                setEditValues({...editValues, [e.target.name]: e.target.value})
            }
            console.log(value.title);
            if (value.edited === false) {
                return (
                    <div className='post_container' key={key}>
                        <h3>{value.title}</h3>
                        <p>{value.main}</p>
                        {props.user_id === value.user_id && 
                        <div className='post_buttons'>
                            <button onClick={handle_edit}>Edit</button>
                            <button onClick={handle_delete}>Delete</button>
                        </div>
                        }
                    </div>
                )
            } else {
                return (
                    <div className='post_container' key={key}>
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
                            <button onClick={handle_save}>Save</button>
                            <button onClick={handle_delete}>Delete</button>
                        </div>
                    </div>
                )
            }
        })}
        </div>
    );
}

export default Posts;