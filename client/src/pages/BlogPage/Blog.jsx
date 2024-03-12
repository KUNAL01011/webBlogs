import { useDispatch, useSelector } from 'react-redux';
import './blog.css'
import { useParams,useNavigate } from 'react-router-dom'
import parse from "html-react-parser";
import { deleteBlogAsync, getData } from '../../features/blogs/blogSlice';
const Blog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {blog_id} = useParams();
    const data = useSelector(getData);

    const sigleBlog = data.filter((ele) => ele._id === blog_id);
    const [blog] = sigleBlog;

    function handleClick(blog_id){
      dispatch(deleteBlogAsync(blog_id)).then(() => {
        navigate('/', {replace: true})
      }); 
    }

  return (
    <div className='blog'>
      <button onClick={() => handleClick(blog._id)} className='delete'>Delete</button>
      <button className='edit'>Edit</button>
      <h1 className="title">
        {blog.title}
      </h1>
      <p className="summary">
        {blog.summary}
      </p>
      <div className="img">
        <img src={blog.mainImage} alt="" />
      </div>
      <div className="content">
      {parse(blog.content)}
      </div>
      <p className="conclusion">
        {blog.conclusion}
      </p>
    </div>
  )
}

export default Blog
