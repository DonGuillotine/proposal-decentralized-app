/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@radix-ui/themes";
import Layout from "./components/Layout";
import CreateProposalModal from "./components/CreateProposalModal";
import Proposals from "./components/Proposals";
import useContract from "./hooks/useContract";
import { useCallback, useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import useRunners from "./hooks/useRunners";
import { Interface } from "ethers";
import ABI from "./ABI/proposal.json";

function App() {
  const readOnlyProposalContract = useContract();
  const [contractBalance, setContractBalance] = useState("0");
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const { readOnlyProvider } = useRunners();
  const [proposals, setProposals] = useState([]);

  const multicallAbi = [
    "function tryAggregate(bool requireSuccess, (address target, bytes callData)[] calls) returns ((bool success, bytes returnData)[] returnData)",
  ];
  const fetchBalance = async () => {
    try {
      const balance = await readOnlyProvider.getBalance(contractAddress);
      setContractBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error fetching contract balance:", error);
    }
  };
  const fetchProposals = useCallback(async () => {
    if (!readOnlyProposalContract) return;

    const multicallContract = await new Contract(
      import.meta.env.VITE_MULTICALL_ADDRESS,
      multicallAbi,
      readOnlyProvider
    );

    const itf = await new Interface(ABI);

    try {
      const proposalCount = Number(
        await readOnlyProposalContract.proposalCount()
      );

      const proposalsIds = Array.from(
        { length: proposalCount - 1 },
        (_, i) => i + 1
      );

      const calls = proposalsIds.map((id) => ({
        target: import.meta.env.VITE_CONTRACT_ADDRESS,
        callData: itf.encodeFunctionData("proposals", [id]),
      }));

      const responses = await multicallContract.tryAggregate.staticCall(
        true,
        calls
      );

      const decodedResults = responses.map((res) =>
        itf.decodeFunctionResult("proposals", res.returnData)
      );

      const data = decodedResults.map((proposalStruct, index) => ({
        id: index + 1,
        description: proposalStruct.description,
        amount: proposalStruct.amount,
        minRequiredVote: proposalStruct.minVotesToPass,
        votecount: proposalStruct.voteCount,
        deadline: proposalStruct.votingDeadline,
        executed: proposalStruct.executed,
      }));

      setProposals(data);
    } catch (error) {
      console.log("error fetching proposals: ", error);
    }
  }, [multicallAbi, readOnlyProposalContract, readOnlyProvider]);

  const handleProposalCreated = useCallback((event) => {
    const [id, description, amount, minVotesToPass, deadline] = event;
    setProposals((prevProposals) => [
      ...prevProposals,
      {
        id: id.toNumber(),
        description,
        amount: amount.toString(),
        minRequiredVote: minVotesToPass.toNumber(),
        voteCount: 0,
        deadline: deadline.toNumber(),
        executed: false,
      },
    ]);
  }, []);

  const handleVoted = useCallback((event) => {
    const [proposalId] = event;
    setProposals((prevProposals) =>
      prevProposals.map((proposal) =>
        proposal.id === proposalId.toNumber()
          ? {
              ...proposal,
              voteCount: proposal.voteCount + 1,
            }
          : proposal
      )
    );
  }, []);

  useEffect(() => {
    fetchProposals();
    fetchBalance();

    if (readOnlyProposalContract) {
      readOnlyProposalContract.on("ProposalCreated", handleProposalCreated);
      readOnlyProposalContract.on("Voted", handleVoted);
    }

    return () => {
      if (readOnlyProposalContract) {
        readOnlyProposalContract.off("ProposalCreated", handleProposalCreated);
        readOnlyProposalContract.off("Voted", handleVoted);
      }
    };
  }, [
    handleProposalCreated,
    handleVoted,
    readOnlyProposalContract,
    fetchProposals,
  ]);

  return (
    <Layout>
      <Box className="flex justify-between p-4">
        <CreateProposalModal />
        <h2>Contract Balance: {contractBalance} ETH</h2>
      </Box>
      <Proposals proposals={proposals} />
    </Layout>
  );
}

export default App;
