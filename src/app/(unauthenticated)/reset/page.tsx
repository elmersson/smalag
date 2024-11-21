import ResetForm from "@/components/forms/reset";

const ResetPage = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="font-bold text-base text-themeTextWhite">
          Reset Password
        </h5>
        <p className="text-themeTextGray leading-tight">
          Enter your email to reset your password and regain access to your
          account.
        </p>
      </div>
      <ResetForm />
    </div>
  );
};

export default ResetPage;
