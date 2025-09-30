"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // 获取所有笔记
  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("获取笔记失败:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 创建或更新笔记
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // 更新笔记
        await fetch(`/api/notes/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      } else {
        // 创建笔记
        await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      }
      setTitle("");
      setContent("");
      setEditingId(null);
      fetchNotes();
    } catch (error) {
      console.error("保存笔记失败:", error);
    }
  };

  // 删除笔记
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      fetchNotes();
    } catch (error) {
      console.error("删除笔记失败:", error);
    }
  };

  // 编辑笔记
  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">笔记应用</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{editingId ? "编辑笔记" : "新建笔记"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="内容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[100px]"
            />
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              {editingId ? "更新" : "创建"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{note.title}</span>
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(note)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{note.content}</p>
              <p className="text-sm text-muted-foreground mt-2">
                创建于: {new Date(note.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
