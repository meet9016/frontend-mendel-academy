"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";

type DemoQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  description?: string;
  optionExplanations?: string[];
  active: boolean;
};

const emptyQuestion: DemoQuestion = {
  id: "",
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  description: "",
  optionExplanations: ["", "", "", ""],
  active: true,
};

export default function DemoQuestionsAdminPage() {
  const [items, setItems] = useState<DemoQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<DemoQuestion | null>(null);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const res = await api.get(endPointApi.listDemoQuestions as string);
      const list = res.data || [];
      setItems(list);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load demo questions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleEdit = (q?: DemoQuestion) => {
    if (q) {
      setEditing({
        ...q,
        options: q.options && q.options.length ? q.options : ["", "", "", ""],
        optionExplanations:
          q.optionExplanations && q.optionExplanations.length
            ? q.optionExplanations
            : ["", "", "", ""],
      });
    } else {
      setEditing({ ...emptyQuestion });
    }
  };

  const handleChangeField = (field: keyof DemoQuestion, value: any) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  const handleChangeOption = (index: number, value: string) => {
    if (!editing) return;
    const next = [...editing.options];
    next[index] = value;
    setEditing({ ...editing, options: next });
  };

  const handleChangeOptionExplanation = (index: number, value: string) => {
    if (!editing) return;
    const next = editing.optionExplanations
      ? [...editing.optionExplanations]
      : ["", "", "", ""];
    next[index] = value;
    setEditing({ ...editing, optionExplanations: next });
  };

  const handleSave = async () => {
    if (!editing) return;
    const payload = {
      question: editing.question,
      options: editing.options,
      correctAnswer: editing.correctAnswer,
      description: editing.description,
      optionExplanations: editing.optionExplanations,
      active: editing.active,
    };

    if (!payload.question.trim()) {
      toast.error("Question is required");
      return;
    }
    if (!payload.options.filter((o) => o && o.trim()).length) {
      toast.error("At least two options are required");
      return;
    }
    if (!payload.correctAnswer.trim()) {
      toast.error("Correct answer is required");
      return;
    }

    try {
      setSaving(true);
      if (editing.id) {
        await api.patch(
          `${endPointApi.updateDemoQuestion}/${editing.id}`,
          payload
        );
        toast.success("Demo question updated");
      } else {
        await api.post(endPointApi.createDemoQuestion as string, payload);
        toast.success("Demo question created");
      }
      setEditing(null);
      await loadQuestions();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to save demo question"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this demo question?")) return;
    try {
      await api.delete(`${endPointApi.deleteDemoQuestion}/${id}`);
      toast.success("Demo question deleted");
      await loadQuestions();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete demo question"
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Demo Questions (for Demo Version)
          </h1>
          <button
            type="button"
            onClick={() => handleEdit()}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
          >
            Add Demo Question
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-500">No demo questions added yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map((q, idx) => (
              <div
                key={q.id || (q as any)._id || idx}
                className="border rounded-md p-3 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      #{idx + 1}
                    </div>
                    <div
                      className="text-sm text-gray-900"
                      dangerouslySetInnerHTML={{ __html: q.question }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full border text-gray-600">
                      Correct: {q.correctAnswer}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleEdit(q)}
                      className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(q.id || (q as any)._id)}
                      className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {editing && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">
              {editing.id ? "Edit Demo Question" : "Add Demo Question"}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Question (HTML allowed)
                </label>
                <textarea
                  value={editing.question}
                  onChange={(e) => handleChangeField("question", e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {editing.options.map((opt, i) => (
                  <div key={i}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Option {String.fromCharCode(65 + i)}
                    </label>
                    <input
                      value={opt}
                      onChange={(e) =>
                        handleChangeOption(i, e.target.value)
                      }
                      className="w-full border rounded px-3 py-2 text-sm"
                    />
                    <label className="block text-[11px] font-medium text-gray-500 mt-1">
                      Explanation (optional)
                    </label>
                    <textarea
                      value={
                        editing.optionExplanations?.[i] || ""
                      }
                      onChange={(e) =>
                        handleChangeOptionExplanation(i, e.target.value)
                      }
                      className="w-full border rounded px-2 py-1 text-xs"
                      rows={2}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Correct Answer (must exactly match one option)
                  </label>
                  <input
                    value={editing.correctAnswer}
                    onChange={(e) =>
                      handleChangeField("correctAnswer", e.target.value)
                    }
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Active
                  </label>
                  <input
                    type="checkbox"
                    checked={editing.active}
                    onChange={(e) =>
                      handleChangeField("active", e.target.checked)
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  General Explanation (description)
                </label>
                <textarea
                  value={editing.description || ""}
                  onChange={(e) =>
                    handleChangeField("description", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2 text-sm"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 text-xs border rounded text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSave}
                  className="px-4 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

