import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircleIcon } from "@heroicons/react/16/solid";
import useCreateProposal from "../hooks/useCreateProposal";

const CreateProposalModal = () => {
  const handleCreateProposal = useCreateProposal();
  const [state, setState] = useState({
    description: "",
    recipient: "",
    amount: "",
    duration: "",
    minVote: 2,
  });

  const handleInputChange = (name, value) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateProposal(
      state.description,
      state.recipient,
      state.amount,
      state.duration,
      state.minVote
    );
  };

  const inputFields = [
    { name: "description", label: "Description", type: "text" },
    { name: "recipient", label: "Recipient", type: "text" },
    { name: "amount", label: "Amount", type: "number", step: "0.01" },
    { name: "duration", label: "Duration (in seconds)", type: "number" },
    { name: "minVote", label: "Min Required Votes", type: "number" },
  ];

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow transition duration-300">
          Create Proposal
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <Dialog.Title className="text-2xl font-bold mb-4">
            Create Proposal
          </Dialog.Title>
          <form onSubmit={handleSubmit}>
            {inputFields.map((field) => (
              <div key={field.name} className="mb-4">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  value={state[field.name]}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  step={field.step}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow transition duration-300 mt-4"
            >
              Create Proposal
            </button>
          </form>
          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateProposalModal;
