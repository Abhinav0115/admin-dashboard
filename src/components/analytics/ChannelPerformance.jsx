import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { channelPerformanceData as initialData } from "../../data/analyticsData";

const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088FE",
    "#00C49F",
];

const ChannelPerformance = () => {
    const [data, setData] = useState(initialData);

    // Simulate dynamic data update every 10s
    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) =>
                prev.map((item) => ({
                    ...item,
                    value: Math.floor(item.value * (0.9 + Math.random() * 0.2)), // ±10%
                }))
            );
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Channel Performance
            </h2>
            <div className="w-full h-[300px] sm:h-[400px]">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            isAnimationActive={true}
                            animationDuration={800}
                            animationEasing="ease-out"
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.9)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default ChannelPerformance;
