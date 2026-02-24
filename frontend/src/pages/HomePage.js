import Footer from "../components/Footer";
import heroImage from "../media/lib3.webp";
import Cards from "../components/Cards";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO SECTION ── */}
      <section className="w-full h-[650px]  px-6 md:px-16 pt-12 pb-0 flex flex-col md:flex-row items-stretch gap-4 min-h-[650px]">

        {/* Left: Copy — off-white card like reference */}
        <div className="flex-1 rounded-2xl bg-[#f5f7fc] p-12 pl-14 gap-3 flex flex-col justify-center items-start min-h-[500px]">
          {/* Tag pill */}
          <span className="inline-block bg-grey-700 text-black text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 w-fit">
            Free Assessment
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1a1a1a] mb-5">
            Learn what matters, <br />
            <span className="italic font-arial">Grow without Limits</span>
          </h1>

          <p className="text-base  m-10 ml-0 mt-15 text-gray-500 leading-relaxed mb-8 max-w-md">
            Discover a curated selection of courses designed to match your goals
            and interests, helping you make informed decisions and maximize the
            value of your graduate education.
          </p>

          {/* Grey button — fixed */}
          <div className="flex items-center gap-4">
            <button
              className="bg-black rounded-full text-white px-6 py-3 font-medium hover:bg-gray-800 hover:text-white transition-colors"
            >
              Get Started — It's Free
            </button>
            <button
              className="text-sm text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
            >
              View Assessments →
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            No credit card required · Free plan available
          </p>
        </div>

        {/* Right: Image panel — tall, like reference */}
        <div className="flex-1 rounded-2xl overflow-hidden min-h-[420px] relative hidden md:block">

        <img
          src={heroImage}
          alt="Students learning"
          className="w-full h-full object-cover "
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.style.background =
              "linear-gradient(145deg, #c8d5d0, #8aacaa)";
          }}
        />
        

          {/* Subtle overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </section>

      <Cards />

          {/* ── TRUSTED BY ── */}
    <section className="bg-white py-16 px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a1a1a] mb-12">
          Trusted by <span className="text-[#071642]">10,000+ Learners</span> Across Nepal
        </h2>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: "👍",
              stat: "9 out of 10",
              desc: "Students said they found a clear career direction after completing our skill assessment.",
            },
            {
              icon: "🎯",
              stat: "85% of Users",
              desc: "Received a personalized learning roadmap that matched their actual strengths and interests.",
            },
            {
              icon: "🚀",
              stat: "3x Faster",
              desc: "Learners on our platform upskill 3x faster than self-studying without a structured path.",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center px-6">
              {/* Icon circle */}
              <div className="w-16 h-16 rounded-full bg-[#eef2f0] flex items-center justify-center text-2xl mb-5">
                {item.icon}
              </div>
              {/* Stat */}
              <p className="text-lg font-bold text-[#2d4a3e] mb-2">{item.stat}</p>
              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-center text-xs text-gray-300 mt-10">
          *Based on user surveys conducted among registered learners on the Know Your Potential platform.
        </p>

      </div>
    </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-white py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-[#2d4a3e] text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              Process
            </span>
            <h2 className="text-4xl font-bold text-[#0f1f18] mt-2 font-serif">
              How It Works
            </h2>
          </div>

          <div className="relative flex flex-col md:flex-row gap-8">
            <div className="hidden md:block absolute top-9 left-[15%] right-[15%] h-px bg-gray-200 z-0" />

            {[
              { num: "01", icon: "📊", title: "Take Assessment", desc: "Complete skill assessments that measure your aptitude across different domains.", highlight: false },
              { num: "02", icon: "🔍", title: "Get Your Roadmap", desc: "Receive a personalized learning path based on your unique strengths.", highlight: true },
              { num: "03", icon: "📚", title: "Start Learning", desc: "Follow curated courses designed to make you job-ready in your chosen field.", highlight: false },
            ].map((step) => (
              <div key={step.num} className="flex-1 flex flex-col items-center text-center relative z-10">
                <div
                  className={`w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl mb-5 shadow-md border-2 ${
                    step.highlight
                      ? "bg-[#2d4a3e] border-[#2d4a3e]"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase mb-1">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-[#0f1f18] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-8 bg-[#f5f6f3]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#2d4a3e] text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              Features
            </span>
            <h2 className="text-4xl font-bold text-[#0f1f18] mt-2 font-serif">
              Everything You Need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📊", title: "Skill Assessments", desc: "Measure your aptitude across different areas with carefully crafted tests." },
              { icon: "🎯", title: "Personalized Paths", desc: "Learning roadmaps tailored specifically to your strengths and goals." },
              { icon: "📈", title: "Progress Tracking", desc: "Monitor your journey with detailed analytics and milestone markers." },
              { icon: "💡", title: "Market Insights", desc: "Discover trending skills and real-time job market demand in your field." },
              { icon: "📚", title: "Curated Courses", desc: "Job-ready curriculum built and vetted by industry professionals." },
              { icon: "🚀", title: "Internships", desc: "Practical experience through curated opportunities. (Coming soon)" },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-base font-bold text-[#0f1f18] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section id="audience" className="bg-white py-20 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-[#2d4a3e] text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Who it's for
          </span>
          <h2 className="text-4xl font-bold text-[#0f1f18] mt-2 mb-12 font-serif">
            Perfect For
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            {[
              { emoji: "🎓", title: "+2 Graduates", desc: "Confused about which career path to take after school." },
              { emoji: "🔄", title: "Career Switchers", desc: "Ready for a change but unsure where your strengths fit." },
              { emoji: "📚", title: "Self-Learners", desc: "Want structure and direction in your self-study journey." },
              { emoji: "💼", title: "Job Seekers", desc: "Looking to upskill quickly and land your next opportunity." },
            ].map((a, i) => (
              <div key={i} className="flex gap-4 items-start bg-[#f5f6f3] rounded-2xl p-6">
                <span className="text-3xl flex-shrink-0">{a.emoji}</span>
                <div>
                  <p className="font-bold text-[#0f1f18] text-sm mb-1">{a.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#2d4a3e] py-20 px-8 text-center text-white">
        <h2 className="text-4xl font-bold font-serif mb-3">
          Ready to Discover Your Potential?
        </h2>
        <p className="text-[#a8c4b8] mb-10 text-base">
          Join thousands of learners who found their direction.
        </p>

        <div className="flex items-center bg-white/95 rounded-full shadow-md px-5 py-2 max-w-md mx-auto gap-3">
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] text-gray-400 font-medium tracking-wide">
              Your email address
            </span>
            <input
              type="email"
              placeholder="you@email.com"
              className="text-sm text-gray-800 outline-none border-none bg-transparent w-full"
            />
          </div>
          <Link
            to="/register"
            className="bg-[#1e3329] text-white text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap hover:bg-[#162820] transition-colors"
          >
            Start Journey 🚀
          </Link>
        </div>
      </section>
      
      <Footer />

    </div>
    
  );
}