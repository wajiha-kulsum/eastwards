"use client";

import { useState } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { contact } from "@/lib/content";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  return (
    <div className="rounded-[30px] border border-[#EEEEEE] bg-[#F9F9FB] p-7 sm:p-9 lg:p-10 shadow-sm">
      {status === "success" ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-6 text-[20px] font-semibold text-neutral-900">
            Message Sent Successfully
          </h3>
          <p className="mt-2 max-w-sm text-[14px] text-neutral-600">
            Thank you for reaching out. A member of our leadership or technical team will be in touch within one business day.
          </p>
          <button
            type="button"
            onClick={() => {
              setFormData({ firstName: "", lastName: "", email: "", company: "", message: "" });
              setStatus("idle");
            }}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-[14px] font-semibold text-neutral-800"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-2 w-full rounded-[14px] bg-[#EFEFF1] px-4 py-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-[14px] font-semibold text-neutral-800"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-2 w-full rounded-[14px] bg-[#EFEFF1] px-4 py-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Email & Company */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="block text-[14px] font-semibold text-neutral-800"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="yourmail@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 w-full rounded-[14px] bg-[#EFEFF1] px-4 py-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-[14px] font-semibold text-neutral-800"
              >
                Company
              </label>
              <input
                id="company"
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="mt-2 w-full rounded-[14px] bg-[#EFEFF1] px-4 py-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-[15px] font-semibold text-neutral-800"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              placeholder="Your Message Here"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="mt-2 w-full resize-y rounded-[14px] bg-[#EFEFF1] px-4 py-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
            />
          </div>

          {/* Submit button on bottom right */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#333338] px-8 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-neutral-900 hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
            >
              {status === "submitting" ? (
                "Sending..."
              ) : (
                <>
                  {contact.form.submitText}
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
