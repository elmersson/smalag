import CreateChannelForm from "@/components/forms/channel";

const CreateChannelPage = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="font-bold text-base text-themeTextWhite">
          Create a channel
        </h5>
        <p className="text-themeTextGray leading-tight">
          Create a channel to start collaborating with your team.
        </p>
      </div>
      <CreateChannelForm />
    </div>
  );
};

export default CreateChannelPage;
