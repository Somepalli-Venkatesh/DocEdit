import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from "jodit-pro-react";
import { api_base_url } from '../Helper';

const CreateDocs = () => {
  let { docsId } = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const updateDoc = () => {
    fetch(api_base_url + "/uploadDoc", {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        docId: docsId,
        content: content
      })
    }).then(res => res.json()).then(data => {
      if (data.success === false) {
        setError(data.message);
        setSuccessMessage(""); // Clear success message if there's an error
      } else {
        setError("");
        setSuccessMessage("Document saved successfully!"); // Set success message
      }
    }).catch((error) => {
      console.error("Error saving document:", error);
      setError("An error occurred while saving the document.");
      setSuccessMessage(""); // Clear success message if there's an error
    });
  };

  const getContent = () => {
    fetch(api_base_url + "/getDoc", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        docId: docsId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          setError(data.message);
        } else {
          setContent(data.doc.content);
        }
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
        setError("An error occurred while fetching the document.");
      });
  };

  useEffect(() => {
    getContent();
  }, []);
  
  return (
    <>
      <Navbar />
      <div className='px-[100px] mt-3'>
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1} // tabIndex of textarea
          onChange={e => setContent(e)} // Update content state
        />
        {/* Display error message */}
        {error && <p className='text-red-500 mt-2'>{error}</p>}
        {/* Display success message */}
        {successMessage && <p className='text-green-500 mt-2'>{successMessage}</p>}
        <button 
          onClick={updateDoc} 
          className='btnBlue mt-4' // Your button style
        >
          Save
        </button>
      </div>
    </>
  )
}

export default CreateDocs;
