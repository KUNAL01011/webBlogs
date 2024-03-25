import { Link } from "react-router-dom";
import Post from "../post/Post";
import "./posts.css";

import data from "../../../data";

const blog = data.blog;

export default function Posts() {
  console.log(data.blog);
  return (
    <div className="posts">
      <Link to="/blogsigle"><Post blog = {blog} /></Link>
      <Link to="/blogsigle"><Post blog = {blog} /></Link>
      <Link to="/blogsigle"><Post blog = {blog} /></Link>
      <Link to="/blogsigle"><Post blog = {blog} /></Link>
      <Link to="/blogsigle"><Post blog = {blog} /></Link>
      <Link to="/blogsigle"><Post blog = {blog} /></Link>
      {/* <Link to="/blogsigle"><Post img="https://images.pexels.com/photos/6758029/pexels-photo-6758029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" /></Link>
      <Link to="/blogsigle"><Post img="https://images.pexels.com/photos/6711867/pexels-photo-6711867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/></Link>
      <Link to="/blogsigle"><Post img="https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/></Link>
      <Link to="/blogsigle"><Post img="https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"/></Link> */}
    </div>
  );
}