import { useEffect,useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from './context/DataContext'
import { useContext } from "react";
import api from './api/posts'
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";


const EditPost = () => {
    const {posts, setPosts}=useContext(DataContext);
    const { id } = useParams();
    const [editTitle,setEditTitle]=useState('');
    const [editBody,setEditBody]=useState('');
    const post = posts.find(post => (post.id).toString() === id);
    const navigate=useNavigate();
    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])


    const handleEdit = async(id)=>{
        const datetime= format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost= {id,title:editTitle,datetime,body:editBody};
      try {
        const response= await api.put(`/posts/${id}`, updatedPost)
        setPosts(posts.map(post=>post.id===id? {...response.data}:post))
        setEditTitle('');
        setEditBody('');
        navigate('/');
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }


    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        {/* here we used the prevetDefault function bcoz we have not defined it in the  handleedit function 
                        thats why in the button we have defined the onclick function 
                        we had not done the same in newpost.js file, we directly called the handlesubmit function in the on submit
                        function area bcoz we have defined the preventDefault in the handlesubmit function  and hence we have not
                        written the onclick function in the button area in newpost.js file*/}
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost