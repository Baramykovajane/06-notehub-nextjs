"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),

    enabled: !!id,

    
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, 
  });

  if (!id) return <p>Note ID not found.</p>;
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>Note not found.</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{new Date(data.createdAt).toLocaleString()}</p>
    </div>
  );
}
