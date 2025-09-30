export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 模拟数据库
let notes: Note[] = [];

export const getNotes = () => notes;

export const getNote = (id: string) => notes.find(note => note.id === id);

export const createNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newNote: Note = {
    id: Date.now().toString(),
    ...note,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notes.push(newNote);
  return newNote;
};

export const updateNote = (id: string, note: Partial<Note>) => {
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) return null;
  
  notes[index] = {
    ...notes[index],
    ...note,
    updatedAt: new Date().toISOString(),
  };
  return notes[index];
};

export const deleteNote = (id: string) => {
  const index = notes.findIndex(note => note.id === id);
  if (index === -1) return false;
  
  notes.splice(index, 1);
  return true;
}; 