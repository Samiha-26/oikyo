'use client';

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { LuShieldCheck } from "react-icons/lu";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed to Community Dispatch!");
    setEmail("");
  };

  return (
    <footer className="w-full bg-base-200 text-base-content border-t border-base-300 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-content flex items-center justify-center font-bold text-base">
                ঐ
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-primary leading-none">
                Oikyo <span className="text-base font-normal text-base-content/70">(ঐক্য)</span>
              </span>
            </Link>

            <p className="text-sm text-base-content/70 leading-relaxed max-w-sm">
              Bangladesh's grassroots coalition platform for hyper-local social action, winter relief, disaster logistics, and community development. Built with empathy in Dhaka for every district nationwide.
            </p>

            <div className="inline-flex items-center gap-2 bg-base-100 px-3 py-1.5 rounded-full text-xs font-semibold text-accent border border-base-300">
              <LuShieldCheck className="text-sm" />
              <span>Govt & Verified NGO Network</span>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="font-serif text-base font-bold text-base-content">Action Sectors</div>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>
                <Link href="/events?category=Winter Relief" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Winter Relief & Cold Wave
                </Link>
              </li>
              <li>
                <Link href="/events?category=Blanket Drives" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Blanket Distribution Drives
                </Link>
              </li>
              <li>
                <Link href="/events?category=Disaster Rescue" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Flood Aid & Disaster Rescue
                </Link>
              </li>
              <li>
                <Link href="/events?category=Education" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Youth Tutoring & Literacy
                </Link>
              </li>
              <li>
                <Link href="/events?category=Free Kitchens" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  Community Free Kitchens
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <div className="font-serif text-base font-bold text-base-content">Platform Portal</div>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Upcoming Events</Link></li>
              <li><Link href="/impact-map" className="hover:text-primary transition-colors">Impact Map</Link></li>
              <li><Link href="/create-event" className="hover:text-primary transition-colors">Create Event</Link></li>
              <li><Link href="/manage-events" className="hover:text-primary transition-colors">Manage Events</Link></li>
              <li><Link href="/joined-events" className="hover:text-primary transition-colors">Joined Events</Link></li>
              <li><Link href="/signin" className="hover:text-primary transition-colors">Login</Link></li>
              <li><Link href="/signup" className="hover:text-primary transition-colors">Register</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="font-serif text-base font-bold text-base-content">Community Dispatch</div>
            <p className="text-xs text-base-content/70 leading-relaxed">
              Receive weekly emergency appeals, logistics requests, and deployment dispatches across Dhaka and beyond.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-sm input-bordered w-full text-xs bg-base-100"
              />
              <button type="submit" className="btn btn-sm btn-primary text-xs font-semibold px-4 shrink-0">
                Join
              </button>
            </form>

            <div className="pt-2">
              <div className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-2">Follow Movement</div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                  className="w-8 h-8 rounded-lg bg-base-100 border border-base-300 flex items-center justify-center text-base-content/80 hover:text-primary hover:border-primary transition-colors"
                >
                  <FaXTwitter className="text-sm" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-base-100 border border-base-300 flex items-center justify-center text-base-content/80 hover:text-primary hover:border-primary transition-colors"
                >
                  <FaFacebookF className="text-xs" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-base-100 border border-base-300 flex items-center justify-center text-base-content/80 hover:text-primary hover:border-primary transition-colors"
                >
                  <FaLinkedinIn className="text-xs" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-base-100 border border-base-300 flex items-center justify-center text-base-content/80 hover:text-primary hover:border-primary transition-colors"
                >
                  <FaYoutube className="text-xs" />
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-base-300 flex flex-col md:flex-row items-center justify-between text-xs text-base-content/60 gap-4">
          <p>© 2026 Oikyo (ঐক্য) Foundation. Empowering civic solidarity across Bangladesh.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-primary cursor-pointer">Data Privacy</span>
            <span className="hover:text-primary cursor-pointer">Volunteer Charter</span>
            <span className="hover:text-primary cursor-pointer">Financial Transparency</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
