import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    return (
        <SettingSection icon={User} title="Profile">
            <motion.div
                className="flex flex-col sm:flex-row items-center mb-6 gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src="/assets/user.jpeg"
                    alt="Profile"
                    className="rounded-full w-20 h-20 object-cover shadow-md"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-100">
                        John Doe
                    </h3>
                    <p className="text-gray-400">johndoe11@gmail.com</p>
                </div>
            </motion.div>

            <motion.button
                onClick={() => navigate("/settings/edit-profile")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded w-full sm:w-auto transition duration-200 shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Edit Profile
            </motion.button>
        </SettingSection>
    );
};

export default Profile;
