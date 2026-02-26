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
    <div className="min-h-screen bg-white" style={{ fontFamily: "Arial, sans-serif" }}>

      {/* ── HERO SECTION ── */}
      <section className="w-full px-4 sm:px-6 md:px-16 pt-6 sm:pt-10 pb-6 flex flex-col md:flex-row items-stretch gap-4">
        {/* Left: Copy */}
        <div className="flex-1 rounded-2xl bg-[#f5f7fc] p-6 sm:p-8 md:p-12 flex flex-col justify-center items-start gap-3">
          <span className="inline-block bg-gray-200 text-black text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
            Free Assessment
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#1a1a1a]">
            Learn what matters, <br />
            <span className="italic">Grow without Limits</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
            Discover a curated selection of courses designed to match your goals
            and interests, helping you make informed decisions and maximize the
            value of your graduate education.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link
              to="/register"
              className="bg-black rounded-full text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors text-center"
            >
              Get Started — It's Free
            </Link>
            <Link
              to="/assessments"
              className="text-sm text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors text-center sm:text-left"
            >
              View Assessments →
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            No credit card required · Free plan available
          </p>
        </div>

        {/* Right: Image — show on md+ */}
        <div className="hidden md:block flex-1 rounded-2xl overflow-hidden min-h-[420px] relative">
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

        {/* Mobile: show image below copy */}
        <div className="md:hidden w-full rounded-2xl overflow-hidden h-48 sm:h-64 relative">
          <img
            src={heroImage}
            alt="Students learning"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.background = "linear-gradient(145deg, #c8d5d0, #8aacaa)";
            }}
          />
        </div>
      </section>

      <Cards />

      {/* ── TRUSTED BY ── */}
      <section className="bg-white py-10 sm:py-14 md:py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#1a1a1a] mb-8 sm:mb-12">
            Trusted by <span className="text-[#071642]">10,000+ Learners</span> Across Nepal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: <i className="fa-solid fa-thumbs-up text-xl sm:text-2xl text-[#071642]"></i>,
                stat: "9 out of 10",
                desc: "Students said they found a clear career direction after completing our skill assessment.",
              },
              {
                icon: <i className="fa-solid fa-bullseye text-xl sm:text-2xl text-[#071642]"></i>,
                stat: "85% of Users",
                desc: "Received a personalized learning roadmap that matched their actual strengths and interests.",
              },
              {
                icon: <i className="fa-solid fa-rocket text-xl sm:text-2xl text-[#071642]"></i>,
                stat: "3x Faster",
                desc: "Learners on our platform upskill 3x faster than self-studying without a structured path.",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center px-4 py-4 sm:py-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#eef2f0] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <p className="text-base sm:text-lg font-bold text-[#071642] mb-2">{item.stat}</p>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-300 mt-8">
            *Based on user surveys conducted among registered learners on the Know Your Potential platform.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[#071642] z-0" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white z-0" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              How it works
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto px-2">
              Know Your Potential helps you discover your strengths and build a clear path to your dream career.
            </p>
          </div>

          {/* Mobile: vertical stack, tablet: 2-col, desktop: 4-col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {[
              {
                num: "1",
                icon: <i className="fa-solid fa-user-plus text-2xl sm:text-3xl text-[#071642]"></i>,
                title: "Sign up for free",
                desc: "Create your account in under 2 minutes. No credit card required.",
              },
              {
                num: "2",
                icon: <i className="fa-solid fa-clipboard-list text-2xl sm:text-3xl text-[#071642]"></i>,
                title: "Take the assessment",
                desc: "Complete our skill and aptitude assessment designed to uncover your natural strengths.",
              },
              {
                num: "3",
                icon: <i className="fa-solid fa-map text-2xl sm:text-3xl text-[#071642]"></i>,
                title: "Get your roadmap",
                desc: "Receive a personalized learning path matched to your strengths and career goals.",
              },
              {
                num: "4",
                icon: <i className="fa-solid fa-graduation-cap text-2xl sm:text-3xl text-[#071642]"></i>,
                title: "Start learning",
                desc: "Follow curated courses and track your progress toward becoming job-ready.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-5 sm:p-6 flex flex-col items-center text-center relative mt-6"
              >
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-[#eef0fb] border-2 border-[#071642] flex items-center justify-center">
                  <span className="text-sm font-bold text-[#071642]">{step.num}</span>
                </div>
                <div className="mb-4 mt-2">{step.icon}</div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-2 leading-snug">{step.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="bg-[#f5f7fc] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f1f18]">Built For You</h2>
            <div className="w-16 h-1 bg-[#071642] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: <i className="fa-solid fa-user-graduate text-lg sm:text-2xl text-[#071642]"></i>,
                title: "+2 Graduates",
                tag: "Most Popular",
                desc: "Just finished school and overwhelmed by career choices? We help you cut through the noise and find a path that actually fits you.",
              },
              {
                icon: <i className="fa-solid fa-arrows-rotate text-lg sm:text-2xl text-[#071642]"></i>,
                title: "Career Switchers",
                tag: "Career Change",
                desc: "Ready for something new but unsure where your existing skills transfer? We map your strengths to new opportunities.",
              },
              {
                icon: <i className="fa-solid fa-book-open text-lg sm:text-2xl text-[#071642]"></i>,
                title: "Self-Learners",
                tag: "Structured Growth",
                desc: "Tired of random YouTube tutorials with no direction? Get a structured roadmap that takes you from beginner to job-ready.",
              },
              {
                icon: <i className="fa-solid fa-briefcase text-lg sm:text-2xl text-[#071642]"></i>,
                title: "Job Seekers",
                tag: "Upskilling",
                desc: "Looking to stand out in the job market? Identify the exact skills you need and follow a proven path to land your next role.",
              },
            ].map((a, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 flex gap-4 items-start hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#eef2f0] flex items-center justify-center">
                  {a.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#0f1f18]">{a.title}</h3>
                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#071642] bg-[#eef2f0] px-2 py-0.5 rounded-full border border-[#c8d8d0]">
                      {a.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAMPLES ── */}
      <section className="bg-[#f5f6f3] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-14">
            <span className="inline-block bg-[#071642] text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              Examples
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f1f18] mt-2">
              What You'll Get
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-3 max-w-md mx-auto px-2">
              Here's a preview of the assessments and learning paths waiting for you.
            </p>
          </div>

          {/* Mobile: 1-col, tablet: 2-col, desktop: 3-col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: <i className="fa-solid fa-code text-xl sm:text-2xl text-[#071642]"></i>,
                category: "Tech",
                title: "Web Development Path",
                desc: "HTML → CSS → JavaScript → React. Go from zero to building real projects in 12 weeks.",
                steps: ["Aptitude Test", "Frontend Basics", "React Projects", "Job Ready"],
                bandColor: "bg-[#dbeafe]",
                tagColor: "bg-[#dbeafe] text-[#1d4ed8]",
              },
              {
                icon: <i className="fa-solid fa-chart-line text-xl sm:text-2xl text-[#071642]"></i>,
                category: "Business",
                title: "Digital Marketing Path",
                desc: "Master SEO, social media, and paid ads. One of the most in-demand skills in Nepal right now.",
                steps: ["Interest Quiz", "Marketing Basics", "Campaign Projects", "Internship"],
                bandColor: "bg-[#dceee6]",
                tagColor: "bg-[#dceee6] text-[#071642]",
              },
              {
                icon: <i className="fa-solid fa-pen-ruler text-xl sm:text-2xl text-[#071642]"></i>,
                category: "Design",
                title: "UI/UX Design Path",
                desc: "Learn Figma, design principles, and user research. Build a portfolio that gets you hired.",
                steps: ["Creative Assessment", "Design Thinking", "Figma Projects", "Portfolio"],
                bandColor: "bg-[#ffedd5]",
                tagColor: "bg-[#ffedd5] text-[#9a3412]",
              },
            ].map((ex, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <div className={`${ex.bandColor} h-2 w-full`} />
                <div className="p-5 sm:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#eef2f0] flex items-center justify-center flex-shrink-0">
                      {ex.icon}
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${ex.tagColor}`}>
                      {ex.category}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0f1f18] mb-2">{ex.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">{ex.desc}</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                    {ex.steps.map((step, j) => (
                      <div key={j} className="flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-[#071642] text-white text-[9px] flex items-center justify-center font-bold flex-shrink-0">
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

          <div className="text-center mt-10 sm:mt-12">
            <p className="text-sm text-gray-400 mb-4">Not sure which path fits you?</p>
            <Link
              to="/assessments"
              className="inline-block bg-[#071642] text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-[#0f2660] transition-colors"
            >
              Take the Free Assessment →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16">

          {/* Left */}
          <div className="md:w-1/3 flex-shrink-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight mb-4 md:mb-6">
              Frequently<br />Asked<br />Questions
            </h2>
            <p className="text-sm text-gray-400 mb-1">Can't find what you're looking for?</p>
            <a
              href="mailto:support@knowyourpotential.com"
              className="text-sm font-semibold text-[#071642] underline underline-offset-2 hover:text-[#0f2660] transition-colors"
            >
              We'd love to help you.
            </a>
          </div>

          {/* Right: accordion */}
          <div className="flex-1">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200">
                <div
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex justify-between items-center py-4 sm:py-5 cursor-pointer group"
                >
                  <span className="text-sm sm:text-base font-medium text-[#1a1a1a] group-hover:text-[#071642] transition-colors pr-3">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-full bg-[#071642] flex items-center justify-center transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </div>
                {openFaq === i && (
                  <div className="pb-4 sm:pb-5 pr-6 sm:pr-12">
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-white px-4 sm:px-6 md:px-16 py-8 sm:py-10">
        <div
          className="max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden relative"
          style={{ background: "radial-gradient(ellipse at 70% 50%, #3b2f8f 0%, #0f0f2e 60%, #0a0a1e 100%)" }}
        >
          <div
            className="absolute right-0 top-0 w-40 h-40 sm:w-72 sm:h-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #a78bfa, #818cf8)" }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-center py-12 sm:py-16 px-5 sm:px-8">
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <div className="w-5 h-5 rounded bg-indigo-500 flex items-center justify-center">
                <i className="fa-solid fa-shield-halved text-white text-xs"></i>
              </div>
              <span className="text-indigo-300 text-xs font-semibold uppercase tracking-widest">
                Career Guidance
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
              Realize your potential
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8 max-w-sm px-2">
              Not sure where to start? Talk to us directly and we'll help you find the right path.
            </p>
            <a
              href="tel:9822769769"
              className="bg-white text-[#0f0f2e] text-sm font-semibold px-6 sm:px-7 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              <i className="fa-solid fa-phone mr-2"></i> Call Us — 9822769769
            </a>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}