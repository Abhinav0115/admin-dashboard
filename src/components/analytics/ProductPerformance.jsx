import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { productPerformanceData as initialData } from "../../data/analyticsData";

const ProductPerformance = () => {
    const [data, setData] = useState(initialData);

    // Simulate data update after 5 seconds (optional)
    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) =>
                prev.map((item) => ({
                    ...item,
                    sales: Math.floor(item.sales * (0.9 + Math.random() * 0.2)), // ±10%
                    revenue: Math.floor(
                        item.revenue * (0.9 + Math.random() * 0.2)
                    ),
                    profit: Math.floor(
                        item.profit * (0.9 + Math.random() * 0.2)
                    ),
                }))
            );
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Product Performance
            </h2>
            <div className="w-full h-[300px] sm:h-[400px]">
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.9)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                        <Bar
                            dataKey="sales"
                            fill="#8B5CF6"
                            isAnimationActive={true}
                            animationDuration={800}
                            animationEasing="ease-out"
                        />
                        <Bar
                            dataKey="revenue"
                            fill="#10B981"
                            isAnimationActive={true}
                            animationDuration={800}
                            animationEasing="ease-out"
                        />
                        <Bar
                            dataKey="profit"
                            fill="#F59E0B"
                            isAnimationActive={true}
                            animationDuration={800}
                            animationEasing="ease-out"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default ProductPerformance;
