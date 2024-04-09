import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { createBlogAsync } from "../features/blogs/blogSlice";

const Write = () => {
  const user = useSelector((state) => state.user.user.user);
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
      if (
        !title &&
        !summary &&
        !mainImage &&
        !content &&
        !conclusion &&
        !user
      ) {
        console.log("We don't get data here ");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("content", content);
      formData.append("conclusion", conclusion);
      formData.append("mainImage", mainImage);

      dispatch(createBlogAsync(formData));

    } catch (error) {
      console.error("Error adding Blog:", error);
    }
  };

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
    <div className=" text-white rounded-lg shadow-lg bg-[##141624] mt-16">
      <h1 className="text-center text-lg font-extrabold">Create Blog Post</h1>
      <form
        className=" flex flex-col p-4 gap-4 border border-gray-600 rounded-lg"
        onClick={handleSubmit}
      >
        <label htmlFor="title">Title:</label>
        <input
          className="bg-[#242535] rounded-md h-8 outline-none px-4 py-2"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          required
        />
        <label htmlFor="subtile">Subtitle:</label>
        <textarea
          className="bg-[#242535] rounded-md outline-none px-4 py-2"
          id="subtile"
          name="subtitle"
          value={summary}
          onChange={handleChange}
          required
        />
        <label htmlFor="mainImage">Main Image:</label>
        <input
          className="bg-[#242535] rounded-md w-[20%] outline-none px-4 py-2"
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
            className="text-white outline-none"
            modules={modules}
            formats={formats}
            theme="snow"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <label htmlFor="conclusion">Conclusion:</label>
        <textarea
          className="bg-[#242535] rounded-md h-20 outline-none px-4 py-2"
          id="conclusion"
          name="conclusion"
          value={conclusion}
          onChange={handleChange}
        />
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="border border-gray-500 bg-blue-600 px-24 rounded-lg pt-1 pb-1"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
