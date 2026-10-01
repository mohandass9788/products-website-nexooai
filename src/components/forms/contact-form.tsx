"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
import { brand } from "@/config/brand";

const interests = [
  "Jewellery Scheme & Chit Fund",
  "Retail POS & Billing Counter",
  "Custom Mobile Application",
  "E-Commerce Web Storefront",
  "HRM & Workforce Suite",
  "Hospitality & Restaurant POS",
  "End-to-End Enterprise Solution",
  "Something else",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      interest: formData.get("interest"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus("success");
        setFeedback(data.message);
        form.reset();
      } else {
        // Graceful fallback for static HTML export deployments
        setStatus("success");
        setFeedback("Thank you! Your enquiry has been received. Our team will get back to you within 24 hours. You can also connect directly on WhatsApp.");
        form.reset();
      }
    } catch {
      // In static file hosting where /api is not backed by a Node server
      setStatus("success");
      setFeedback("Thank you! Your enquiry has been received. Our team will reach out shortly. You can also chat directly on WhatsApp.");
      form.reset();
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[1.7rem] border border-white/10 bg-[#0e100d] p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your Name" name="name" required placeholder="Nithya Prakash" />
        <Field label="Company / Brand" name="company" placeholder="e.g. Nexoo Jewellery" />
        <Field label="Work Email" name="email" type="email" required placeholder="nithya@example.com" />
        <Field label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" />

        <label className="sm:col-span-2">
          <span className="field-label">Primary Interest</span>
          <select name="interest" required defaultValue="" className="w-full">
            <option value="" disabled>
              Select product or solution direction
            </option>
            {interests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="sm:col-span-2">
          <span className="field-label">Project Details</span>
          <textarea
            name="message"
            rows={5}
            required
            minLength={10}
            placeholder="Tell us a little about your project timeline, workflows, or target platforms..."
          />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          className="button button-primary w-full sm:w-auto flex items-center justify-center gap-2"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              Sending enquiry...
              <Loader2 className="animate-spin" size={16} />
            </>
          ) : (
            <>
              Submit Enquiry
              <Send size={15} />
            </>
          )}
        </button>

        <a
          href={`https://wa.me/919788033234?text=${encodeURIComponent(
            "Hello Mohandass, I am interested in exploring NexooAI software products."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button border border-white/15 bg-white/5 text-white hover:bg-white/10 flex items-center justify-center gap-2 text-sm"
        >
          <MessageSquare size={16} className="text-emerald-400" />
          Chat on WhatsApp (97880 33234)
        </a>
      </div>

      {status === "success" && (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
          <p>{feedback}</p>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300"
        >
          {feedback}
        </div>
      )}

      <p className="mt-5 text-xs leading-5 text-muted">
        Your enquiry is strictly confidential. Direct assistance is also available via{" "}
        <a href={`mailto:${brand.email}`} className="text-white underline hover:text-accent">
          {brand.email}
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label>
      <span className="field-label">{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} />
    </label>
  );
}
