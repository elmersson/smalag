import CreateBoardForm from "@/components/forms/board";

const CreateBoardPage = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="font-bold text-base text-themeTextWhite">
          Create a board
        </h5>
        <p className="text-themeTextGray leading-tight">
          Create a board to start collaborating with your team.
        </p>
      </div>
      <CreateBoardForm />
    </div>
  );
};

export default CreateBoardPage;
