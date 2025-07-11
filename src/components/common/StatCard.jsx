import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StatCard = ({ name, icon: Icon, color, value, redirect }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            className={`bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 ${
                redirect ? "cursor-pointer" : ""
            }`}
            aria-label={`${name} statistic`}
            whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => {
                if (redirect) {
                    navigate(`/${redirect}`);
                }
            }}
        >
            <div className="px-4 py-5 sm:p-6">
                <span className="flex items-center text-sm font-medium text-gray-400 ">
                    <Icon size={20} className="mr-2" style={{ color }} />
                    {name}
                </span>
                <p className="mt-1 text-3xl font-semibold text-gray-100">
                    {value}
                </p>
            </div>
        </motion.div>
    );
};

export default StatCard;
