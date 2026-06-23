import { useState, ChangeEvent, FormEvent } from "react";
import GooeyLinks from "@/components/GooeyLinks"; 

export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form submitted!");
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between pt-28 pb-0 px-4 relative overflow-hidden"
      style={{ backgroundColor: "#102512" }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-[#e6f86d] via-white to-[#e6f86d] text-transparent bg-clip-text animate-glow-text">
          Contact us for more details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl border-2 border-[#e6f86d] rounded-xl p-8 shadow-xl text-white bg-[#102512] space-y-6 animate-fade-in-up"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#e6f86d]">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="rounded-lg p-3 bg-[#1a2e1a] text-white border border-[#e6f86d] focus:outline-none focus:ring-2 focus:ring-[#e6f86d]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#e6f86d]">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="rounded-lg p-3 bg-[#1a2e1a] text-white border border-[#e6f86d] focus:outline-none focus:ring-2 focus:ring-[#e6f86d]"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-[#e6f86d]">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter your description"
              className="rounded-lg p-3 h-32 bg-[#1a2e1a] text-white border border-[#e6f86d] focus:outline-none focus:ring-2 focus:ring-[#e6f86d]"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#e6f86d] text-[#203E2E] font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="h-1 w-24 bg-[#e6f86d] mt-16 mb-6 rounded-full opacity-70"></div>

        {/* Gooey Links */}
        <div className="w-full">
          <GooeyLinks />
        </div>
      </div>

      {/* Animations & Styles */}
      <style>{`
        @keyframes glowText {
          0%, 100% { text-shadow: 0 0 4px #e6f86d, 0 0 8px #e6f86d; }
          50% { text-shadow: 0 0 6px #e6f86d, 0 0 10px #e6f86d; }
        }

        .animate-glow-text {
          animation: glowText 3s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}