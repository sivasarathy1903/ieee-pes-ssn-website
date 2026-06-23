import { useState } from "react";
import GooeyLinks from "@/components/GooeyLinks";

interface TeamMember {
  name: string;
  role: string;
  yearDept?: string;
  image?: string;
}

interface Member {
  role: string;
  name: string;
  image: string;
  linkedin: string | null;
  academicYear?: string;
  yearDept?: string;
}

interface SelectedMember {
  name: string;
  image: string;
  linkedin: string | null;
  academicYear?: string;
  yearDept?: string;
}

export default function Team() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<SelectedMember | null>(
    null
  );

  const teams: Record<string, string[]> = {
    "EXECUTIVE BOARD": [
      "Yashasvee - Joint Secretary - 3rd yr EEE",
      "Jayasurya S - General Secretary - 3rd yr EEE",
    ],
    "PR TEAM": [
      "Karthikeyan U - Head - 3rd yr EEE",
      "Bogoju Ganesh Priya Vardhan - Head - 3rd yr Mech",
      "Avanthika V - Member - 3rd yr M.Tech CSE",
      "Preethi N - Member - 2nd yr EEE",
      "Sakthimurugan K - Member - 2nd yr EEE",
      "Neha Sundar - Member - 2nd yr ECE",
    ],
    "DESIGN TEAM": [
      "Samyuktha Sriram - Head - 3rd yr CSE",
      "Haripriya V H - Member - 3rd yr ECE",
      "Bhuvaneshram MR - Member - 3rd yr EEE",
      "Bhavani Sadasivan - Member - 2nd yr CSE",
      "Chelnath - Member - 2nd yr ECE",
      "Adithya - Member - 2nd yr ECE",
    ],
    "EVENT MGMT": [
      "Avinash R - Head - 3rd yr EEE",
      "Meghanayana Karlapudi - Head - 3rd yr EEE",
      "Janani Venkatesan - Member - 3rd yr EEE",
      "W Merly Christy - Member - 3rd yr EEE",
      "Bhavana N - Member - 2nd yr EEE",
      "Swetha S V - Member - 2nd yr EEE",
      "Aamrrish G R - Member - 2nd yr EEE",
    ],
    "WEB MASTER TEAM": [
      "Sivasarathy A - Head - 3rd yr CSE",
      "Nithilan S - Member - 3rd yr IT",
      "Shweta Mary John - Member - 2nd yr IT",
    ],
  };

  const facultyIncharge: Member = {
    role: "FACULTY INCHARGE",
    name: "Thiyagarajan",
    image: "/team/Thiyagarajan.jpeg",
    linkedin: null,
  };

  const coreExecutives: TeamMember[] = [
    {
      role: "CHAIRPERSON",
      name: "Akshaya VV",
      yearDept: "4th yr EEE",
      image: "/team/akshaya-vv.jpg",
    },
    {
      role: "VICE CHAIRPERSON",
      name: "Felicia Jenny FJ",
      yearDept: "4th yr EEE",
      image: "/team/felicia-jenny-fj.jpg",
    },
    {
      role: "TREASURER",
      name: "Anbuselvam B",
      yearDept: "4th yr ECE",
      image: "/team/anbuselvam-b.jpg",
    },
    {
      role: "SECRETARY",
      name: "Harinath Vaitheeswar S",
      yearDept: "3rd yr EEE",
      image: "/team/harinath-vaitheeswar-s.jpg",
    },
  ];

  const pastChairpersons: Member[] = [
    {
      role: "CHAIR PERSON",
      name: "Sai Krishna Karthik",
      image: "/team/Sai Krishna Karthik.jpeg",
      linkedin: null,
      academicYear: "2023-2024",
    },
    {
      role: "CHAIR PERSON",
      name: "Smithaa M",
      image: "/team/Smithaa.jpg",
      linkedin: null,
      academicYear: "2024-2025",
    },
    {
      role: "CHAIR PERSON",
      name: "Rithvikha V",
      image: "/team/Rithvikha.jpeg",
      linkedin: "https://www.linkedin.com/in/rithvikha-v-b7946824a/",
      academicYear: "2025-2026",
    },
  ];

  const toggleTeam = (team: string) => setSelectedTeam(team);
  const allTeamBoxNames = Object.keys(teams);

  return (
    <div className="flex flex-col min-h-screen bg-[#102512] relative">
      <main className="flex-grow pt-28 px-4 font-sans relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-2 text-[#e6f86d] drop-shadow-[0_0_15px_rgba(230,248,109,0.8)] hover:drop-shadow-[0_0_40px_rgba(230,248,109,1)] transition-all duration-300 relative z-10 cursor-pointer">
          OUR TEAM
        </h1>
        <h2 className="text-3xl font-bold text-[#e6f86d] text-center mb-4 drop-shadow-[0_0_10px_rgba(230,248,109,0.5)] hover:drop-shadow-[0_0_20px_rgba(230,248,109,0.8)] transition-all duration-300 relative z-10">
          "WIRED FOR SUCCESS"
        </h2>
        <div className="flex flex-col items-center w-full px-4 md:px-20 lg:px-40 space-y-10 pb-16 animate-fade-in-up">
          {/* CORE EXECUTIVES Section */}
          <div
            className="bg-[#e6f86d] text-[#203E2E] rounded-2xl p-8 sm:p-10 w-full max-w-[600px]
             text-center shadow-[0_0_40px_rgba(230,248,109,0.3)] border-4 border-white animate-glow z-10 transition-all duration-300 hover:scale-[1.01] overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#e6f86d]/40 to-transparent opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <h3 className="text-2xl font-extrabold mb-6 text-[#203E2E] drop-shadow-md relative">
              IEEE PES Executive Committee 2026–2027
            </h3>
            <div
              className="mb-8 flex justify-center w-full"
              onClick={() =>
                setSelectedMember({
                  name: facultyIncharge.name,
                  image: facultyIncharge.image,
                  linkedin: null,
                })
              }
            >
              <div className="cursor-pointer hover:scale-105 transition-transform duration-300 relative group">
                <img
                  src={facultyIncharge.image}
                  alt={facultyIncharge.name}
                  className="rounded-full w-52 h-52 mx-auto mb-3 object-cover border-4 border-[#203E2E] shadow-lg group-hover:shadow-[0_0_20px_rgba(230,248,109,0.8)] group-hover:rotate-3 transition-all duration-500"
                  onError={(event) => {
                    event.currentTarget.src = "/team/default.jpg";
                  }}
                />
                <p className="text-base font-semibold text-[#203E2E] drop-shadow-md">
                  {facultyIncharge.role}
                </p>
                <p className="text-lg font-bold text-[#203E2E] drop-shadow-lg">
                  {facultyIncharge.name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {coreExecutives.map((member, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setSelectedMember({
                      name: member.name,
                      image: member.image || "/team/default.jpg",
                      linkedin: null,
                      yearDept: member.yearDept,
                    })
                  }
                  className="cursor-pointer hover:scale-105 transition-transform duration-300 relative group"
                >
                  <img
                    src={member.image || "/team/default.jpg"}
                    alt={member.name}
                    className="rounded-full w-52 h-52 mx-auto mb-3 object-cover border-4 border-[#203E2E] shadow-lg group-hover:shadow-[0_0_20px_rgba(230,248,109,0.8)] group-hover:rotate-3 transition-all duration-500"
                    onError={(event) => {
                      event.currentTarget.src = "/team/default.jpg";
                    }}
                  />
                  <p className="text-base font-semibold text-[#203E2E] drop-shadow-md">
                    {member.role}
                  </p>
                  <p className="text-lg font-bold text-[#203E2E] drop-shadow-lg">
                    {member.name}
                  </p>
                  {member.yearDept && (
                    <p className="text-sm font-semibold text-[#203E2E]/80">
                      {member.yearDept}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PAST CHAIRPERSONS Section */}
          <div
            className="bg-[#e6f86d] text-[#203E2E] rounded-2xl p-8 sm:p-10 w-full max-w-[600px]
             text-center shadow-[0_0_40px_rgba(230,248,109,0.3)] border-4 border-white animate-glow z-10 transition-all duration-300 hover:scale-[1.01] overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#e6f86d]/40 to-transparent opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <h3 className="text-2xl font-extrabold mb-6 text-[#203E2E] drop-shadow-md relative">
              PAST CHAIRPERSONS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {pastChairpersons.map((member, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setSelectedMember({
                      name: member.name,
                      image: member.image,
                      linkedin: member.linkedin,
                      academicYear: member.academicYear,
                    })
                  }
                  className="cursor-pointer hover:scale-105 transition-transform duration-300 relative group"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-52 h-52 mx-auto mb-3 object-cover border-4 border-[#203E2E] shadow-lg group-hover:shadow-[0_0_20px_rgba(230,248,109,0.8)] group-hover:rotate-3 transition-all duration-500"
                    onError={(event) => {
                      event.currentTarget.src = "/team/default.jpg";
                    }}
                  />
                  <p className="text-base font-semibold text-[#203E2E] drop-shadow-md">
                    {member.name}
                  </p>
                  {member.academicYear && (
                    <p className="text-sm font-medium text-gray-700 drop-shadow-sm">
                      ({member.academicYear})
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* END PAST CHAIRPERSONS Section */}

          {allTeamBoxNames.map((teamName) => (
            <div
              key={teamName}
              onClick={() => toggleTeam(teamName)}
              className="group bg-[#e6f86d] text-[#203E2E] rounded-2xl w-full max-w-[600px] p-8 flex flex-col items-center justify-center cursor-pointer transition duration-500 hover:scale-[1.02] shadow-[0_0_40px_rgba(230,248,109,0.1)] relative overflow-hidden border-4 border-white"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#e6f86d]/40 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <p className="text-2xl font-bold text-center relative z-10 drop-shadow-lg">
                {teamName}
              </p>
              <div className="flex items-center justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                <span className="text-[#203E2E] text-lg mr-2">👀</span>
                <span className="text-[#203E2E] text-lg">View Members</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* TEAM POPUP */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="popup-special text-white p-8 w-[90%] max-w-xl shadow-2xl relative animate-fade-in-up border-4 border-[#e6f86d] rounded-2xl bg-white/10 backdrop-blur-lg">
            <button
              onClick={() => setSelectedTeam(null)}
              className="absolute top-3 right-4 text-3xl font-bold text-[#e6f86d] hover:text-white transition-colors"
            >
              ✖
            </button>
            <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-[#e6f86d] via-white to-[#e6f86d] text-transparent bg-clip-text animate-glow-text drop-shadow-md">
              {selectedTeam}
            </h2>
            <ul className="text-center space-y-3">
              {teams[selectedTeam]?.map((fullName, idx) => (
                <li
                  key={idx}
                  className="text-lg font-semibold text-white"
                >
                  {fullName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* MEMBER POPUP */}
      {selectedMember && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-xl">
          <div className="popup-special text-white p-10 w-[90%] max-w-sm relative animate-fade-in-up border-4 border-[#e6f86d] rounded-2xl bg-white/10 backdrop-blur-lg shadow-[0_0_50px_rgba(230,248,109,0.4)]">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-4 text-3xl font-bold text-[#e6f86d] hover:text-white transition-colors"
            >
              ✖
            </button>
            <img
              src={selectedMember.image}
              className="w-56 h-56 rounded-full mx-auto mb-4 object-cover border-4 border-[#e6f86d] shadow-lg hover:shadow-[0_0_20px_rgba(230,248,109,0.8)] transition-all duration-300"
              alt={selectedMember.name}
              onError={(event) => {
                event.currentTarget.src = "/team/default.jpg";
              }}
            />
            <p className="text-2xl font-bold text-center underline decoration-[#e6f86d] drop-shadow-lg text-white">
              {selectedMember.name}
            </p>
            {selectedMember.yearDept && (
              <p className="text-base font-semibold text-center text-white/80 mt-1">
                {selectedMember.yearDept}
              </p>
            )}
            {selectedMember.linkedin && (
              <a
                href={selectedMember.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex justify-center items-center text-white bg-[#0077b5] px-4 py-2 rounded-full font-semibold transition hover:bg-[#005582]"
              >
                View LinkedIn
              </a>
            )}
          </div>
        </div>
      )}

      <footer className="mt-50 w-full ">
        <GooeyLinks />
      </footer>
    </div>
  );
}
