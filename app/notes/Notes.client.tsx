"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

const PAGE = 1;
const PER_PAGE = 12;

export default function NotesClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", { page: PAGE, perPage: PER_PAGE, search: "" }],
    queryFn: () => fetchNotes({ page: PAGE, perPage: PER_PAGE }),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return <NoteList notes={data.notes} />;
}
