"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-[22px] border border-stroke bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-[34px] backdrop-blur-md"
    >
      <h3 className="text-[21px] font-semibold">Send a message</h3>
      <div className="grid gap-1.5">
        <label htmlFor="cf-name" className="font-mono text-xs uppercase tracking-[0.1em] text-text-3">
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="rounded-xl border border-stroke bg-black/30 p-[13px_16px] text-[15px] text-text outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]"
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="cf-email" className="font-mono text-xs uppercase tracking-[0.1em] text-text-3">
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="rounded-xl border border-stroke bg-black/30 p-[13px_16px] text-[15px] text-text outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]"
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="cf-msg" className="font-mono text-xs uppercase tracking-[0.1em] text-text-3">
          Message
        </label>
        <textarea
          id="cf-msg"
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project…"
          className="resize-y rounded-xl border border-stroke bg-black/30 p-[13px_16px] text-[15px] text-text outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 text-[15.5px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
      >
        Send message →
      </button>
      <div className="font-mono text-xs text-text-3">Opens your email app with the message pre-filled.</div>
      {sent && (
        <div className="text-[14.5px] text-emerald-400">
          ✓ Draft opened in your email app — just hit send.
        </div>
      )}
    </form>
  );
}
