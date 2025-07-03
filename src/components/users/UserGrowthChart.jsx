import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { GROWTH_DATA } from "../../data/usersData";

export default function UserGrowthChart() {
    return (
        <motion.div
            className="..."
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
                User Growth
            </h2>
            <div className="h-[320px]">
                <ResponsiveContainer>
                    <LineChart data={GROWTH_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31,41,55,0.8)",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="users"
                            stroke="#8B5CF6"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
