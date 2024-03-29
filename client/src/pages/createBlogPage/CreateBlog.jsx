import { useState } from "react";
import ReactQuill from "react-quill";
import "./createBlog.css";
import "react-quill/dist/quill.snow.css"; // Include CSS for rich text editor
import {useDispatch, useSelector} from 'react-redux'
import { createBlogAsync } from "../../features/blogs/blogSlice";

const CreateBlog = () => {
  const user = useSelector((state)=> state.user.user.user);
  const validation = true;
  const [title, setTitle] = useState(""); // title of blog
  const [summary, setSummary] = useState(""); // summary of blog
  const [mainImage, setMainImage] = useState(null); // main Image of blog
  const [content, setContent] = useState(""); // Initialize content as an empty string
  const [conclusion, setConclusion] = useState(""); // set the conclusion of blog
  const dispatch = useDispatch();

  // set the data into set State
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "summary") {
      setSummary(value);
    } else if (name === "mainImage") {
      setMainImage(files[0]); // Use the first uploaded file
    } else if (name === "conclusion") {
      setConclusion(value);
    }
  };

  // Set the content of the content data
  const handleContentChange = (value) => {
    setContent(value);
  };

  // Sending all data to backend when i click on submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!title && !summary && !mainImage && !content && !conclusion && !user) {
        console.log("We don't get data here ");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("content", content);
      formData.append("conclusion", conclusion);
      formData.append("mainImage", mainImage); // Assuming mainImage is a File object
      formData.append("user",user);


      const res = await dispatch(createBlogAsync(formData));

     

      if (res.meta.requestStatus === "fulfilled") {
        setTitle("");
        setSummary("");
        setMainImage(null);
        setContent("");
        setConclusion("");
      }
    } catch (error) {
      console.error("Error adding Blog:", error);
    }
  };

  //simple rich editor functionality
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strikethrough"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "link",
    "image",
    "video",
  ];
  return (
    <div className="blog-form">
      <h1 className="heading">Create Blog Post</h1>
      {!validation ? (
        <h1>Sorry you need to login first </h1>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
          <label htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={handleChange}
            required
          />
          <label htmlFor="mainImage">Main Image:</label>
          <input
            type="file"
            id="mainImage"
            name="mainImage"
            accept="image/*"
            onChange={handleChange}
          />
          <div id="editor">
            <label className="bg-transprent" htmlFor="content">
              Content:
            </label>
            <ReactQuill
              modules={modules}
              formats={formats}
              theme="snow"
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <label htmlFor="conclusion">Conclusion:</label>
          <textarea
            id="conclusion"
            name="conclusion"
            value={conclusion}
            onChange={handleChange}
          />
          <div className="btn-wrapper">
            <button type="submit" className="btn">
              Upload
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateBlog;
