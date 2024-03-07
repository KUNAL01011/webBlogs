import { useState } from 'react';
import ReactQuill from 'react-quill';
import './createBlog.css'
import 'react-quill/dist/quill.snow.css'; // Include CSS for rich text editor

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [content, setContent] = useState(''); // Initialize content as an empty string

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'summary') {
      setSummary(value);
    } else if (name === 'mainImage') {
      setMainImage(files[0]); // Use the first uploaded file
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    console.log(mainImage);
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('mainImage', mainImage);
    // Add content as plain text for easier server-side handling, especially if the content includes HTML formatting
    formData.append('content', content);

    // Handle form submission logic here (e.g., send data to your server)
    console.log('Form submitted:', formData); // Replace with actual submission implementation

    // Clear form fields after submission
    setTitle('');
    setSummary('');
    setMainImage(null);
    setContent('');
  };


  //simple rich editor functionality 
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strikethrough'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'link',
    'image',
    'video',
  ];

  return (
    <div className="blog-form">
      <h1 className='heading'>Create Blog Post</h1>
      <form onSubmit={handleSubmit} className='form'>
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
        <div id='editor'>
        <label className = "bg-transprent" htmlFor="content">Content:</label>
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
          // Placeholder for a conclusion field
          // ...
        />
        <div className='btn-wrapper'>
        <button type="submit" className='btn'>Upload</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;