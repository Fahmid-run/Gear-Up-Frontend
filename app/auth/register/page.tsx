import { SignupForm } from "@/components/signup-form";
import React from "react";

const RegisterPage = () => {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <SignupForm></SignupForm>
      </div>
    </>
  );
};

export default RegisterPage;
