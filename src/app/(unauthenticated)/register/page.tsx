import RegisterForm from "@/components/forms/register";

const RegisterPage = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="font-bold text-base text-themeTextWhite">Signup</h5>
        <p className="text-themeTextGray leading-tight">
          Simplify your development with our tools, so you can focus on building
          features.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
