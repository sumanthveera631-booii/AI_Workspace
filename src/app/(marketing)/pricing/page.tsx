import Navbar from "@/components/marketing/navbar";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for individuals and small teams getting started",
    features: [
      "Up to 3 workspaces",
      "100 AI messages/month",
      "5 documents per workspace",
      "Basic collaboration features",
      "Community support",
    ],
    buttonText: "Get Started",
    gradient: "from-white/10 to-white/5",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For growing teams that need more power and features",
    features: [
      "Unlimited workspaces",
      "Unlimited AI messages",
      "Unlimited documents",
      "Advanced AI models (GPT-4, Claude 3)",
      "Priority support",
      "Custom integrations",
      "Team analytics",
    ],
    buttonText: "Start Free Trial",
    gradient: "from-cyan-500/20 to-blue-600/20",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with advanced needs",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Advanced security controls",
      "Custom AI model training",
      "Dedicated support manager",
      "SLA guarantee",
      "On-premise deployment",
    ],
    buttonText: "Contact Sales",
    gradient: "from-white/10 to-white/5",
  },
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B14] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Simple Pricing
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Choose the plan that
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              fits your needs
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60">
            Start free, upgrade when you need more power
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-[32px] border ${
                  plan.featured
                    ? "border-cyan-500/40"
                    : "border-white/10"
                } bg-gradient-to-br ${plan.gradient} p-8 backdrop-blur-3xl`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-cyan-500 px-4 py-1 text-xs font-semibold text-black">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60">{plan.period}</span>
                  </div>
                  <p className="mt-4 text-sm text-white/60">{plan.description}</p>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className="mt-0.5 shrink-0 text-cyan-400" />
                      <span className="text-sm text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === "Enterprise" ? "/about#contact" : "/signup"}
                  className={`block w-full rounded-2xl py-3 text-center font-medium transition hover:scale-[1.02] ${
                    plan.featured
                      ? "bg-cyan-500 text-black hover:bg-cyan-400"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-semibold">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is there a free trial for Pro?",
                a: "Yes, we offer a 14-day free trial for Pro plans. No credit card required.",
              },
              {
                q: "What AI models are included?",
                a: "Free plans include GPT-3.5. Pro plans include GPT-4, Claude 3 Sonnet, and Opus.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 30-day money-back guarantee for all paid plans.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm text-white/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}