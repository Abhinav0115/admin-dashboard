import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { revenueData, revenueRanges } from "../../data/analyticsData";

const RevenueChart = () => {
    const [range, setRange] = useState("This Month");
    const chartData = useMemo(() => revenueData[range], [range]);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                <h2 className="text-xl font-semibold text-gray-100">
                    Revenue vs Target
                </h2>
                <select
                    className="bg-gray-700 text-white rounded-md px-3 py-1 w-auto"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                >
                    {revenueRanges.map((r) => (
                        <option key={r}>{r}</option>
                    ))}
                </select>
            </div>
            <div className="h-80 w-full">
                <ResponsiveContainer>
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="period" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                background: "rgba(31,41,55,0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8B5CF6"
                            fill="#8B5CF6"
                            fillOpacity={0.3}
                        />
                        <Area
                            type="monotone"
                            dataKey="target"
                            stroke="#10B981"
                            fill="#10B981"
                            fillOpacity={0.2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default RevenueChart;
