import { SignUpForm } from "@/app/_components/SignUpForm";
import { unstable_noStore } from "next/cache";

const SignUpPage = () => {
  unstable_noStore();
  return <SignUpForm />;
};

export default SignUpPage;
