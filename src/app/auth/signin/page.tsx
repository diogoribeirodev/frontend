import { SignInForm } from "@/app/_components/SignInForm";
import { unstable_noStore } from "next/cache";

const SignInPage = () => {
    unstable_noStore();
  return <SignInForm />;
};

export default SignInPage;
