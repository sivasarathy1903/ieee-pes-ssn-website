export default function Commitment() {
  return (
    <div
      id="commitment"
      className="relative min-h-screen w-full bg-dark-green overflow-hidden py-8 sm:py-12 md:py-16 lg:py-24"
    >
      {/* Background Ring SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute top-1/4 -right-16 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] 
                     lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px] 
                     sm:-right-24 md:-right-32 lg:-right-48 xl:-right-64 opacity-6"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="400"
            cy="400"
            r="380"
            stroke="currentColor"
            strokeWidth="2"
            className="text-office-green animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx="400"
            cy="400"
            r="320"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-mindaro"
          />
          <circle
            cx="400"
            cy="400"
            r="260"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-office-green animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <circle
            cx="400"
            cy="400"
            r="200"
            stroke="currentColor"
            strokeWidth="1"
            className="text-mindaro"
          />
          <circle
            cx="400"
            cy="400"
            r="140"
            stroke="currentColor"
            strokeWidth="1"
            className="text-office-green animate-pulse"
            style={{ animationDelay: "3s" }}
          />
          <circle
            cx="400"
            cy="400"
            r="80"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-mindaro"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our <span className="text-mindaro">Commitment</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start lg:items-center">
          {/* Left Side - Cards */}
          <div className="space-y-6 sm:space-y-8">
            {/* Card 1 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-battleship-gray rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Knowledge Beyond Classrooms
                </h3>
                <p className="text-baby-powder/80 text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6">
                  Workshops on MATLAB, seminars on Electric Vehicles, and talks
                  on AI in Solar PV empower our students with practical,
                  cutting-edge skills.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-battleship-gray rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Empowering the Community
                </h3>
                <p className="text-baby-powder/80 text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6">
                  We conduct awareness events like Women's Day, Mental Health
                  Day, and community outreach to promote inclusivity and
                  well-being.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
            {/* Stat 1 */}
            <div className="text-center lg:text-right">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
                15<span className="text-mindaro">+</span>
              </div>
              <div className="h-1 bg-mindaro w-24 sm:w-32 md:w-40 mx-auto lg:ml-auto lg:mr-0 mb-2"></div>
              <div className="text-lg sm:text-xl md:text-2xl text-baby-powder/80">
                Events Conducted
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-center lg:text-right">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
                20<span className="text-mindaro">+</span>
              </div>
              <div className="h-1 bg-mindaro w-24 sm:w-32 md:w-40 mx-auto lg:ml-auto lg:mr-0 mb-2"></div>
              <div className="text-lg sm:text-xl md:text-2xl text-baby-powder/80">
                Student Members
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-center lg:text-right">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
                4
              </div>
              <div className="h-1 bg-mindaro w-24 sm:w-32 md:w-40 mx-auto lg:ml-auto lg:mr-0 mb-2"></div>
              <div className="text-lg sm:text-xl md:text-2xl text-baby-powder/80">
                Active Teams
              </div>
            </div>

            {/* Stat 4 */}
            <div className="text-center lg:text-right">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
                6
              </div>
              <div className="h-1 bg-mindaro w-24 sm:w-32 md:w-40 mx-auto lg:ml-auto lg:mr-0 mb-2"></div>
              <div className="text-lg sm:text-xl md:text-2xl text-baby-powder/80">
                Office Bearers
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
