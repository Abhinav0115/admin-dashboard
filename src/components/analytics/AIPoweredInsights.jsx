import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";
import { aiInsights } from "../../data/analyticsData";

const iconMap = {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
};

const AIPoweredInsights = () => (
    <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
    >
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
            AI-Powered Insights
        </h2>
        <div className="space-y-4">
            {aiInsights.map((item, index) => {
                const IconComponent = iconMap[item.icon];
                return (
                    <div key={index} className="flex items-start space-x-3">
                        <div
                            className={`p-2 rounded-full bg-opacity-20 ${item.color}`}
                        >
                            <IconComponent
                                className={`w-6 h-6 ${item.color}`}
                            />
                        </div>
                        <p className="text-gray-300">{item.insight}</p>
                    </div>
                );
            })}
        </div>
    </motion.div>
);

export default AIPoweredInsights;
