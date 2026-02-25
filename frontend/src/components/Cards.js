// 071642
// f5f6f3
// f5f7fc
function Cards() {
    return (
        <div className=" flex flex-col items-center justify-center">
            {/* ── OUR SERVICES ── */}
            <section className=" h-[800px] bg-[#071642] w-[1700px] py-20 px-12 mt-15 m-5 p-5 border rounded-2xl">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-14">
                <h2 className="text-4xl text-white font-bold text-arial mb-3">Our Services</h2>
                <div className="w-16 h-1 bg-white mx-auto mb-5 rounded-full" />
                <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                    Discover a curated selection of services designed to match your goals
                    and interests, helping you make informed decisions about your career.
                </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                    { icon: "⭐", title: "Skill Assessment", desc: "Our assessment tools will identify your strengths and areas for growth.", color: "text-rose-400" },
                    { icon: "🌐", title: "Career Consulting", desc: "Our support team will guide you toward the right career path.", color: "text-blue-400" },
                    { icon: "🖼️", title: "Learning Paths", desc: "Structured roadmaps built to take you from beginner to job-ready.", color: "text-teal-400" },
                    { icon: "📈", title: "Market Analysis", desc: "Stay updated on trending skills and job market demand in your field.", color: "text-teal-400" },
                ].map((service, i) => (
                    <div
                    key={i}
                    className={`bg-white rounded-2xl p-10 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${
                        i === 0 ? "shadow-md" : ""
                    }`}
                    >
                    <span className={`text-4xl mb-6 ${service.color}`}>{service.icon}</span>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-[#1a1a1a] mb-3">
                        {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                        {service.desc}
                    </p>
                    </div>
                ))}
                </div>

            </div>
            </section>
        </div>
    );
}

export default Cards;