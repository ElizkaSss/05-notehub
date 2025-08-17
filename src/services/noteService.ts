import axios from 'axios';
import { Note } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

// Тип для створення нотатки
export interface CreateNoteDto {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

const API_URL = 'https://notehub-public.goit.study/api/notes';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

// Отримання нотаток
export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axiosInstance.get<FetchNotesResponse>('', {
    params: { page, perPage, search }
  });
  return response.data;
};

// Створення нотатки
export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const response = await axiosInstance.post<Note>('', note);
  return response.data;
};

// Видалення нотатки
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`/${id}`);
  return response.data;
};

