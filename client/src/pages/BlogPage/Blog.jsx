import { useSelector } from 'react-redux';
import './blog.css'
import { useParams } from 'react-router-dom'
import parse from "html-react-parser";
import { getData } from '../../features/blogs/blogSlice';
const Blog = () => {
    const {blog_id} = useParams();
    const data = useSelector(getData);

    const sigleBlog = data.filter((ele) => ele._id === blog_id);
    const [blog] = sigleBlog;


  return (
    <div className='blog'>
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
