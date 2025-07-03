import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { dailySalesData as STATIC_DAILY_SALES_DATA } from "../../data/salesData";

const DailySalesTrend = () => {
    const [data, setData] = useState(STATIC_DAILY_SALES_DATA);
    const [chartKey, setChartKey] = useState(0);

    // Example: simulate data updates every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) =>
                prev.map((item) => ({
                    ...item,
                    sales: Math.floor(item.sales * (0.9 + Math.random() * 0.2)),
                }))
            );
            setChartKey((prev) => prev + 1); // bump key to replay animation
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-60 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Daily Sales Trend
            </h2>

            <div className="w-full h-72">
                <ResponsiveContainer>
                    <BarChart
                        key={chartKey} // key forces remount and animation replay
                        data={data}
                        margin={{ top: 10, bottom: 10 }}
                        barCategoryGap={5}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Bar
                            dataKey="sales"
                            fill="#10B981"
                            radius={[4, 4, 0, 0]}
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

export default DailySalesTrend;
