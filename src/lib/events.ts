import { EventItem } from "@/components/EventCard";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" && !window.location.hostname.includes("localhost")
    ? "https://oikyo-server.vercel.app"
    : "http://localhost:8000");

export async function getAuthToken(): Promise<string | null> {
  try {
    if (typeof window === "undefined") return null;
    const res = await fetch("/api/auth/token", {
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.token || null;
  } catch {
    return null;
  }
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = await getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

const fallbackRecentEvents: EventItem[] = [
  {
    _id: "6724a1b8c001a1a1a1000001",
    title: "North Bengal Cold-Wave Blanket & Thermal Clothing Relief",
    description: "Emergency thermal gear, heavy blankets, and sweaters for vulnerable agrarian families and day-laborers enduring sub-10°C cold waves.",
    category: "Winter Clothing",
    date: "2026-11-18",
    location: "Tetulia Upazila Complex, Panchagarh",
    district: "Panchagarh",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 35,
    volunteersJoined: 28,
    creatorName: "Tanvir Ahmed",
    creatorEmail: "tanvir.civic@gmail.com",
    creatorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    status: "active",
  },
  {
    _id: "6724a1b8c001a1a1a1000002",
    title: "Rayer Bazar Informal Settlement Pediatric Health Camp",
    description: "Distributing basic antibiotics, oral rehydration salts, skin ointments, and medical checkups for under-12 children.",
    category: "Medical Relief",
    date: "2026-11-20",
    location: "Community Center, Rayer Bazar, Dhaka",
    district: "Dhaka",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 20,
    volunteersJoined: 18,
    creatorName: "Dr. Farhana Yasmin",
    creatorEmail: "farhana.health@gmail.com",
    creatorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
    status: "active",
  },
  {
    _id: "6724a1b8c001a1a1a1000003",
    title: "Turag River Bank Cleanliness & Plastic Interception Drive",
    description: "Community-driven cleanup along the Turag embankment to intercept single-use plastics and hazardous nylon mesh before flood overflow.",
    category: "Clean Environment",
    date: "2026-11-23",
    location: "Ashulia Beribadh Point, Dhaka",
    district: "Dhaka",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 50,
    volunteersJoined: 42,
    creatorName: "Asif Mahmud",
    creatorEmail: "asif.green@gmail.com",
    creatorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    status: "active",
  },
  {
    _id: "6724a1b8c001a1a1a1000004",
    title: "Coastal Mangrove & Tidal Salinity Barrier Sapling Planting",
    description: "Planting 1,500 native mangrove saplings along vulnerable riverbanks to combat tidal surge erosion and soil salinization.",
    category: "Tree Planting",
    date: "2026-11-26",
    location: "Shyamnagar Embankment, Satkhira",
    district: "Satkhira",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 40,
    volunteersJoined: 40,
    creatorName: "Rashidul Islam",
    creatorEmail: "rashid.satkhira@gmail.com",
    creatorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    status: "active",
  },
  {
    _id: "6724a1b8c001a1a1a1000005",
    title: "Tea Garden Labor Community School Supplies & Warm Vest Dispatch",
    description: "Equipping 200 young primary school students with notebooks, winter vests, backpacks, and solar study lamps.",
    category: "Education & Youth",
    date: "2026-11-29",
    location: "Finlay Tea Division Ground, Sreemangal",
    district: "Moulvibazar",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 25,
    volunteersJoined: 15,
    creatorName: "Meherun Nesa",
    creatorEmail: "meherun.sylhet@gmail.com",
    creatorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    status: "active",
  },
  {
    _id: "6724a1b8c001a1a1a1000006",
    title: "Old Dhaka Heritage Canal Debris Clearance & Bio-Enzyme Treatment",
    description: "Youth volunteer brigade removing urban plastic debris and introducing organic water treatment to clear foul drainage channels.",
    category: "Water Sanitation",
    date: "2026-12-02",
    location: "Chawkbazar Canal Culvert, Dhaka",
    district: "Dhaka",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 30,
    volunteersJoined: 19,
    creatorName: "Nafis Imtiaz",
    creatorEmail: "nafis.olddhaka@gmail.com",
    creatorImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
    status: "active",
  },
];

export async function getRecentEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(`${API_BASE}/recent-events`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return fallbackRecentEvents;
    }
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : fallbackRecentEvents;
  } catch {
    return fallbackRecentEvents;
  }
}

export async function getAllEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(`${API_BASE}/events`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return fallbackRecentEvents;
    }
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : fallbackRecentEvents;
  } catch {
    return fallbackRecentEvents;
  }
}

export async function getEventById(id: string): Promise<EventItem | null> {
  try {
    const res = await fetch(`${API_BASE}/event/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return fallbackRecentEvents.find((e) => e._id === id) || null;
    }
    return await res.json();
  } catch {
    return fallbackRecentEvents.find((e) => e._id === id) || null;
  }
}

export async function addEvent(eventData: Partial<EventItem>) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/add-event`, {
    method: "POST",
    headers,
    body: JSON.stringify(eventData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || err.message || "Failed to create event");
  }
  return res.json();
}

export async function updateEvent(id: string, updateData: Partial<EventItem>) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/event/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updateData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || err.message || "Failed to update event");
  }
  return res.json();
}

export async function deleteEvent(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/event/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || err.message || "Failed to delete event");
  }
  return res.json();
}

export async function joinEvent(joinData: {
  eventId: string;
  userEmail: string;
  userName: string;
  userImage?: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  category: string;
}) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/join-event`, {
    method: "POST",
    headers,
    body: JSON.stringify(joinData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || err.message || "Failed to join event");
  }
  return res.json();
}

export async function getMyEvents(email: string): Promise<EventItem[]> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/my-events/${encodeURIComponent(email)}`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getMyJoinedEvents(email: string): Promise<any[]> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/my-joined-events/${encodeURIComponent(email)}`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function deleteJoinedEvent(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}/my-joined-events/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || err.message || "Failed to cancel event registration");
  }
  return res.json();
}
