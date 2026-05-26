import Navbar from "@/components/marketing/navbar";
import Link from "next/link";
import { Mail } from "lucide-react";

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    image: "https://images.pexels.com/photos/7749090/pexels-photo-7749090.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Former Google AI researcher",
  },
  {
    name: "Alex Rivera",
    role: "CTO & Co-founder",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Ex-Meta engineering lead",
  },
  {
    name: "Jordan Kim",
    role: "Head of Product",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Product at Notion & Figma",
  },
  {
    name: "Taylor Brooks",
    role: "Head of AI",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "OpenAI & Anthropic alum",
  },
];

const stats = [
  { value: "10K+", label: "Teams worldwide" },
  { value: "500M+", label: "AI messages processed" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50+", label: "Countries" },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B14] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Our Mission</p>
          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Empowering teams with
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              intelligent collaboration
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60">
            We're building the future of work where AI and humans collaborate seamlessly
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-white">{stat.value}</div>
                <div className="mt-2 text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold text-white">Our Story</h2>
          <div className="mt-6 space-y-4 text-white/70">
            <p>
              Founded in 2023, Nexus AI started with a simple observation: teams were
              spending too much time switching between tools and manually coordinating
              work. We believed AI could change that.
            </p>
            <p>
              Our team of AI researchers, engineers, and designers from Google, Meta,
              OpenAI, and Anthropic came together to build something fundamentally
              different: a workspace where AI isn't just a feature, but a true
              collaborator.
            </p>
            <p>
              Today, Nexus AI powers collaboration for over 10,000 teams worldwide,
              helping them work smarter, create faster, and achieve more together.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-semibold text-white">
            Meet the Team
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="group rounded-[32px] border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-3xl transition hover:border-white/20"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto h-24 w-24 rounded-2xl object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-cyan-400">{member.role}</p>
                <p className="mt-2 text-xs text-white/50">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-12 backdrop-blur-3xl">
          <h2 className="text-center text-3xl font-semibold text-white">Get in Touch</h2>
          <p className="mt-4 text-center text-white/60">
            Have questions? We'd love to hear from you.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <a
              href="mailto:hello@nexusai.com"
              className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10"
            >
              <Mail size={20} className="text-cyan-400" />
              <span className="text-white">hello@nexusai.com</span>
            </a>

            <a
              href="https://linkedin.com/company/nexusai"
              className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10"
            >
              <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-white">LinkedIn</span>
            </a>

            <a
              href="https://twitter.com/nexusai"
              className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10"
            >
              <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-white">Twitter</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}