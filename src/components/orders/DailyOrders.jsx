import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { ORDER_DATA } from "../../data/orderData";

const formatDateLabel = (dateString) => {
    const options = { month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
};

const DailyOrders = () => {
    // Aggregate orders count by date dynamically from orderData
    const dailyOrdersData = useMemo(() => {
        const counts = {};

        ORDER_DATA.forEach(({ date }) => {
            counts[date] = (counts[date] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([date, orders]) => ({ date, orders }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }, []);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            aria-label="Daily Orders Chart"
            role="region"
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Daily Orders
            </h2>

            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={dailyOrdersData}
                        margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey="date"
                            stroke="#9CA3AF"
                            tickFormatter={formatDateLabel}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            allowDecimals={false}
                            tick={{ fontSize: 12 }}
                            domain={["dataMin - 1", "dataMax + 1"]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                                fontSize: "14px",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                            labelFormatter={(label) =>
                                `Date: ${new Date(label).toLocaleDateString()}`
                            }
                        />
                        <Legend
                            wrapperStyle={{ color: "#9CA3AF", fontSize: 14 }}
                            verticalAlign="top"
                            height={36}
                        />
                        <Line
                            type="monotone"
                            dataKey="orders"
                            stroke="#8B5CF6"
                            strokeWidth={3}
                            dot={{ r: 5, strokeWidth: 2, fill: "#8B5CF6" }}
                            activeDot={{ r: 7 }}
                            animationDuration={1000}
                            animationEasing="ease-in-out"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default DailyOrders;
