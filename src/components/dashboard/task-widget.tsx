"use client";
import { useState } from "react";
import WidgetCard from "./widget-card";
import { Check, Plus, Trash2 } from "lucide-react";
import { updateTask, deleteTask, createTask } from "@/lib/actions/tasks";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
}

interface TaskWidgetProps {
  initialTasks: Task[];
}

export default function TaskWidget({ initialTasks }: TaskWidgetProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const toggleTask = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "done" ? "todo" : "done";
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));

    const result = await updateTask(id, { status: newStatus as any });
    if (result.error) {
      setTasks(tasks);
      toast.error(result.error);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const result = await createTask({ title: newTaskTitle.trim() });
    if (result.task) {
      setTasks([result.task as Task, ...tasks]);
      setNewTaskTitle("");
      toast.success("Task created");
    } else if (result.error) {
      toast.error(result.error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    const result = await deleteTask(id);
    if (result.error) {
      toast.error(result.error);
    }
  };

  const completedCount = tasks.filter((t) => t.status === "done").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <WidgetCard title="Active Tasks">
      <div className="flex h-full flex-col">
        <div className="mb-4">
          <div className="mb-1.5 flex justify-between text-xs text-white/50">
            <span>Progress</span>
            <span className="font-semibold text-cyan-400">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[170px]">
          {tasks.length === 0 ? (
            <div className="flex h-20 items-center justify-center text-xs text-white/30">
              No tasks yet. Add your first task above!
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition-all ${
                  task.status === "done"
                    ? "border-white/[0.02] bg-white/[0.01] opacity-50"
                    : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <div
                  onClick={() => toggleTask(task.id, task.status)}
                  className="flex flex-1 cursor-pointer items-center gap-3"
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all ${
                      task.status === "done"
                        ? "border-cyan-400 bg-cyan-400 text-black"
                        : "border-white/30 group-hover:border-white/50"
                    }`}
                  >
                    {task.status === "done" && <Check size={12} className="stroke-[3]" />}
                  </div>

                  <span
                    className={`text-sm text-white/80 transition-all line-clamp-1 ${
                      task.status === "done" ? "line-through text-white/30" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <form onSubmit={addTask} className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Add a startup milestone..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center justify-center rounded-xl bg-cyan-600 px-3 hover:bg-cyan-500 transition-all"
          >
            <Plus size={16} />
          </button>
        </form>
      </div>
    </WidgetCard>
  );
}
