import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState, useMemo } from "react";

import {
    weeklySalesData,
    monthlySalesData,
    quarterlySalesData,
    yearlySalesData,
} from "../../data/salesData";

const timeRanges = ["Daily", "Monthly", "Quarterly", "Yearly"];

const SalesOverviewChart = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("Monthly");

    const { data, dataKey } = useMemo(() => {
        switch (selectedTimeRange) {
            case "Daily":
                return { data: weeklySalesData, dataKey: "day" };
            case "Monthly":
                return { data: monthlySalesData, dataKey: "month" };
            case "Quarterly":
                return { data: quarterlySalesData, dataKey: "quarter" };
            case "Yearly":
                return { data: yearlySalesData, dataKey: "year" };
            default:
                return { data: monthlySalesData, dataKey: "month" };
        }
    }, [selectedTimeRange]);

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-60 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-100">
                    Sales Overview
                </h2>

                <select
                    aria-label="Select time range for sales overview"
                    className="bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                >
                    {timeRanges.map((range) => (
                        <option key={range} value={range}>
                            {range}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-full h-80">
                <ResponsiveContainer>
                    <AreaChart data={data} margin={{ top: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey={dataKey} stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#8B5CF6"
                            fill="#8B5CF6"
                            fillOpacity={0.3}
                            activeDot={{ r: 6 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default SalesOverviewChart;
