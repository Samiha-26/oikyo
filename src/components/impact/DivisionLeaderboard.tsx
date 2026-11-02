import { LuTrophy, LuAward, LuTrendingUp, LuMapPin, LuUsers, LuHeartHandshake } from "react-icons/lu";

export interface DivisionStat {
  rank: number;
  name: string;
  districts: number;
  activeHubs: number;
  packagesDelivered: number;
  volunteerHours: number;
  topSector: string;
  priorityTag?: string;
  badgeColor: string;
}

export const divisionData: DivisionStat[] = [
  {
    rank: 1,
    name: "Dhaka Division",
    districts: 13,
    activeHubs: 48,
    packagesDelivered: 12450,
    volunteerHours: 5800,
    topSector: "Night Thermal & Medical",
    priorityTag: "Highest Volume",
    badgeColor: "badge-primary",
  },
  {
    rank: 2,
    name: "Rangpur Division",
    districts: 8,
    activeHubs: 24,
    packagesDelivered: 6800,
    volunteerHours: 3200,
    topSector: "Winter Cold-Wave Relief",
    priorityTag: "Cold-Wave Priority",
    badgeColor: "badge-error",
  },
  {
    rank: 3,
    name: "Sylhet Division",
    districts: 4,
    activeHubs: 18,
    packagesDelivered: 3400,
    volunteerHours: 1950,
    topSector: "Tea Garden & Haor Education",
    priorityTag: "Flood Resilience",
    badgeColor: "badge-accent",
  },
  {
    rank: 4,
    name: "Khulna Division",
    districts: 10,
    activeHubs: 16,
    packagesDelivered: 2900,
    volunteerHours: 1600,
    topSector: "Coastal Mangrove Planting",
    priorityTag: "Salinity Defense",
    badgeColor: "badge-success",
  },
  {
    rank: 5,
    name: "Chattogram Division",
    districts: 11,
    activeHubs: 15,
    packagesDelivered: 2750,
    volunteerHours: 1450,
    topSector: "Hill Tracts Water Access",
    priorityTag: "Clean Water",
    badgeColor: "badge-info",
  },
  {
    rank: 6,
    name: "Rajshahi Division",
    districts: 8,
    activeHubs: 12,
    packagesDelivered: 2100,
    volunteerHours: 1100,
    topSector: "Padma River Char Medical",
    badgeColor: "badge-secondary",
  },
  {
    rank: 7,
    name: "Barishal Division",
    districts: 6,
    activeHubs: 11,
    packagesDelivered: 1850,
    volunteerHours: 980,
    topSector: "River Erosion Relief",
    badgeColor: "badge-neutral",
  },
  {
    rank: 8,
    name: "Mymensingh Division",
    districts: 4,
    activeHubs: 10,
    packagesDelivered: 1650,
    volunteerHours: 850,
    topSector: "Indigenous Forest Health",
    badgeColor: "badge-neutral",
  },
];

export default function DivisionLeaderboard() {
  return (
    <div className="bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <LuTrophy className="text-sm" />
            <span>8-Division Civic Leaderboard</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-base-content tracking-tight">
            Grassroots Mobilization by Division
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-base-content/70 bg-base-200/60 px-3.5 py-2 rounded-xl border border-base-300">
          <LuTrendingUp className="text-success text-sm shrink-0" />
          <span>Updated dynamically across all 64 districts</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-left">
          <thead>
            <tr className="border-b border-base-300 text-xs text-base-content/70 uppercase">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Division</th>
              <th className="py-3 px-4">Active Hubs</th>
              <th className="py-3 px-4">Packages Delivered</th>
              <th className="py-3 px-4">Volunteer Hours</th>
              <th className="py-3 px-4">Primary Relief Sector</th>
            </tr>
          </thead>
          <tbody>
            {divisionData.map((div) => (
              <tr key={div.rank} className="hover:bg-base-200/50 transition-colors text-sm">
                <td className="py-4 px-4 font-bold">
                  {div.rank === 1 ? (
                    <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold text-xs shadow-xs">
                      <LuTrophy />
                    </span>
                  ) : div.rank === 2 ? (
                    <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-800 flex items-center justify-center font-extrabold text-xs shadow-xs">
                      2
                    </span>
                  ) : div.rank === 3 ? (
                    <span className="w-7 h-7 rounded-full bg-amber-700/30 text-amber-900 flex items-center justify-center font-extrabold text-xs shadow-xs">
                      3
                    </span>
                  ) : (
                    <span className="text-base-content/60 font-semibold px-2">{div.rank}</span>
                  )}
                </td>

                <td className="py-4 px-4">
                  <div className="font-bold text-base-content flex items-center gap-2">
                    <span>{div.name}</span>
                    {div.priorityTag && (
                      <span className={`badge ${div.badgeColor} badge-xs font-bold uppercase tracking-wider`}>
                        {div.priorityTag}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-base-content/60">
                    {div.districts} administrative districts
                  </div>
                </td>

                <td className="py-4 px-4 font-semibold text-base-content">
                  <span className="inline-flex items-center gap-1.5">
                    <LuMapPin className="text-primary text-xs" />
                    <span>{div.activeHubs} hubs</span>
                  </span>
                </td>

                <td className="py-4 px-4 font-bold text-base-content">
                  <span className="inline-flex items-center gap-1.5">
                    <LuHeartHandshake className="text-accent text-sm" />
                    <span>{div.packagesDelivered.toLocaleString()}</span>
                  </span>
                </td>

                <td className="py-4 px-4 font-semibold text-base-content/80">
                  <span className="inline-flex items-center gap-1.5">
                    <LuUsers className="text-secondary text-xs" />
                    <span>{div.volunteerHours.toLocaleString()} hrs</span>
                  </span>
                </td>

                <td className="py-4 px-4">
                  <span className="text-xs font-medium text-base-content/80 bg-base-200 px-2.5 py-1 rounded-lg border border-base-300">
                    {div.topSector}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
