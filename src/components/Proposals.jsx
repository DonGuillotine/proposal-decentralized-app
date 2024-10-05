import Proposal from "./Proposal";

const Proposals = ({ proposals }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Proposals</h1>
      {proposals.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-xl text-gray-600">No proposals to display</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map(
            ({
              id,
              deadline,
              minRequiredVote,
              amount,
              description,
              executed,
              votecount,
            }) => (
              <Proposal
                key={`${id}-${deadline}`}
                id={id}
                amount={amount}
                deadline={deadline}
                description={description}
                executed={executed}
                minRequiredVote={minRequiredVote}
                votecount={votecount}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Proposals;
