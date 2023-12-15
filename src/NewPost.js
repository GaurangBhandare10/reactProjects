import React from 'react'
import DataContext from './context/DataContext'
import { useState,useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import api from './api/posts'
import format from 'date-fns/format'
const NewPost = () => {
    const [postTitle,setPostTitle]=useState('');
    const [postBody,setPostBody]=useState('');
    const {posts,setPosts} = useContext(DataContext);
    const navigate=useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const id= posts.length ? posts[posts.length-1].id+1 :1;
        const datetime= format(new Date(), 'MMMM dd, yyyy pp');
        const newPost= {id,title:postTitle,datetime,body:postBody}
        try{
          const response=await api.post('/posts', newPost);
          const allPosts=[...posts, response.data]
          setPosts(allPosts);
          setPostTitle('');
          setPostBody('');
          navigate('/')
        }
        // so once we submit the new post we must set the setPostTitle and setPostBody back to empty string
        catch(error){
          console.log(`Error: ${error.message}`);
        }
      }

    return (
        <main className='NewPost'>
            <h2>Newpost</h2>
            {/* here in the onSubmit method we have directly called the handleSubmit function instead of e.preventDefault
            which is also fine bcoz we defined e.preventDefault in the handleSubmit function */}
            <form className='newPostForm' onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input type="text" id='postTitle' required value={postTitle} 
                onChange={(e)=>setPostTitle(e.target.value)} />
                <label htmlFor="postBody">Post:</label>
                <textarea name="postBody" id="postBody" cols="30" rows="10"
                required  value={postBody}  onChange={(e)=>setPostBody(e.target.value)}></textarea>
            
                <button type='submit'>Submit</button>
            
            </form>
        </main>
    )
}

export default NewPost
