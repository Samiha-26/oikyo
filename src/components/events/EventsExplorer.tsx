"use client";

import { useState, useMemo } from "react";
import EventCard, { EventItem } from "@/components/EventCard";
import EventFilters from "@/components/events/EventFilters";
import { LuCalendarX, LuRotateCcw } from "react-icons/lu";

interface EventsExplorerProps {
  initialEvents: EventItem[];
}

export default function EventsExplorer({ initialEvents }: EventsExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [sortBy, setSortBy] = useState("soonest");

  const upcomingOnlyEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return initialEvents.filter((event) => {
      if (!event.date) return false;
      const eventDate = new Date(event.date);
      return !isNaN(eventDate.getTime()) && eventDate >= today;
    });
  }, [initialEvents]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    upcomingOnlyEvents.forEach((e) => {
      if (e.category) set.add(e.category);
    });
    return ["All", ...Array.from(set)];
  }, [upcomingOnlyEvents]);

  const districts = useMemo(() => {
    const set = new Set<string>();
    upcomingOnlyEvents.forEach((e) => {
      if (e.district) set.add(e.district);
    });
    return Array.from(set).sort();
  }, [upcomingOnlyEvents]);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = upcomingOnlyEvents.filter((event) => {
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        (event.district && event.district.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      const matchesDistrict =
        selectedDistrict === "All" || event.district === selectedDistrict;

      return matchesSearch && matchesCategory && matchesDistrict;
    });

    result.sort((a, b) => {
      if (sortBy === "soonest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "urgency") {
        const remainingA = (a.volunteersNeeded || 0) - (a.volunteersJoined || 0);
        const remainingB = (b.volunteersNeeded || 0) - (b.volunteersJoined || 0);
        return remainingB - remainingA;
      }
      if (sortBy === "popularity") {
        const rateA = (a.volunteersJoined || 0) / (a.volunteersNeeded || 1);
        const rateB = (b.volunteersJoined || 0) / (b.volunteersNeeded || 1);
        return rateB - rateA;
      }
      return 0;
    });

    return result;
  }, [upcomingOnlyEvents, search, selectedCategory, selectedDistrict, sortBy]);

  const handleReset = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedDistrict("All");
    setSortBy("soonest");
  };

  return (
    <div className="space-y-8">
      <EventFilters
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        districts={districts}
        totalResults={filteredEvents.length}
      />

      {filteredEvents.length === 0 ? (
        <div className="bg-base-100 rounded-3xl border border-base-300 p-12 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center mx-auto mb-4 text-base-content/50 text-2xl">
            <LuCalendarX />
          </div>
          <h3 className="font-serif text-xl font-bold text-base-content mb-2">
            No Upcoming Drives Found
          </h3>
          <p className="text-sm text-base-content/70 leading-relaxed mb-6">
            We couldn&apos;t find any active civic drives matching your current filter criteria. Past events are automatically archived to protect volunteer rosters.
          </p>
          <button
            onClick={handleReset}
            className="btn btn-primary btn-sm px-6 font-semibold inline-flex items-center gap-2 rounded-xl"
          >
            <LuRotateCcw className="text-sm" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id || event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
