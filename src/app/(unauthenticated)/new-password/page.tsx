import NewPasswordForm from "@/components/forms/new-password";

const NewPasswordPage = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="font-bold text-base text-themeTextWhite">
          New Password
        </h5>
        <p className="text-themeTextGray leading-tight">
          Please enter your new password below
        </p>
      </div>
      <NewPasswordForm />
    </div>
  );
};

export default NewPasswordPage;
