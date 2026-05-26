import Navbar from "@/components/marketing/navbar";
import Link from "next/link";
import {
  Sparkles,
  BrainCircuit,
  FileText,
  Users,
  Zap,
  Shield,
  Globe,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Intelligence",
    description:
      "Advanced AI assistant that understands your workspace context, generates content, and helps you work faster.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: FileText,
    title: "Collaborative Documents",
    description:
      "Real-time collaborative editing with AI assistance, rich media support, and version control.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Users,
    title: "Team Workspaces",
    description:
      "Create unlimited workspaces for different teams, projects, or clients with granular permissions.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: BrainCircuit,
    title: "Knowledge Graph",
    description:
      "Automatically connects your documents, tasks, and ideas into an intelligent knowledge network.",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized for speed with GPU-accelerated animations and instant search across all your content.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption, SOC 2 compliant, with advanced access controls and audit logs.",
    gradient: "from-gray-500 to-slate-600",
  },
  {
    icon: Globe,
    title: "Global Collaboration",
    description:
      "Work with teams across the world with real-time sync, presence indicators, and live cursors.",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    icon: Layers,
    title: "Integrations",
    description:
      "Connect with your favorite tools like GitHub, Figma, Slack, and 50+ other integrations.",
    gradient: "from-purple-500 to-pink-600",
  },
];

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B14] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Powerful Features
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Everything you need for
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              modern teamwork
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60">
            AI-powered workspace with all the tools your team needs to collaborate
            effectively
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-2xl bg-white px-8 py-4 font-medium text-black transition hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 transition hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div
                    className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${feature.gradient} p-4`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm text-white/50">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-12 text-center backdrop-blur-3xl">
          <h2 className="text-4xl font-semibold text-white">
            Ready to transform your workflow?
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Join thousands of teams already using Nexus AI
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-2xl bg-white px-8 py-4 font-medium text-black transition hover:scale-105"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </main>
  );
}