import CreateSpaceForm from "@/components/forms/spaces";

const SpacesPage = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="font-bold text-base text-themeTextWhite">
          Create a space
        </h5>
        <p className="text-themeTextGray leading-tight">
          Create a space to start collaborating with your team.
        </p>
      </div>
      <CreateSpaceForm />
    </div>
  );
};

export default SpacesPage;
