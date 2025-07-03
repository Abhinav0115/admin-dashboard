import { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const availableAccounts = [
    {
        id: "linkedin",
        name: "LinkedIn",
        icon: <FaLinkedin className="w-5 h-5 text-blue-500" />,
    },
    {
        id: "github",
        name: "GitHub",
        icon: <FaGithub className="w-5 h-5 text-white" />,
    },
];

const AddAccountModal = ({ onAdd, onClose, existingIds }) => {
    const [selected, setSelected] = useState("");

    const handleAdd = () => {
        const account = availableAccounts.find((a) => a.id === selected);
        if (!account) return;

        onAdd({
            id: Date.now(),
            name: account.name,
            icon: account.id,
            connected: true,
        });

        onClose();
    };

    const filteredOptions = availableAccounts.filter(
        (account) => !existingIds.includes(account.id)
    );

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm border border-gray-600">
                <h2 className="text-lg font-semibold text-white mb-4">
                    Add New Account
                </h2>
                <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white mb-4"
                >
                    <option value="">-- Select Account --</option>
                    {filteredOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAdd}
                        disabled={!selected}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                    >
                        Add
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default AddAccountModal;
