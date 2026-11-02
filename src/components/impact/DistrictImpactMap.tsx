"use client";

import { useState } from "react";
import { LuMapPin, LuPackage, LuUsers, LuFlame, LuShieldCheck, LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import { divisionData, DivisionStat } from "./DivisionLeaderboard";

export default function DistrictImpactMap() {
  const [selectedDivision, setSelectedDivision] = useState<DivisionStat>(divisionData[0]);

  return (
    <div className="bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 shadow-xs space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-2">
            <LuFlame className="text-sm" />
            <span>Interactive District Heatmap</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-base-content tracking-tight">
            Explore 64 Districts by Administrative Division
          </h2>
        </div>

        <span className="text-xs text-base-content/60">
          Click any division to inspect local hubs and active relief tallies
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-7 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {divisionData.map((div) => {
              const isSelected = selectedDivision.name === div.name;
              return (
                <button
                  key={div.name}
                  onClick={() => setSelectedDivision(div)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-primary text-primary-content border-primary shadow-sm"
                      : "bg-base-200/50 hover:bg-base-200 text-base-content border-base-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                      isSelected ? "bg-white/20 text-white" : "bg-base-100 text-base-content/70"
                    }`}>
                      #{div.rank}
                    </span>
                    <LuMapPin className="text-sm shrink-0" />
                  </div>

                  <div className="font-bold text-sm leading-snug">{div.name}</div>
                  <div className={`text-[11px] mt-1 ${isSelected ? "text-white/80" : "text-base-content/60"}`}>
                    {div.activeHubs} active hubs
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-base-200/50 rounded-2xl p-4 border border-base-300 text-xs text-base-content/75 flex items-center gap-3">
            <LuShieldCheck className="text-primary text-lg shrink-0" />
            <span>All 64 districts operate under independent non-partisan volunteer charters. Zero central political intervention.</span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-base-200/60 rounded-3xl border border-base-300 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-base-300 pb-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Division Dossier
              </div>
              <h3 className="font-serif text-2xl font-bold text-base-content mt-0.5">
                {selectedDivision.name}
              </h3>
            </div>
            <span className="badge badge-primary font-bold text-xs px-3 py-1">
              Rank #{selectedDivision.rank}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-base-100 p-4 rounded-2xl border border-base-300 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm mb-2">
                <LuPackage />
              </div>
              <div className="font-serif text-2xl font-bold text-base-content">
                {selectedDivision.packagesDelivered.toLocaleString()}
              </div>
              <div className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">
                Relief Units Distributed
              </div>
            </div>

            <div className="bg-base-100 p-4 rounded-2xl border border-base-300 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm mb-2">
                <LuUsers />
              </div>
              <div className="font-serif text-2xl font-bold text-base-content">
                {selectedDivision.volunteerHours.toLocaleString()}
              </div>
              <div className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">
                Field Volunteer Hours
              </div>
            </div>
          </div>

          <div className="space-y-2 bg-base-100 p-4 rounded-2xl border border-base-300">
            <div className="text-xs font-bold uppercase tracking-wider text-base-content/60">
              Primary Mobilization Focus
            </div>
            <div className="text-sm font-semibold text-base-content">
              {selectedDivision.topSector}
            </div>
            <div className="text-xs text-base-content/70">
              Covers {selectedDivision.districts} administrative districts with {selectedDivision.activeHubs} verified community coordinating centers.
            </div>
          </div>

          <Link
            href="/events"
            className="btn btn-primary btn-sm w-full font-semibold rounded-xl inline-flex items-center justify-center gap-2 shadow-xs"
          >
            <span>View Drives in {selectedDivision.name}</span>
            <LuArrowRight className="text-sm" />
          </Link>
        </div>

      </div>
    </div>
  );
}
