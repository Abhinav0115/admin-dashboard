import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";
import { motion } from "framer-motion";
import ChangePasswordModal from "./ChangePasswordModal";

const Security = () => {
    const [twoFactor, setTwoFactor] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <SettingSection icon={Lock} title="Security">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <ToggleSwitch
                    label="Two-Factor Authentication"
                    isOn={twoFactor}
                    onToggle={() => setTwoFactor(!twoFactor)}
                />
            </motion.div>

            <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <motion.button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded shadow-md transition duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(true)}
                >
                    Change Password
                </motion.button>
            </motion.div>

            {showModal && (
                <ChangePasswordModal onClose={() => setShowModal(false)} />
            )}
        </SettingSection>
    );
};

export default Security;
