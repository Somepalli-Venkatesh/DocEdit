import React, { useState } from 'react';
import docsIcon from "../images/docsIcon.png";
import { MdDelete } from "react-icons/md";
import deleteImg from "../images/delete.png";
import { api_base_url } from '../Helper';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Docs = ({ docs }) => {
  const [error, setError] = useState("");
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

  // Generate a unique ID for each document item
  const docID = `doc-${docs._id}`;
  const navigate = useNavigate();

  const deleteDoc = (id) => {
    fetch(api_base_url + "/deleteDoc", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docId: id,
        userId: localStorage.getItem("userId")
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        toast.success(data.message, {
          position: "bottom-center", // Position of the toast
          autoClose: 2000, // Time in milliseconds before the toast disappears
          hideProgressBar: true, // Hide progress bar
          closeOnClick: true, // Close on click
          pauseOnHover: false, // Do not pause on hover
          draggable: false, // Disable drag to close
        });
        setIsDeleteModelShow(false);
        document.getElementById(docID)?.remove(); // Safely remove the document element
      } else {
        setError(data.message);
      }
    })
    .catch(error => {
      console.error("Error deleting document:", error);
      setError("An error occurred while deleting the document.");
    });
  };

  return (
    <>
      <div id={docID} className='docs cursor-pointer rounded-lg flex items-center mt-2 justify-between p-[10px] bg-[#F0F0F0] transition-all hover:bg-[#DCDCDC] shadow-md'>
        <div onClick={() => navigate(`/createDocs/${docs._id}`)} className="left flex items-center gap-2">
          <img src={docsIcon} alt="" className="w-8 h-8" />
          <div>
            <h3 className='text-[20px] font-medium'>{docs.title}</h3>
            <p className='text-[14px] text-[#808080]'>
              Created On: {new Date(docs.date).toLocaleDateString()} | Last Updated: {new Date(docs.lastUpdate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="docsRight">
          <i onClick={() => setIsDeleteModelShow(true)} className="delete text-[30px] text-red-500 cursor-pointer transition-all hover:text-red-600">
            <MdDelete />
          </i>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModelShow && (
        <div className="deleteDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] w-screen h-screen flex flex-col items-center justify-center">
          <div className="deleteModel flex flex-col justify-center p-[20px] bg-white rounded-lg shadow-lg w-[30vw] max-w-md h-[auto]">
            <h3 className='text-[24px] font-semibold'>Delete Document</h3>
            <div className="flex items-center gap-3 my-4">
              <img src={deleteImg} alt="" className="w-12 h-12" />
              <div>
                <h3 className='text-[18px]'>Are You Sure You Want to Delete This Document?</h3>
                <p className='text-[14px] text-[#808080]'>This action cannot be undone.</p>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex mt-2 items-center gap-2 justify-between w-full">
              <button onClick={() => deleteDoc(docs._id)} className='p-[10px] bg-red-500 transition-all hover:bg-red-600 text-white rounded-lg border-0 cursor-pointer min-w-[48%]'>
                Delete
              </button>
              <button onClick={() => setIsDeleteModelShow(false)} className='p-[10px] bg-gray-300 text-black rounded-lg border-0 cursor-pointer min-w-[48%]'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container for notifications */}
      <ToastContainer />
    </>
  );
};

export default Docs;
