import { NextResponse } from 'next/server';
import { getNotes, createNote, getNote, updateNote, deleteNote } from '@/lib/models';

// GET /api/notes - 获取所有笔记
export async function GET() {
  const notes = getNotes();
  return NextResponse.json(notes);
}

// POST /api/notes - 创建新笔记
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const note = createNote(body);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '创建笔记失败' }, { status: 400 });
  }
} 