import { useState } from "react";
import SettingSection from "./SettingSection";
import { HelpCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaFacebookF, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import AddAccountModal from "./AddAccountModal";

const listVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const ConnectedAccounts = () => {
    const [showModal, setShowModal] = useState(false);
    const [connectedAccounts, setConnectedAccounts] = useState([
        { id: 1, name: "Google", connected: true, icon: "google" },
        { id: 2, name: "Facebook", connected: false, icon: "facebook" },
        { id: 3, name: "Twitter", connected: false, icon: "twitterX" },
    ]);

    const handleAddAccount = (newAccount) => {
        setConnectedAccounts([...connectedAccounts, newAccount]);
    };

    const renderIcon = (iconName) => {
        switch (iconName) {
            case "google":
                return <FaGoogle className="w-6 h-6 text-red-600" />;
            case "facebook":
                return <FaFacebookF className="w-6 h-6 text-blue-600" />;
            case "twitterX":
                return <FaXTwitter className="w-6 h-6 text-sky-400" />;
            case "linkedin":
                return <FaLinkedin className="w-6 h-6 text-blue-500" />;
            case "github":
                return <FaGithub className="w-6 h-6 text-white" />;
            default:
                return null;
        }
    };

    return (
        <SettingSection icon={HelpCircle} title="Connected Accounts">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={listVariants}
            >
                {connectedAccounts.map((account) => (
                    <motion.div
                        key={account.id}
                        variants={itemVariants}
                        className="flex items-center justify-between py-3"
                    >
                        <div className="flex items-center gap-3">
                            {renderIcon(account.icon)}
                            <span className="text-gray-300">
                                {account.name}
                            </span>
                        </div>
                        <button
                            className={`px-3 py-1 rounded font-semibold transition duration-200 ${
                                account.connected
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-600 hover:bg-gray-700"
                            }`}
                            onClick={() => {
                                setConnectedAccounts((prev) =>
                                    prev.map((acc) =>
                                        acc.id === account.id
                                            ? {
                                                  ...acc,
                                                  connected: !acc.connected,
                                              }
                                            : acc
                                    )
                                );
                            }}
                        >
                            {account.connected ? "Connected" : "Connect"}
                        </button>
                    </motion.div>
                ))}
            </motion.div>

            <motion.button
                className="mt-4 flex items-center text-indigo-400 hover:text-indigo-300 transition duration-200 font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
            >
                <Plus size={18} className="mr-2" /> Add Account
            </motion.button>

            <AnimatePresence>
                {showModal && (
                    <AddAccountModal
                        onAdd={handleAddAccount}
                        onClose={() => setShowModal(false)}
                        existingIds={connectedAccounts.map((a) => a.icon)}
                    />
                )}
            </AnimatePresence>
        </SettingSection>
    );
};

export default ConnectedAccounts;
