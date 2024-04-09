import { useEffect } from "react"
import Card from "../components/Card"
import {useDispatch,useSelector} from 'react-redux'
import { getAllBlogsAsync } from "../features/blogs/blogSlice";

const Home = () => {

  const dispatch = useDispatch();

  const blogs = useSelector((state)=>state.blog.blogs);

  useEffect(()=>{
    dispatch(getAllBlogsAsync());
  },[])

  return (
    <div className="grid grid-cols-3 gap-5 mt-10s">
      {blogs?.map((item)=>(
        <Card key={item.id} blogData={item}/>
      ))}
    </div>
  )
}

export default Home
