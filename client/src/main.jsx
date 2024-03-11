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


// creating routes navigator
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='create-blog' element={<CreateBlog/>}/>
      <Route path='/blog/:blog_id' element={<Blog/>}/>
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
