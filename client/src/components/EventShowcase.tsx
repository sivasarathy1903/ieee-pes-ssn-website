import { useState } from "react";

// Import all event images
import event1 from "../assets/images/1.png";
import event2 from "../assets/images/2.png";
import event3 from "../assets/images/3.png";
import event4 from "../assets/images/4.png";
import event5 from "../assets/images/5.png";

export default function EventShowcase() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const eventImages = [event1, event2, event3, event4, event5];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % eventImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + eventImages.length) % eventImages.length
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-white py-8 sm:py-12 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-otext-office-green rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6">
            Our <span className="text-office-green">Events</span>
          </h2>
          <div className="w-24 h-1 bg-otext-office-green mx-auto mb-4"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Explore our exciting events and initiatives that empower students in
            power and energy engineering.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Side - Static Description */}
          <div className="w-full space-y-6 lg:space-y-8">
            <div className="bg-green-50 rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                Empowering the Next Generation of Engineers
              </h3>

              <div className="space-y-4 lg:space-y-6 text-gray-700">
                <p className="text-base sm:text-lg leading-relaxed">
                  The IEEE Power and Energy Society Student Branch Chapter at
                  SSN College of Engineering is dedicated to advancing the field
                  of power and energy engineering through innovative programs,
                  technical workshops, and industry collaborations.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  Our events range from hands-on technical workshops and
                  seminars to networking sessions with industry professionals.
                  We organize hackathons focused on renewable energy solutions,
                  electric vehicle technology symposiums, and community outreach
                  programs that promote sustainable energy practices.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  Through these initiatives, we aim to bridge the gap between
                  academic knowledge and industry requirements, providing our
                  members with practical experience and professional development
                  opportunities that prepare them for successful careers in the
                  power and energy sector.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Image Showcase */}
          <div className="w-full">
            <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-lg max-w-full">
              {/* Main Image Display */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 sm:mb-6">
                <img
                  src={eventImages[currentImageIndex]}
                  alt={`Event ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 invisible lg:visible  top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white text-battleship-gray p-2 sm:p-3 rounded-full transition-all duration-200 shadow-lg border"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 invisible lg:visible transform -translate-y-1/2 bg-white/60 hover:bg-white text-battleship-gray p-2 sm:p-3 rounded-full transition-all duration-200 shadow-lg border"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 sm:gap-3 justify-center overflow-x-auto pb-2">
                {eventImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 ${
                      index === currentImageIndex
                        ? "ring-2 ring-otext-office-green ring-offset-2 ring-offset-white scale-110"
                        : "opacity-60 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Event ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Image Counter */}
            <div className="flex justify-center mt-4">
              <div className="bg-dark-green text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm shadow-sm">
                {currentImageIndex + 1} of {eventImages.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
