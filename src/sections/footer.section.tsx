
import { LockKeyhole } from "lucide-react";

export default function FooterSection() {
  return (
    <footer
      className="
        border-t border-slate-200
        bg-[#F9FAFB] text-slate-500
        transition-colors duration-200
        dark:border-slate-800
        dark:bg-slate-950 dark:text-slate-400
      "
    >
      <div
        className="
          mx-auto flex w-full max-w-6xl
          flex-col items-center justify-between
          gap-4 px-4 py-6
          sm:flex-row sm:px-6
          lg:px-8
        "
      >
        <p className="text-xs text-center sm:text-left">
          © {new Date().getFullYear()} Workfolio.
          <span className="ml-1">All rights reserved.</span>
        </p>

        <a
          href="/login"
          aria-label="Admin login"
          className="
            inline-flex min-h-9 items-center gap-1.5
            rounded-md px-2 py-1
            text-xs text-slate-400
            transition-colors
            hover:text-slate-700
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-slate-400
            dark:text-slate-500 dark:hover:text-slate-200
          "
        >
          <LockKeyhole
            size={13}
            aria-hidden="true"
          />
          <span>Admin</span>
        </a>
      </div>
    </footer>
  );
}
