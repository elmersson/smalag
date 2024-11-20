import NewVerificationForm from "@/components/forms/new-verification";

const NewVerificationPage = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="font-bold text-base text-themeTextWhite">
          Email Verification
        </h5>
        <p className="text-themeTextGray leading-tight">
          Thanks for confirming your email
        </p>
      </div>
      <NewVerificationForm />
    </div>
  );
};

export default NewVerificationPage;
