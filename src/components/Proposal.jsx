import { formatEther } from "ethers";
import useVote from "../hooks/useVote";
import useExecuteProposal from "../hooks/useExecuteProposal";

const Proposal = ({
  id,
  description,
  amount,
  minRequiredVote,
  votecount,
  deadline,
  executed,
}) => {
  const handleVote = useVote();
  const handleExecute = useExecuteProposal();
  const currentTime = Date.now() / 1000;

  const status = (() => {
    if (executed) return { text: "Passed", color: "bg-green-500" };
    if (votecount >= minRequiredVote && currentTime > deadline)
      return { text: "Execute", color: "bg-blue-500" };
    if (votecount >= minRequiredVote && currentTime <= deadline)
      return { text: "Waiting", color: "bg-yellow-500" };
    if (votecount < minRequiredVote && currentTime > deadline)
      return { text: "Failed", color: "bg-red-500" };
    return { text: "Vote", color: "bg-purple-500" };
  })();

  const isDisabled =
    executed || status.text === "Waiting" || status.text === "Failed";

  const handleClick = () => {
    if (!isDisabled) {
      status.text === "Execute" ? handleExecute(id) : handleVote(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Proposal #{id}</h2>
      <div className="space-y-3">
        <InfoRow label="Description" value={description} />
        <InfoRow label="Amount" value={`${formatEther(amount)} ETH`} />
        <InfoRow label="Required Vote" value={Number(minRequiredVote)} />
        <InfoRow label="Vote Count" value={Number(votecount)} />
        <InfoRow
          label="Deadline"
          value={new Date(Number(deadline) * 1000).toLocaleDateString()}
        />
        <InfoRow label="Executed" value={String(executed)} />
      </div>
      <button
        className={`${
          status.color
        } text-white font-bold w-full mt-6 py-3 px-4 rounded-md shadow-sm transition duration-300 ease-in-out ${
          isDisabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {status.text}
      </button>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}:</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

export default Proposal;
