import React from 'react'
import {Link} from 'react-router-dom'
const Post = ({post}) => {
    return (
       <article className='post'>
        <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
        </Link>
{/* the link section includes linking the title and the datetime line of the post so that we you click on it the particular post opens */}

        <p className='postBody'>{(post.body).length<=25 ?
            post.body : `${(post.body).slice(0,25)}...`}
        </p>
{/* the above line says that initially display only 25 letters of the body and add... at the end if the length of the body is > than 25 characters */}
       </article>
    )
}

export default Post
