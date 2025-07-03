import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ACTIVITY_DATA as STATIC_DATA } from "../../data/usersData";

export default function UserActivityHeatmap() {
    const [data, setData] = useState(STATIC_DATA);
    const [chartKey, setChartKey] = useState(0); // for forcing BarChart remount

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) =>
                prev.map((day) => {
                    const updated = {};
                    Object.keys(day).forEach((key) => {
                        updated[key] =
                            key === "name"
                                ? day[key]
                                : Math.floor(
                                      day[key] * (0.9 + Math.random() * 0.2)
                                  );
                    });
                    return updated;
                })
            );
            setChartKey((prev) => prev + 1); // increment key to remount BarChart
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const timeSlots = ["0-4", "4-8", "8-12", "12-16", "16-20", "20-24"];
    const COLORS = [
        "#6366F1",
        "#8B5CF6",
        "#EC4899",
        "#10B981",
        "#F59E0B",
        "#3B82F6",
    ];

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
                User Activity Heatmap
            </h2>
            <div className="h-80 w-full">
                <ResponsiveContainer>
                    <BarChart key={chartKey} data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31,41,55,0.8)",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                        {timeSlots.map((key, i) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                stackId="a"
                                fill={COLORS[i]}
                                isAnimationActive={true}
                                animationDuration={900}
                                animationEasing="ease-out"
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
