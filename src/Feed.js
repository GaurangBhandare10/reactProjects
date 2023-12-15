import React from 'react'
import Post from './Post'
const Feed = ({posts}) => {
    return (
        <>
            {posts.map(post=>(
                <Post key={post.id} post={post}/>
            ))}
        </>
        // mapping through the post
    )
}

export default Feed
