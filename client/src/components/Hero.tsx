import { Link } from "react-scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function Hero() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position to rotation values (reduced for better UX)
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Spring animations for smooth mouse following
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mouse movement for interactive background (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;

        setMousePosition({ x: e.clientX, y: e.clientY });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  useGSAP(() => {
    if (heroTextRef.current) {
      // Enhanced text animation - mobile-optimized
      const words = heroTextRef.current.querySelectorAll(".word");

      gsap.set(words, {
        opacity: 0,
        y: isMobile ? 50 : 100,
        rotationX: isMobile ? 0 : -90,
        transformOrigin: "50% 100%",
        scale: 0.8,
      });

      // Staggered word animation with bounce
      gsap.to(words, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: isMobile ? 1.2 : 1.5,
        stagger: isMobile ? 0.1 : 0.15,
        ease: isMobile ? "power2.out" : "elastic.out(1, 0.8)",
        delay: 0.8,
      });

      // Enhanced glow effect for IEEE PES
      gsap.to(".ieee-pes-text", {
        textShadow:
          "0 0 30px rgba(174, 219, 129, 0.8), 0 0 60px rgba(174, 219, 129, 0.4)",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3,
      });

      // Animate background circles on load
      gsap.fromTo(
        ".hero-circle",
        {
          scale: 0,
          rotation: isMobile ? 0 : -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: isMobile ? 1.5 : 2,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );

      // Floating animation for circles - reduced on mobile
      if (!isMobile) {
        gsap.to(".hero-circle", {
          y: "random(-20, 20)",
          rotation: "random(-5, 5)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
          delay: 2,
        });
      } else {
        // Simpler animation for mobile
        gsap.to(".hero-circle", {
          y: "random(-10, 10)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3,
          delay: 2,
        });
      }
    }
  }, [isMobile]);

  const handleJoinUsClick = () => {
    window.open("https://chat.whatsapp.com/J0g0LcJ1c6V0b53r6klv8F", "_blank");
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative min-h-screen w-full bg-dark-green overflow-hidden ${
        !isMobile ? "cursor-none" : ""
      }`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{
        perspective: 1000,
      }}
    >
      {/* Interactive Mouse Follower - Desktop Only */}
      {!isMobile && (
        <motion.div
          className="fixed w-4 h-4 bg-mindaro rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
          }}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.8 : 0.6,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        />
      )}

      {/* Enhanced Interactive Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          rotateX: !isMobile ? springRotateX : 0,
          rotateY: !isMobile ? springRotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="hero-circle absolute -top-16 -right-16 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] 
                     md:-top-24 md:-right-24 lg:-top-32 lg:-right-32 opacity-8 z-30"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="300"
              cy="300"
              r="280"
              stroke="currentColor"
              strokeWidth="2"
              className="text-office-green animate-pulse"
            />
            <circle
              cx="300"
              cy="300"
              r="240"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-mindaro"
            />
            <circle
              cx="300"
              cy="300"
              r="200"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-office-green animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <circle
              cx="300"
              cy="300"
              r="160"
              stroke="currentColor"
              strokeWidth="1"
              className="text-mindaro"
            />
            <circle
              cx="300"
              cy="300"
              r="120"
              stroke="currentColor"
              strokeWidth="1"
              className="text-office-green animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <circle
              cx="300"
              cy="300"
              r="80"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-mindaro"
            />
            <circle
              cx="300"
              cy="300"
              r="40"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-office-green animate-pulse"
              style={{ animationDelay: "3s" }}
            />
          </svg>

          {/* Middle row - Large ring on the left */}
          <svg
            className="hero-circle absolute top-1/2 -left-20 w-[350px] h-[350px] md:w-[525px] md:h-[525px] lg:w-[700px] lg:h-[700px] 
                     md:-left-30 lg:-left-40 opacity-10 transform -translate-y-1/2 z-30"
            viewBox="0 0 700 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="350"
              cy="350"
              r="320"
              stroke="currentColor"
              strokeWidth="2"
              className="text-mindaro animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <circle
              cx="350"
              cy="350"
              r="280"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-office-green"
            />
            <circle
              cx="350"
              cy="350"
              r="240"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-mindaro animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <circle
              cx="350"
              cy="350"
              r="200"
              stroke="currentColor"
              strokeWidth="1"
              className="text-office-green"
            />
            <circle
              cx="350"
              cy="350"
              r="160"
              stroke="currentColor"
              strokeWidth="1"
              className="text-mindaro animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
            <circle
              cx="350"
              cy="350"
              r="120"
              stroke="currentColor"
              strokeWidth="1"
              className="text-office-green"
            />
            <circle
              cx="350"
              cy="350"
              r="80"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-mindaro animate-pulse"
              style={{ animationDelay: "3.5s" }}
            />
            <circle
              cx="350"
              cy="350"
              r="40"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-office-green"
            />
          </svg>

          {/* Bottom row - Large ring on the right */}
          <svg
            className="hero-circle absolute -bottom-20 -right-12 w-[250px] h-[250px] md:w-[375px] md:h-[375px] lg:w-[500px] lg:h-[500px] 
                     md:-bottom-30 md:-right-18 lg:-bottom-40 lg:-right-24 opacity-12 z-30"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="250"
              cy="250"
              r="230"
              stroke="currentColor"
              strokeWidth="2"
              className="text-office-green animate-pulse"
              style={{ animationDelay: "4s" }}
            />
            <circle
              cx="250"
              cy="250"
              r="195"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-mindaro"
            />
            <circle
              cx="250"
              cy="250"
              r="160"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-office-green animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <circle
              cx="250"
              cy="250"
              r="125"
              stroke="currentColor"
              strokeWidth="1"
              className="text-mindaro"
            />
            <circle
              cx="250"
              cy="250"
              r="90"
              stroke="currentColor"
              strokeWidth="1"
              className="text-office-green animate-pulse"
              style={{ animationDelay: "2.5s" }}
            />
            <circle
              cx="250"
              cy="250"
              r="55"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-mindaro"
            />
            <circle
              cx="250"
              cy="250"
              r="25"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-office-green animate-pulse"
              style={{ animationDelay: "0.8s" }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Interactive Content Area */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl mx-auto pt-24 md:pt-0">
          <motion.div
            className="text-left lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              ref={heroTextRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
              whileHover={!isMobile ? { scale: 1.02 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="word inline-block mr-4">Powering</span>
              <span className="word inline-block mr-4">Tomorrow</span>
              <span className="word inline-block mr-4">with</span>
              <span className="word ieee-pes-text inline-block text-mindaro">
                IEEE {isMobile ? "POWER AND ENERGY SOCIETY" : "PES"}
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-baby-powder/90 max-w-3xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              IEEE PES SSN Student Chapter brings together minds passionate
              about Power & Energy. We organize technical seminars, impactful
              talks, awareness campaigns, and research-oriented webinars to
              empower students and connect them with industry leaders.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.button
                onClick={handleJoinUsClick}
                className="bg-mindaro hover:bg-mindaro/40 hover:text-white text-dark-green font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                whileHover={
                  !isMobile
                    ? {
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(174, 219, 129, 0.3)",
                        rotateX: -5,
                      }
                    : {}
                }
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                JOIN US
              </motion.button>

              <motion.div
                whileHover={
                  !isMobile
                    ? {
                        scale: 1,
                        boxShadow: "0 10px 25px rgba(116, 182, 83, 0.3)",
                        rotateX: -5,
                      }
                    : {}
                }
                whileTap={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  to="commitment"
                  smooth={true}
                  duration={800}
                  offset={-80}
                  className="border-2 border-office-green w-full text-office-green hover:bg-office-green hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 cursor-pointer inline-block text-center"
                >
                  LEARN MORE
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
