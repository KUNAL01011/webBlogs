import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from './pages/HomePage/Home.jsx'
import CreateBlog from './pages/createBlogPage/CreateBlog.jsx'
import Blog from './pages/BlogPage/Blog.jsx'
import Register from './pages/RegisterPage/Register.jsx'
import Login from './pages/loginPage/Login.jsx'
import OTPPage from './pages/otpPage/Otp.jsx'
import About from './pages/aboutPage/About.jsx'
import SingleBlog from './pages/singleBlog/SingleBlog.jsx'
import Profile from './pages/profilePage/Profile.jsx'


// creating routes navigator
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='create-blog' element={<CreateBlog/>}/>
      <Route path='/blog/:blog_id' element={<Blog/>}/>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/otp' element={<OTPPage/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/blogsigle' element={<SingleBlog/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
