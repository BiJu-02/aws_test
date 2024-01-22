import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Page1.css';

const Page1 = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send text and image as a multipart/form-data
    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:4000/postImg', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Post request successful!');
      } else {
        console.error('Error in post request:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>

    <div>
      <h2>This is the page1</h2>
      <Link to="/page2">Go to page2</Link>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="centered-form">
        <div>
          <label htmlFor="text">Text:</label>
          <input type="text" id="text" value={text} onChange={handleTextChange} />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
    
    </>
  );
}

export default Page1;
