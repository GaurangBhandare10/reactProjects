
// the page which is opened when we click on a particular post of all the 6 post which are displayed on the home page
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import DataContext from './context/DataContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api/posts'



const PostPage = () => {
    const navigate=useNavigate();
    const {posts,setPosts}=useContext(DataContext);
    const {id} = useParams();
    const post= posts.find(post=> (post.id).toString()===id)


    const handleDelete= async (id)=>{
        try{
          if (window.confirm('Are you sure you want to delete ?')) {
          await api.delete(`/posts/${id}`);
          const postList= posts.filter(post=> post.id!==id);
          setPosts(postList);
          navigate('/');
          }
        }
        catch(error){
          console.log(`Error: ${error.message}`);
        }
      }


    return (
        <main className='PostPage'>
            <article className='post'>
                {/* if post loads */}
                {post && 
                    <>
                        <h2>{post.title}</h2>
                        <p className='postDate'>{post.datetime}</p>
                        <p className='postBody'>{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className='editButton'>Edit post</button></Link>
                        <button className='deleteButton' onClick={()=>handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
            {/* // if post is not found i.e you search for a non exisiting post */}
                {!post && 
                    <>
                        <h2>Post not found</h2>
                        <p> Well,Thats disappointing</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>

                }
            </article>
        </main>
    )
}

export default PostPage
