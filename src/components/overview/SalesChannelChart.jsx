import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];
const SALES_CHANNEL_DATA = [
    { name: "Website", value: 45600 },
    { name: "Mobile App", value: 38200 },
    { name: "Marketplace", value: 29800 },
    { name: "Social Media", value: 18700 },
];

const SalesChannelChart = () => {
    const [isBar, setIsBar] = useState(true);
    const [renderKey, setRenderKey] = useState(0);

    // Replay animation when chart type changes
    useEffect(() => {
        setRenderKey((prev) => prev + 1);
    }, [isBar]);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 70 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-100">
                    Sales by Channel
                </h2>
                <button
                    onClick={() => setIsBar((prev) => !prev)}
                    className="px-3 py-1 bg-indigo-600 rounded text-white text-sm hover:bg-indigo-500"
                >
                    {isBar ? "Show Pie" : "Show Bar"}
                </button>
            </div>

            <div className="h-80">
                <ResponsiveContainer>
                    {isBar ? (
                        <BarChart
                            key={renderKey}
                            data={SALES_CHANNEL_DATA}
                            barCategoryGap={20}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#4B5563"
                            />
                            <XAxis dataKey="name" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(31,41,55,0.8)",
                                    borderColor: "#4B5563",
                                }}
                                itemStyle={{ color: "#E5E7EB" }}
                            />
                            <Legend />
                            <Bar
                                dataKey="value"
                                isAnimationActive={true}
                                animationDuration={1000}
                                animationEasing="ease-out"
                                radius={[4, 4, 0, 0]}
                            >
                                {SALES_CHANNEL_DATA.map((entry, idx) => (
                                    <Cell
                                        key={`bar-cell-${idx}`}
                                        fill={COLORS[idx % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    ) : (
                        <PieChart key={renderKey}>
                            <Pie
                                data={SALES_CHANNEL_DATA}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius="80%"
                                innerRadius="40%"
                                isAnimationActive={true}
                                animationDuration={1000}
                                animationEasing="ease-out"
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {SALES_CHANNEL_DATA.map((entry, idx) => (
                                    <Cell
                                        key={`pie-cell-${idx}`}
                                        fill={COLORS[idx % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(31,41,55,0.8)",
                                    borderColor: "#4B5563",
                                }}
                                itemStyle={{ color: "#E5E7EB" }}
                            />
                            <Legend />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default SalesChannelChart;
