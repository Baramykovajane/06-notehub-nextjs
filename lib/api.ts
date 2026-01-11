import axios from "axios";


export type NoteTag =
  | "Todo"
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});


api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  if (!token) {
    throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is missing");
  }

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});


export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>("/notes", { params });
  return res.data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const res = await api.post<Note>("/notes", payload);
  return res.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export interface UpdateNotePayload {
  title: string;
  content: string;
}

export const updateNote = async (id: string, payload: UpdateNotePayload) => {
  const res = await api.put(`/notes/${id}`, payload);
  return res.data;
}