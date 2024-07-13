import React, { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import moment from "moment";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import EmptyCard from "../../components/EmptyCard";

export default function Home() {
  const [opanAddEditModal, setOpanAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState();
  const [allNotes, setAllNotes] = useState();

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpanAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getUserInfo = async () => {
    try {
      const res = await fetch("/api/user");
      const data = await res.json();

      if (data) {
        setUserInfo(data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        const res = await fetch("/api/user/signout");
        const data = await res.json();

        if (res.ok) {
          localStorage.clear();
          navigate("/signin");
        }

        localStorage.clear();
        navigate("/signin");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const res = await fetch("api/note");
      const data = await res.json();

      setAllNotes(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const res = await fetch(`/api/note/delete/${noteId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      }

      toast("Note Deleted Successfully!", {
        icon: <FaTrash color="red" />,
      });
      getAllNotes();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto">
        {allNotes && allNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
            {allNotes.map((e) => (
              <NoteCard
                key={e._id}
                title={e.title}
                date={moment(e.createdAt).format("Do MMM YYYY")}
                content={e.content}
                tags={e.tags}
                isPinned={e.isPinned}
                onEdit={() => {
                  handleEdit(e);
                }}
                onDelete={() => {
                  deleteNote(e);
                }}
                onPinNote={() => {}}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            message={`Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`}
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:opacity-95 absolute right-10 bottom-10"
        onClick={() => {
          setOpanAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={opanAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNotes
          type={opanAddEditModal.type}
          noteData={opanAddEditModal.data}
          onClose={() => {
            setOpanAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
}
