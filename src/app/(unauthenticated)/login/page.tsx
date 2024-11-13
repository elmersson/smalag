import LoginForm from "@/components/forms/login";

const LoginPage = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="font-bold text-base text-themeTextWhite">Login</h5>
        <p className="text-themeTextGray leading-tight">
          Welcome back! We&apos;re glad to see you again.
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
