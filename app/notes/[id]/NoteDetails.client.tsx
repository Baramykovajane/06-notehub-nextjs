"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useState, ChangeEvent, FormEvent } from "react";

import css from "@/styles/NoteDetails.module.css"; 

export default function NoteDetailsClient() {
  const { id } = useParams();
  const noteId = Array.isArray(id) ? id[0] : id;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId!),
    enabled: !!noteId,
    refetchOnMount: false,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  
  useState(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  });

  const handleEdit = () => setIsEdit(true);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submit note:", { title, content });
    
    setIsEdit(false);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <button className={css.editButton} onClick={handleEdit}>
        Edit
      </button>

      {isEdit ? (
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <input
              className={css.input}
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
            />
          </div>
          <div className={css.formGroup}>
            <textarea
              className={css.textarea}
              value={content}
              onChange={handleContentChange}
              placeholder="Content"
            />
          </div>
          <button type="submit" className={css.submitButton}>
            Submit
          </button>
        </form>
      ) : (
        <div className={css.noteDetails}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
