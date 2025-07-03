import { motion } from "framer-motion";
import Header from "../components/common/Header";
import ConnectedAccounts from "../components/settings/ConnectedAccounts";
import DangerZone from "../components/settings/DangerZone";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const SettingsPage = () => {
    return (
        <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
            <Header title="Settings" />
            <motion.main
                className="max-w-5xl mx-auto py-6 px-4 lg:px-8 space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Profile />
                <Notifications />
                <Security />
                <ConnectedAccounts />
                <DangerZone />
            </motion.main>
        </div>
    );
};

export default SettingsPage;
