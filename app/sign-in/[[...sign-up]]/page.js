import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignIn></SignIn>
    </div>
  );
};

export default SignInPage;
