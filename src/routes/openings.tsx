import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Briefcase, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/openings")({
  component: CurrentOpeningsPage,
});

const jobs = [
  {
    title: "Genesys Developer",
    openings: "Multiple",
    sections: [
      {
        heading: "Job Duties",
        points: [
          "Developer - Genesys Cloud, Call Flow, Logic & Programming, Genesys API, Cloud Integration, Custom scripts, AWS, AWS event bridge, third party application integration.",
          "Configuration - Deep working experience with Division, Queues, Call Routing, DID Number & Number Management, Edge, BYOC, Carrier connectivity, DataTable, Schedule & Schedule Group, Quality Administration, Custom Data Actions/API, OAuth Management, Roles & Permission Management.",
          "Application Support - Their campaign software will be integrated to Genesys Cloud. Troubleshoot application issues, review logs from server, fix and refer to dev teams when required.",
          "Data Model - Integrate database/data models to cloud, data modeling, data profiling, data cleansing and data analysis.",
        ],
      },
      {
        heading: "Education",
        points: [
          "Bachelor's degree in Computer Science, Information Technology, IS/Engineering or closely related field with 5+ years of experience in the job offered or as an IT Consultant, Analyst, Programmer, Developer or Engineer.",
        ],
      },
      {
        heading: "Experience",
        points: [
          "5+ years working with Genesys Cloud is required.",
          "Travel and/or relocation may be required to unanticipated client sites within USA.",
          "Employer provides Information Technology services to various clients in USA and project implementation may require such travel.",
        ],
      },
    ],
  },
  {
    title: "Contact Center Project Manager",
    openings: "Multiple",
    sections: [
      {
        heading: "Minimum Requirements",
        points: [
          "8 years required - Telephony/VoIP experience with a focus on Contact Center applications.",
          "8 years required - Experience with cloud based contact center applications CCaaS.",
          "8 years required - Experience with Genesys CX Cloud installation, implementation and configuration.",
          "8 years required - Advanced hands-on experience in migration strategy planning and execution from a legacy on-premise/hosted contact center platform to a CCaaS Genesys platform.",
          "8 years required - Architect call flows, IVRs, skills, permissions, roles, data points and users.",
          "8 years required - Strong understanding of communication infrastructure, device compatibility and integration with CCaaS platforms.",
          "8 years required - Hands-on experience and knowledge with cloud providers such as Genesys, Google Cloud and AWS.",
          "8 years required - Strong proficiency with configuring and optimizing cloud platforms for telecom applications, ensuring performance, reliability and security.",
        ],
      },
    ],
  },
  {
    title: "Contact Center BA",
    openings: "Multiple",
    sections: [
      {
        heading: "Requirements",
        points: [
          "Looking for a seasoned Contact Center & Telephony Business Analyst.",
          "Experience in Avaya, Cisco, IVR, CCaaS, Genesys Cloud, Nice CXOne and Amazon Connect.",
          "Deep experience of data and use case collection from internal business stakeholders.",
          "Able to play a bridge role between developers, architects and end users.",
        ],
      },
    ],
  },
];

export default function CurrentOpeningsPage() {
  const monsterJobUrl =
    "https://www.monster.com/jobs/search?q=&where=&page=1&cn=RACube+Technologies+LLC&geo=33.1056799%2C-96.79695";

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="relative overflow-hidden py-24 lg:py-28">
        {/* background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 h-80 w-80 rounded-full bg-[#1B75FF]/20 blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#E53935]/20 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back to home
          </a>

          <div className="mt-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#1B75FF] font-semibold">
              <span className="h-px w-8 bg-[#1B75FF]" />
              Current Openings
            </div>

            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight">
              Join RACube and build the future of{" "}
              <span className="text-gradient">enterprise CX</span>.
            </h1>

            <p className="mt-5 text-muted-foreground leading-relaxed text-base md:text-lg">
              These are our current priority jobs for full-time roles. Review the details below and
              apply for the position that matches your experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={monsterJobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-aurora px-5 py-2.5 font-medium text-white shadow-glow hover:scale-[1.03] transition"
              >
                Open Job Site
                <ArrowRight size={14} />
              </a>

              <a
                href="#featured-jobs"
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 font-medium hover:bg-white/10 transition"
              >
                Featured Jobs
                <Briefcase size={14} />
              </a>
            </div>
          </div>

          <div id="featured-jobs" className="mt-16 space-y-6">
            {jobs.map((job, index) => (
              <article
                key={job.title}
                className="rounded-3xl glass-strong border-gradient p-6 md:p-8 overflow-hidden relative"
              >
                <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-aurora opacity-20 blur-3xl" />

                <div className="relative grid lg:grid-cols-[260px_1fr] gap-8">
                  {/* job title side */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
                        <Briefcase size={18} className="text-[#1B75FF]" />
                      </div>

                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        Role 0{index + 1}
                      </div>
                    </div>

                    <h2 className="mt-5 text-2xl md:text-3xl font-semibold leading-tight">
                      {job.title}
                    </h2>

                   <div className="mt-4">
  <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-muted-foreground">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
    Openings: {job.openings}
  </div>
</div>

<div className="mt-6">
  <a
    href={monsterJobUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-sm font-medium text-[#1B75FF] hover:text-white transition"
  >
    Apply Now
    <ArrowRight size={14} />
  </a>
</div>
                  </div>

                  {/* job details */}
                  <div className="space-y-7">
                    {job.sections.map((section) => (
                      <div key={section.heading}>
                        <h3 className="text-xs uppercase tracking-[0.18em] text-[#1B75FF] font-semibold">
                          {section.heading}
                        </h3>

                        <div className="mt-4 space-y-3">
                          {section.points.map((point) => (
                            <div
                              key={point}
                              className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                            >
                              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1B75FF]" />
                              <p>{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
