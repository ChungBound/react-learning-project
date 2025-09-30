import { NextResponse } from 'next/server';
import { getNote, updateNote, deleteNote } from '@/lib/models';

// GET /api/notes/[id] - 获取单个笔记
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const note = getNote(params.id);
  if (!note) {
    return NextResponse.json({ error: '笔记不存在' }, { status: 404 });
  }
  return NextResponse.json(note);
}

// PUT /api/notes/[id] - 更新笔记
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const note = updateNote(params.id, body);
    if (!note) {
      return NextResponse.json({ error: '笔记不存在' }, { status: 404 });
    }
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: '更新笔记失败' }, { status: 400 });
  }
}

// DELETE /api/notes/[id] - 删除笔记
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const success = deleteNote(params.id);
  if (!success) {
    return NextResponse.json({ error: '笔记不存在' }, { status: 404 });
  }
  return NextResponse.json({ message: '删除成功' });
} 