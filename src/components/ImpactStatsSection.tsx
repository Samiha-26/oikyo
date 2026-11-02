import { LuMapPin, LuHeartHandshake, LuShieldCheck, LuTrendingUp, LuFlame } from "react-icons/lu";

export default function ImpactStatsSection() {
  const stats = [
    {
      number: "64 / 64",
      label: "Districts Mobilized",
      detail: "Active grassroots volunteer hubs from Tetulia to Teknaf",
      icon: <LuMapPin className="text-2xl text-primary" />,
      accent: "border-primary/20 bg-primary/5",
    },
    {
      number: "28,450+",
      label: "Relief Packages Distributed",
      detail: "Warm blankets, pediatric medicine, and ration kits",
      icon: <LuHeartHandshake className="text-2xl text-accent" />,
      accent: "border-accent/20 bg-accent/5",
    },
    {
      number: "14,200+",
      label: "Verified Volunteer Hours",
      detail: "Logged on-site with zero paid administrative overhead",
      icon: <LuTrendingUp className="text-2xl text-secondary" />,
      accent: "border-secondary/20 bg-secondary/5",
    },
    {
      number: "100%",
      label: "Civic Transparency",
      detail: "Open resource ledger eliminating geographic overlap",
      icon: <LuShieldCheck className="text-2xl text-success" />,
      accent: "border-success/20 bg-success/5",
    },
  ];

  const hotspots = [
    { district: "Panchagarh", tag: "Severe Cold Front", status: "Active Dispatch" },
    { district: "Kurigram", tag: "River Island (Char) Relief", status: "En Route" },
    { district: "Sunamganj", tag: "Haor Basin Clean Water", status: "Assembling" },
    { district: "Dhaka (Mirpur)", tag: "Night Warmth Patrol", status: "Active Dispatch" },
  ];

  return (
    <section className="py-20 bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
            <LuFlame className="text-sm" />
            <span>Real-Time Collective Ledger</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
            Measurable Humanitarian Impact Across Bangladesh
          </h2>
          <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
            Every volunteer spot filled and relief bundle distributed translates into tangible solidarity. Here is our live grassroots tally.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${stat.accent} transition-transform hover:-translate-y-1 duration-200 shadow-xs flex flex-col justify-between`}
            >
              <div className="w-12 h-12 rounded-xl bg-base-100 border border-base-300 flex items-center justify-center mb-4 shadow-2xs">
                {stat.icon}
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-base-content tracking-tight mb-1">
                  {stat.number}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-base-content/90 mb-2">
                  {stat.label}
                </div>
                <p className="text-xs text-base-content/70 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-base-200/60 rounded-2xl border border-base-300 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shrink-0"></span>
            <span className="text-xs font-bold text-base-content uppercase tracking-wider">
              Priority Hotspot Mobilizations:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {hotspots.map((spot, sIdx) => (
              <div
                key={sIdx}
                className="inline-flex items-center gap-2 bg-base-100 px-3 py-1.5 rounded-xl border border-base-300 text-xs shadow-2xs"
              >
                <span className="font-bold text-base-content">{spot.district}</span>
                <span className="text-base-content/40">•</span>
                <span className="text-base-content/70">{spot.tag}</span>
                <span className="badge badge-primary badge-xs font-semibold">{spot.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
