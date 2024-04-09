import { ThumbUp } from "@mui/icons-material";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import { getBlogByIdAsync } from "../features/blogs/blogSlice";


const SinglePage = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleBlog = useSelector((state) => state.blog.singleBlog);

  useEffect(()=>{
    dispatch(getBlogByIdAsync(id));
  },[])

  return (
    <div className="w-[50%] m-auto text-white">
      <span className="text-sm px-2 rounded-lg opacity-[0.8] bg-blue-600">
        {singleBlog?.category}
      </span>
      <h1 className="text-2xl font-medium mt-4">
        {singleBlog?.title}
      </h1>
      <p>{singleBlog?.subtitle}</p>
      <div className="flex gap-2 justify-between items-center opacity-[0.8] mt-4">
        <div className="flex items-center gap-4">
        <NavLink to={`/profile/${singleBlog?.user?._id}`}><img src={singleBlog?.user?.avatar} className="w-8 h-8" alt="" /></NavLink>
        <span className="text-sm mr-14">{singleBlog?.user?.fullName}</span>
        </div>
        <div className="flex items-center gap-4">
        <span className="text-sm ml-10 flex items-center"><span className="mr-3">1m</span><ThumbUp className="text-blue-700 cursor-pointer"/></span>
        <span className="text-sm">August 20, 2022</span>
        </div>
      </div>
      <img
        src={singleBlog.mainImage}
        alt=""
        className="mt-4"
      />
      <div className="flex flex-col customs">
        {singleBlog?.content}
      </div>
      <div className="flex flex-col mt-2">
        <h1 className="text-xl">Conclusion</h1>
        <p>{singleBlog?.conclusion}</p>
      </div>
    </div>
  );
};

export default SinglePage;
