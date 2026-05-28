"use client";

import Link from "next/link";

export default function ContactFooter() {
  return (
    <footer className="border-t border-white/6 bg-[#050816] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold">AI Workspace (Demo)</h3>
            <p className="mt-3 text-sm text-white/60">
              Demo contact details and placeholder links for the marketing
              template. Replace with your real company information before
              publishing.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-white/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8.5v7a2 2 0 002 2h14a2 2 0 002-2v-7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10l4 3 4-3"
                />
              </svg>
              <span>hello@example.com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/60">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/showcase">Showcase</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/60">
                <li>
                  <a href="mailto:support@ai-workspace.example">Support</a>
                </li>
                <li>
                  <Link href="/docs">Docs</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/status">Status</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Headquarters</h4>
              <address className="mt-3 not-italic text-sm text-white/60">
                Example Company
                <br />
                456 Example Ave
                <br />
                Example City, EX 12345
                <br />
                United States
              </address>

              <div className="mt-4 text-sm text-white/60">
                <div>Phone: <a href="tel:+15550100000">+1 (555) 010-0000</a></div>
                <div>Business Hours: Mon–Fri, 09:00–17:00 ET</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/6 pt-6 text-sm text-white/50">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>© {new Date().getFullYear()} AI Workspace Inc. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/example" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://www.linkedin.com/company/example-company" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/example" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
