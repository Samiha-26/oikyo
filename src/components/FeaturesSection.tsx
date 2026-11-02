import Link from "next/link";
import { LuShieldCheck, LuLayers, LuUsers, LuMapPin, LuArrowRight, LuCheck } from "react-icons/lu";

export default function FeaturesSection() {
  const features = [
    {
      icon: <LuShieldCheck className="text-2xl text-primary" />,
      badge: "Grassroots Trust",
      title: "Verified Community Hubs",
      description:
        "Direct neighborhood coalitions across all 64 districts vetted by local community leaders, ensuring emergency relief reaches actual beneficiaries without intermediary overhead.",
      points: [
        "Verified organizer profiles",
        "Direct ward-level coordination",
        "Non-partisan civic governance",
      ],
      link: "/events",
      linkText: "View active hubs",
    },
    {
      icon: <LuLayers className="text-2xl text-accent" />,
      badge: "Zero Duplication",
      title: "Transparent Resource Ledger",
      description:
        "Every distributed blanket, medicine kit, and food parcel is logged with location stamps and recipient counts to eliminate relief hoarding and geographic overlap.",
      points: [
        "Item-level quota tracking",
        "Live distribution tallies",
        "Public audit trail for drives",
      ],
      link: "/impact-map",
      linkText: "Explore impact map",
    },
    {
      icon: <LuUsers className="text-2xl text-secondary" />,
      badge: "Real-Time Mobilization",
      title: "Rapid Volunteer Deployment",
      description:
        "Join relief operations with one click. Automated spot capacity reservations, scheduled rendezvous points, and roster management ensure safe and organized action.",
      points: [
        "Automated spot reservation",
        "Rendezvous checkpoints & timings",
        "Direct organizer dispatch notices",
      ],
      link: "/events",
      linkText: "Join a relief drive",
    },
    {
      icon: <LuMapPin className="text-2xl text-info" />,
      badge: "District Accountability",
      title: "Geo-Targeted Action Ledger",
      description:
        "Focus civic efforts where help is urgently needed most: flood-affected haors, river-erosion chars, cold-wave hit northern tea estates, and urban slum clusters.",
      points: [
        "Ward & district heatmaps",
        "Cold-wave and flood alerts",
        "Post-event photographic reports",
      ],
      link: "/impact-map",
      linkText: "Check district ledger",
    },
  ];

  return (
    <section className="py-20 bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Civic Infrastructure for Bangladesh
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content tracking-tight">
            Built for Grassroots Accountability, Designed for Direct Action
          </h2>
          <p className="text-base sm:text-lg text-base-content/75 leading-relaxed">
            Oikyo replaces uncoordinated social media campaigns with structured, verifiable civic logistics so neighborhood volunteers can organize relief drives with complete community trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-base-200/50 hover:bg-base-200 border border-base-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-base-100 border border-base-300 flex items-center justify-center shadow-xs">
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-base-100 text-base-content/70 border border-base-300">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-base-content mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-base-content/75 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <ul className="space-y-2 mb-6 border-t border-base-300/80 pt-4">
                  {feature.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-xs text-base-content/80 font-medium">
                      <LuCheck className="text-success shrink-0 text-sm" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={feature.link}
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors pt-2 group"
              >
                <span>{feature.linkText}</span>
                <LuArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-linear-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 border border-base-300 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="font-serif text-lg font-bold text-base-content">
              Ready to mobilize volunteers in your neighborhood?
            </h4>
            <p className="text-xs text-base-content/70">
              Create an event in under 3 minutes with automated quotas and roster tracking.
            </p>
          </div>
          <Link
            href="/create-event"
            className="btn btn-primary btn-sm px-6 font-semibold shadow-xs shrink-0"
          >
            Start Organizing
          </Link>
        </div>

      </div>
    </section>
  );
}
