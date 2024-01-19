"use client";

import AuthService from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = AuthService.getCurrentUser();
  const router = useRouter();
  if (!user) {
   router.push("/auth/signin");
  } else if (user){
  router.push("/dashboard");}


  return (
    <main>
    </main>
  );
}
