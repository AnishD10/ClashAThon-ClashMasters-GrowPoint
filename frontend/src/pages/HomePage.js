import Footer from "../components/Footer";
import heroImage from "../media/lib3.webp";
import Cards from "../components/Cards";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Who should use Know Your Potential?",
      a: "Anyone feeling uncertain about their career — fresh +2 graduates, self-learners, or career switchers. If you want a structured, personalized direction, this platform is built for you.",
    },
    {
      q: "Do I need prior experience to take the assessments?",
      a: "Not at all. Our assessments measure your natural aptitude and interests, not prior knowledge or technical skills. They are designed for everyone regardless of background.",
    },
    {
      q: "How does the personalized roadmap work?",
      a: "After your assessment, our system analyzes your strengths and matches them to in-demand career paths. You will get a step-by-step learning roadmap with curated courses tailored to your results.",
    },
    {
      q: "Is the platform free to use?",
      a: "Yes — sign up and take assessments completely free. Our free plan gives you assessment results and a basic roadmap. Premium features like detailed market insights are coming soon.",
    },
    {
      q: "How long does the assessment take?",
      a: "Most assessments take 10 to 20 minutes. Find a quiet spot and answer honestly for the most accurate results.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO SECTION ── */}
      <section className="w-full h-[650px] px-6 md:px-16 pt-12 pb-0 flex flex-col md:flex-row items-stretch gap-4 min-h-[650px]">
        <div className="flex-1 rounded-2xl bg-[#f5f7fc] p-12 pl-14 gap-3 flex flex-col justify-center items-start min-h-[500px]">
          <span className="inline-block bg-grey-700 text-black text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 w-fit">
            Free Assessment
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1a1a1a] mb-5">
            Learn what matters, <br />
            <span className="italic font-arial">Grow without Limits</span>
          </h1>
          <p className="text-base m-10 ml-0 mt-15 text-gray-500 leading-relaxed mb-8 max-w-md">
            Discover a curated selection of courses designed to match your goals
            and interests, helping you make informed decisions and maximize the
            value of your graduate education.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="bg-black rounded-full text-white px-6 py-3 font-medium hover:bg-gray-800 hover:text-white transition-colors"
            >
              Get Started — It's Free
            </Link>
            <Link
              to="/assessments"
              className="text-sm text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
            >
              View Assessments →
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            No credit card required · Free plan available
          </p>
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden min-h-[420px] relative hidden md:block">
          <img
            src={heroImage}
            alt="Students learning"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.background = "linear-gradient(145deg, #c8d5d0, #8aacaa)";
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </section>

      <Cards />

      {/* ── TRUSTED BY ── */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a1a1a] mb-12">
            Trusted by <span className="text-[#071642]">10,000+ Learners</span> Across Nepal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "👍", stat: "9 out of 10", desc: "Students said they found a clear career direction after completing our skill assessment." },
              { icon: "🎯", stat: "85% of Users", desc: "Received a personalized learning roadmap that matched their actual strengths and interests." },
              { icon: "🚀", stat: "3x Faster", desc: "Learners on our platform upskill 3x faster than self-studying without a structured path." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center px-6">
                <div className="w-16 h-16 rounded-full bg-[#eef2f0] flex items-center justify-center text-2xl mb-5">
                  {item.icon}
                </div>
                <p className="text-lg font-bold text-[#2d4a3e] mb-2">{item.stat}</p>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-300 mt-10">
            *Based on user surveys conducted among registered learners on the Know Your Potential platform.
          </p>
        </div>
      </section>

{/* ── HOW IT WORKS ── */}
<section className="relative py-20 px-6 md:px-16 overflow-hidden">

  {/* Split background — top half colored, bottom half white */}
  <div className="absolute inset-x-0 top-0 h-1/2 bg-[#eef0fb] z-0" />
  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white z-0" />

  <div className="relative z-10 max-w-6xl mx-auto">

    {/* Header */}
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3">
        How it works
      </h2>
      <p className="text-sm text-gray-500 max-w-md mx-auto">
        Know Your Potential helps you discover your strengths and build a clear path to your dream career.
      </p>
    </div>

    {/* 4 Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {[
        {
          num: "1",
          icon: "📝",
          title: "Sign up for free",
          desc: "Create your account in under 2 minutes. No credit card required.",
        },
        {
          num: "2",
          icon: "📊",
          title: "Take the assessment",
          desc: "Complete our skill and aptitude assessment designed to uncover your natural strengths.",
        },
        {
          num: "3",
          icon: "🗺️",
          title: "Get your roadmap",
          desc: "Receive a personalized learning path matched to your strengths and career goals.",
        },
        {
          num: "4",
          icon: "🚀",
          title: "Start learning",
          desc: "Follow curated courses and track your progress toward becoming job-ready.",
        },
      ].map((step, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center relative pt-10"
        >
          {/* Number circle — sits on top edge */}
          <div className="absolute -top-5 w-10 h-10 rounded-full bg-[#eef0fb] border-2 border-[#c7cbf5] flex items-center justify-center">
            <span className="text-sm font-bold text-[#4f5bd5]">{step.num}</span>
          </div>

          {/* Icon */}
          <div className="text-5xl mb-5 mt-2">{step.icon}</div>

          {/* Title */}
          <h3 className="text-sm font-bold text-[#1a1a1a] mb-3 leading-snug">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-400 leading-relaxed">
            {step.desc}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>

{/* ── WHO IT'S FOR ── */}
<section className="bg-white py-20 px-6 md:px-16">
  <div className="max-w-6xl mx-auto">

    {/* Header */}
    <div className="text-center mb-14">
      <span className="inline-block bg-[#2d4a3e] text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
        Who it's for
      </span>
      <h2 className="text-4xl font-bold text-[#0f1f18] mt-2 font-serif">
        Built For You
      </h2>
    </div>

    {/* 2x2 audience grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[
        {
          emoji: "🎓",
          title: "+2 Graduates",
          tag: "Most Popular",
          desc: "Just finished school and overwhelmed by career choices? We help you cut through the noise and find a path that actually fits you.",
          bg: "bg-[#f0f4f0]",
        },
        {
          emoji: "🔄",
          title: "Career Switchers",
          tag: "Career Change",
          desc: "Ready for something new but unsure where your existing skills transfer? We map your strengths to new opportunities.",
          bg: "bg-[#f5f3ef]",
        },
        {
          emoji: "📚",
          title: "Self-Learners",
          tag: "Structured Growth",
          desc: "Tired of random YouTube tutorials with no direction? Get a structured roadmap that takes you from beginner to job-ready.",
          bg: "bg-[#f5f3ef]",
        },
        {
          emoji: "💼",
          title: "Job Seekers",
          tag: "Upskilling",
          desc: "Looking to stand out in the job market? Identify the exact skills you need and follow a proven path to land your next role.",
          bg: "bg-[#f0f4f0]",
        },
      ].map((a, i) => (
        <div key={i} className={`${a.bg} rounded-2xl p-8 flex gap-5 items-start hover:shadow-md transition-shadow duration-200`}>
          <div className="text-4xl flex-shrink-0 mt-1">{a.emoji}</div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-base font-bold text-[#0f1f18]">{a.title}</h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2d4a3e] bg-white px-2.5 py-1 rounded-full border border-[#c8d8d0]">
                {a.tag}
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


{/* ── EXAMPLES ── */}
<section className="bg-[#f5f6f3] py-20 px-6 md:px-16">
  <div className="max-w-6xl mx-auto">

    {/* Header */}
    <div className="text-center mb-14">
      <span className="inline-block bg-[#2d4a3e] text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
        Examples
      </span>
      <h2 className="text-4xl font-bold text-[#0f1f18] mt-2 font-serif">
        What You'll Get
      </h2>
      <p className="text-sm text-gray-400 mt-3 max-w-md mx-auto">
        Here's a preview of the assessments and learning paths waiting for you.
      </p>
    </div>

    {/* Example cards grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          icon: "💻",
          category: "Tech",
          title: "Web Development Path",
          desc: "HTML → CSS → JavaScript → React. Go from zero to building real projects in 12 weeks.",
          steps: ["Aptitude Test", "Frontend Basics", "React Projects", "Job Ready"],
          color: "bg-blue-50 border-blue-100",
          tagColor: "bg-blue-100 text-blue-700",
        },
        {
          icon: "📊",
          category: "Business",
          title: "Digital Marketing Path",
          desc: "Master SEO, social media, and paid ads. One of the most in-demand skills in Nepal right now.",
          steps: ["Interest Quiz", "Marketing Basics", "Campaign Projects", "Internship"],
          color: "bg-[#f0f4f0] border-[#c8d8d0]",
          tagColor: "bg-[#dceee6] text-[#2d4a3e]",
        },
        {
          icon: "🎨",
          category: "Design",
          title: "UI/UX Design Path",
          desc: "Learn Figma, design principles, and user research. Build a portfolio that gets you hired.",
          steps: ["Creative Assessment", "Design Thinking", "Figma Projects", "Portfolio"],
          color: "bg-orange-50 border-orange-100",
          tagColor: "bg-orange-100 text-orange-700",
        },
      ].map((ex, i) => (
        <div key={i} className={`bg-white rounded-2xl overflow-hidden border ${ex.color} hover:-translate-y-1 hover:shadow-lg transition-all duration-200`}>

          {/* Card top color band */}
          <div className={`${ex.tagColor.split(" ")[0]} h-2 w-full`} />

          <div className="p-7">
            {/* Icon + category */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{ex.icon}</span>
              <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${ex.tagColor}`}>
                {ex.category}
              </span>
            </div>

            {/* Title + desc */}
            <h3 className="text-base font-bold text-[#0f1f18] mb-2">{ex.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">{ex.desc}</p>

            {/* Step pills */}
            <div className="flex flex-wrap gap-2">
              {ex.steps.map((step, j) => (
                <div key={j} className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#2d4a3e] text-white text-[9px] flex items-center justify-center font-bold flex-shrink-0">
                    {j + 1}
                  </span>
                  <span className="text-xs text-gray-500">{step}</span>
                  {j < ex.steps.length - 1 && (
                    <span className="text-gray-300 text-xs">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom CTA */}
    <div className="text-center mt-12">
      <p className="text-sm text-gray-400 mb-4">Not sure which path fits you?</p>
      <Link
        to="/assessments"
        className="inline-block bg-[#0f1f18] text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-[#2d4a3e] transition-colors"
      >
        Take the Free Assessment →
      </Link>
    </div>

  </div>
</section>

      {/* ── FAQ ── */}
      <section className="bg-[#f5f6f3] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">

          <div className="md:w-1/3 flex-shrink-0">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-6">
              Frequently<br />Asked<br />Questions
            </h2>
            <p className="text-sm text-gray-400 mb-1">Can't find what you're looking for?</p>
            <a
              href="mailto:support@knowyourpotential.com"
              className="text-sm font-semibold text-[#0f1f18] underline underline-offset-2 hover:text-[#2d4a3e] transition-colors"
            >
              We'd love to help you.
            </a>
          </div>

          <div className="flex-1">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200">
                <div
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex justify-between items-center py-5 cursor-pointer group"
                >
                  <span className="text-sm md:text-base font-medium text-[#1a1a1a] group-hover:text-[#2d4a3e] transition-colors pr-4">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 flex-shrink-0 rounded-full bg-[#1a1a1a] flex items-center justify-center transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </div>
                {openFaq === i && (
                  <div className="pb-5 pr-12">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-white px-6 md:px-16 py-10">
        <div
          className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative"
          style={{ background: "radial-gradient(ellipse at 70% 50%, #3b2f8f 0%, #0f0f2e 60%, #0a0a1e 100%)" }}
        >
          {/* Glowing orb */}
          <div
            className="absolute right-0 top-0 w-72 h-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #a78bfa, #818cf8)" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 px-8">

            {/* Tag */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-5 rounded bg-indigo-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-indigo-300 text-xs font-semibold uppercase tracking-widest">
                Career Guidance
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Realize your potential
            </h2>

            <p className="text-sm text-gray-400 mb-8 max-w-sm">
              Not sure where to start? Talk to us directly and we'll help you find the right path.
            </p>

            {/* Fixed: proper <a> tag with content and closing </a> */}
            <a
              href="tel:9822769769"
              className="bg-white text-[#0f0f2e] text-sm font-semibold px-7 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              📞 Call Us — 9822769769
            </a>

          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}