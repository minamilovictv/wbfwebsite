"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FormData {
  name: string;
  email: string;
  organisation: string;
  country: string;
  subject: string;
  message: string;
}

const subjects = [
  "General Inquiry",
  "Grant Application",
  "Partnership",
  "Media / Press",
  "Technical Support",
  "Other",
];

const countries = [
  "Albania",
  "Bosnia and Herzegovina",
  "Kosovo*",
  "North Macedonia",
  "Montenegro",
  "Serbia",
  "Other",
];

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    organisation: "",
    country: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", organisation: "", country: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16 bg-teal-50 rounded-lg border border-teal-200">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-teal-600" />
        </div>
        <h3 className="text-xl font-display font-bold text-teal-900 mb-2">Message Sent</h3>
        <p className="text-teal-700 text-sm">
          Thank you for reaching out. We'll respond within 2–3 business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-teal-600 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="label">Full Name *</label>
          <input
            id="name"
            type="text"
            required
            className="input"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="label">Email Address *</label>
          <input
            id="email"
            type="email"
            required
            className="input"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="organisation" className="label">Organisation</label>
          <input
            id="organisation"
            type="text"
            className="input"
            placeholder="Your organisation"
            value={form.organisation}
            onChange={(e) => setForm({ ...form, organisation: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="country" className="label">Country</label>
          <select
            id="country"
            className="input"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="label">Subject *</label>
        <select
          id="subject"
          required
          className="input"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        >
          <option value="">Select subject</option>
          {subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="label">Message *</label>
        <textarea
          id="message"
          required
          rows={6}
          className="input resize-none"
          placeholder="How can we help you?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">* Required fields</p>
        <Button
          type="submit"
          loading={status === "loading"}
          rightIcon={Send}
        >
          Send Message
        </Button>
      </div>
    </form>
  );
}
