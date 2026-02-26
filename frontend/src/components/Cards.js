function Cards() {
    return (
        <div className="w-full px-4 sm:px-6 md:px-16 py-8 sm:py-10">
            {/* ── OUR SERVICES ── */}
            <section className="w-full bg-[#071642] py-12 sm:py-16 md:py-20 px-6 sm:px-10 md:px-16 rounded-2xl">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-10 sm:mb-14">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-3">
                            Our Services
                        </h2>
                        <div className="w-16 h-1 bg-white mx-auto mb-4 rounded-full" />
                        <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed px-2">
                            Discover a curated selection of services designed to match your goals
                            and interests, helping you make informed decisions about your career.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {[
                            {
                                icon: <i className="fa-regular fa-star text-2xl sm:text-3xl text-[#071642]"></i>,
                                title: "Skill Assessment",
                                desc: "Our assessment tools will identify your strengths and areas for growth.",
                            },
                            {
                                icon: <i className="fa-solid fa-globe text-2xl sm:text-3xl text-[#071642]"></i>,
                                title: "Career Consulting",
                                desc: "Our support team will guide you toward the right career path.",
                            },
                            {
                                icon: <i className="fa-solid fa-book text-2xl sm:text-3xl text-[#071642]"></i>,
                                title: "Learning Paths",
                                desc: "Structured roadmaps built to take you from beginner to job-ready.",
                            },
                            {
                                icon: <i className="fa-solid fa-arrow-trend-up text-2xl sm:text-3xl text-[#071642]"></i>,
                                title: "Market Analysis",
                                desc: "Stay updated on trending skills and job market demand in your field.",
                            },
                        ].map((service, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                            >
                                <div className="mb-4 sm:mb-6">{service.icon}</div>
                                <h3 className="text-xs font-bold tracking-widest uppercase text-[#071642] mb-2 sm:mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs">
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