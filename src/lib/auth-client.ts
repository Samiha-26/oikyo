import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

const resolveClientBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const envUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || "";
  if (envUrl && !envUrl.includes("oikyo.vercel.app")) {
    return envUrl;
  }
  return "https://oikyo-topaz.vercel.app";
};

export const authClient = createAuthClient({
  baseURL: resolveClientBaseURL(),
  plugins: [jwtClient()],
});
