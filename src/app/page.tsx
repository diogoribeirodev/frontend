"use client";

import AuthService from "@/services/auth.service";
import { unstable_noStore } from "next/cache";
import { useRouter } from "next/navigation";

export default function Home() {
  unstable_noStore();
  const user = AuthService.getCurrentUser();
  const router = useRouter();
  if (!user) {
    router.push("/auth/signin");
  } else if (user) {
    router.push("/dashboard");
  }

  return <main></main>;
}
