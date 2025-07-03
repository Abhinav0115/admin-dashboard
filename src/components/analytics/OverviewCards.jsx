import { motion } from "framer-motion";
import {
    DollarSign,
    Users,
    ShoppingBag,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import { overviewMetrics } from "../../data/analyticsData";

// Animation variants
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100,
        },
    },
};

const OverviewCards = () => (
    <motion.div
        className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        {overviewMetrics.map((item, i) => (
            <motion.div
                key={item.name}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-lg rounded-xl p-6 flex flex-col justify-between border border-gray-700 transition-transform transform hover:scale-[1.02]"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-sm text-gray-400">{item.name}</h3>
                        <p className="text-2xl font-semibold text-gray-100">
                            {item.value}
                        </p>
                    </div>
                    <div
                        className={`p-3 rounded-full bg-opacity-20 ${
                            item.change >= 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        <item.icon
                            className={`${
                                item.change >= 0
                                    ? "text-green-400"
                                    : "text-red-400"
                            } w-6 h-6`}
                        />
                    </div>
                </div>

                <div
                    className={`flex items-center mt-4 text-sm ${
                        item.change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                >
                    {item.change >= 0 ? <ArrowUpRight /> : <ArrowDownRight />}
                    <span className="ml-1 font-medium">
                        {Math.abs(item.change)}%
                    </span>
                    <span className="ml-2 text-gray-400">vs last period</span>
                </div>
            </motion.div>
        ))}
    </motion.div>
);

export default OverviewCards;
