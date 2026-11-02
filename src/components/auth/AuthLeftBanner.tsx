import Image from "next/image";
import Link from "next/link";
import { LuShieldCheck, LuMapPin, LuHeartHandshake, LuSparkles } from "react-icons/lu";

interface AuthLeftBannerProps {
  quoteText: string;
  author: string;
  authorRole: string;
}

export default function AuthLeftBanner({ quoteText, author, authorRole }: AuthLeftBannerProps) {
  return (
    <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-primary text-white rounded-3xl min-h-[640px]">
      <Image
        src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
        alt="Community relief field action"
        fill
        priority
        className="object-cover opacity-20 mix-blend-overlay"
      />

      <div className="relative z-10 space-y-4">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-serif font-black text-xl text-white shadow-xs">
            ঐ
          </div>
          <div>
            <div className="font-serif font-bold text-2xl tracking-tight leading-none text-white">
              Oikyo
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-white/70">
              Grassroots Coalition
            </div>
          </div>
        </Link>

        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold">
          <LuSparkles className="text-sm" />
          <span>Decentralized Civic Infrastructure</span>
        </div>
      </div>

      <div className="relative z-10 space-y-6 my-auto max-w-lg">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
          Direct Relief Logistics Without Intermediary Friction.
        </h2>
        
        <p className="text-sm text-white/85 leading-relaxed italic border-l-2 border-white/40 pl-4">
          &ldquo;{quoteText}&rdquo;
        </p>
        
        <div className="text-xs text-white/80">
          <span className="font-bold text-white block">{author}</span>
          <span>{authorRole}</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-3 border-t border-white/20 pt-6">
        <div className="flex items-center gap-2">
          <LuMapPin className="text-white/80 text-base shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold block">64 Districts</span>
            <span className="text-white/70">Active Hubs</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LuHeartHandshake className="text-white/80 text-base shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold block">28,450+</span>
            <span className="text-white/70">Units Given</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LuShieldCheck className="text-white/80 text-base shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold block">100% Non-Partisan</span>
            <span className="text-white/70">Open Audit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
