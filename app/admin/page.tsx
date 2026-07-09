"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import type { Message } from "@/lib/db/schema";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchMessages() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/messages");
      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await response.json();
      setMessages(data.messages ?? []);
      setAuthenticated(true);
    } catch {
      setError("Could not load messages.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Wrong password.");
      return;
    }

    setPassword("");
    await fetchMessages();
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthenticated(false);
    setMessages([]);
  }

  async function handleDelete(message: Message) {
    const confirmed = window.confirm(
      `Delete message from "${message.authorName}"?\n\nThis cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingId(message.id);
    setError("");

    try {
      const response = await fetch(`/api/admin/messages/${message.id}`, {
        method: "DELETE",
      });

      if (response.status === 401) {
        setAuthenticated(false);
        setMessages([]);
        return;
      }

      if (!response.ok) {
        setError("Could not delete message.");
        return;
      }

      setMessages((current) => current.filter((item) => item.id !== message.id));
    } catch {
      setError("Could not delete message.");
    } finally {
      setDeletingId(null);
    }
  }

  if (authenticated === null || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Loading...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <h1 className="mb-2 text-xl font-bold text-slate-800">Admin Login</h1>
          <p className="mb-6 text-sm text-slate-500">
            View all wishes sent for Younes
          </p>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-sky-500 py-3 font-semibold text-white hover:bg-sky-600"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Messages Dashboard
            </h1>
            <p className="text-slate-500">{messages.length} total messages</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Log out
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {messages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
            No messages yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Message</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr
                      key={message.id}
                      className="border-b border-slate-50 align-top last:border-0"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(message.createdAt))}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {message.authorName}
                      </td>
                      <td className="px-4 py-3 text-slate-700">{message.body}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleDelete(message)}
                          disabled={deletingId === message.id}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {deletingId === message.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
