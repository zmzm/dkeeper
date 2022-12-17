import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend"

function App() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const newNotes = await dkeeper_backend.getNotes();
    setNotes(newNotes);
  };

  useEffect(() => {
    getNotes();
  }, [])

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    dkeeper_backend.createNote(newNote.title, newNote.content);
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((_, index) => {
        return index !== id;
      });
    });
    dkeeper_backend.deleteNote(id);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
