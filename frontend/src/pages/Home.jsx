import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { BsPlusLg } from "react-icons/bs";
import Docs from '../components/Docs';
import { MdOutlineTitle } from "react-icons/md";
import { api_base_url } from '../Helper';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [isEditModelShow, setIsEditModelShow] = useState(false);
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [currentDocId, setCurrentDocId] = useState(null); // ID of the document being edited
  const [documentContent, setDocumentContent] = useState(""); // Content of the document
  const navigate = useNavigate();

  const createDoc = () => {
    if (title === "") {
      setError("Please enter a title");
    } else {
      fetch(api_base_url + "/createDoc", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docName: title,
          userId: localStorage.getItem("userId")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setIsCreateModelShow(false);
            navigate(`/createDocs/${data.docId}`);
          } else {
            setError(data.message);
          }
        });
    }
  };

  const getData = () => {
    fetch(api_base_url + "/getAllDocs", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    })
      .then(res => res.json())
      .then(data => {
        setData(data.docs);
      });
  };

  const loadDocument = (docId, docName) => {
    fetch(api_base_url + "/getDoc", { // Assuming this endpoint fetches the document content
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docId,
        userId: localStorage.getItem("userId")
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCurrentDocId(docId);
          setEditTitle(docName);
          setDocumentContent(data.content); // Set document content
          setIsEditModelShow(true);
        } else {
          setError(data.message);
        }
      });
  };

  const saveDocument = () => {
    if (editTitle === "" || documentContent === "") {
      setError("Please enter a title and content");
    } else {
      fetch(api_base_url + "/updateDoc", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docId: currentDocId,
          docName: editTitle,
          content: documentContent, // Send updated content
          userId: localStorage.getItem("userId")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setIsEditModelShow(false);
            setEditTitle(""); // Clear title after saving
            setDocumentContent(""); // Clear content after saving
            getData(); // Refresh the documents
          } else {
            setError(data.message);
          }
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between px-[100px]">
        <h3 className='mt-7 mb-3 text-3xl font-semibold'>All Documents</h3>
        <button className="btnBlue flex items-center space-x-2" onClick={() => {
          setIsCreateModelShow(true);
          document.getElementById('title').focus();
        }}>
          <BsPlusLg className="text-xl" />
          <span>Create New Document</span>
        </button>
      </div>

      <div className='allDocs px-[100px] mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          data ? data.map((el, index) => {
            return (
              <Docs 
                docs={el} 
                docID={`doc-${index + 1}`} 
                onEdit={() => loadDocument(el.id, el.docName)} // Load document on edit
                key={el.id} 
              />
            )
          }) : <p className="text-center text-gray-500">No documents found.</p>
        }
      </div>

      {/* Create Document Modal */}
      {isCreateModelShow && (
        <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] w-screen h-screen flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out">
          <div className="createDocsModel p-[15px] bg-[#fff] rounded-lg shadow-lg w-[30vw] h-[auto] max-h-[400px] overflow-y-auto">
            <h3 className='text-[20px] font-semibold'>Create New Document</h3>
            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            <div className='inputCon mt-3'>
              <p className='text-[14px] text-[#808080]'>Title</p>
              <div className="inputBox w-[100%] flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                <MdOutlineTitle className="text-gray-400 p-2" />
                <input
                  onChange={(e) => { setTitle(e.target.value); setError(""); }}
                  value={title}
                  type="text"
                  placeholder='Title'
                  id='title'
                  name='title'
                  required
                  className="w-full p-2 outline-none rounded-md"
                />
              </div>
            </div>
            <div className="flex mt-4 items-center gap-2 justify-between w-full">
              <button onClick={createDoc} className='btnBlue flex-1 mr-2'>Create New Document</button>
              <button onClick={() => { setIsCreateModelShow(false); setError(""); }} className='p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer flex-1'>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Document Modal */}
      {isEditModelShow && (
        <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] w-screen h-screen flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out">
          <div className="createDocsModel p-[15px] bg-[#fff] rounded-lg shadow-lg w-[30vw] h-[auto] max-h-[400px] overflow-y-auto">
            <h3 className='text-[20px] font-semibold'>Edit Document</h3>
            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            <div className='inputCon mt-3'>
              <p className='text-[14px] text-[#808080]'>Title</p>
              <div className="inputBox w-[100%] flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                <MdOutlineTitle className="text-gray-400 p-2" />
                <input
                  onChange={(e) => { setEditTitle(e.target.value); setError(""); }}
                  value={editTitle}
                  type="text"
                  placeholder='Title'
                  id='edit-title'
                  name='edit-title'
                  required
                  className="w-full p-2 outline-none rounded-md"
                />
              </div>
            </div>

            <div className='inputCon mt-3'>
              <p className='text-[14px] text-[#808080]'>Content</p>
              <textarea
                onChange={(e) => setDocumentContent(e.target.value)}
                value={documentContent}
                placeholder='Document content here...'
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={5}
              />
            </div>

            <div className="flex mt-4 items-center gap-2 justify-between w-full">
              <button onClick={saveDocument} className='btnBlue flex-1 mr-2'>Save Document</button>
              <button onClick={() => { setIsEditModelShow(false); setError(""); }} className='p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer flex-1'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
