import { motion } from "framer-motion";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { PRODUCT_DATA } from "../../data/productData";

const SalesTrendChart = () => {
    // Aggregate total sales by category dynamically
    const salesByCategory = PRODUCT_DATA.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + product.sales;
        return acc;
    }, {});

    // Convert to array for recharts
    const data = Object.entries(salesByCategory).map(([category, sales]) => ({
        category,
        sales,
    }));

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Sales by Category
            </h2>

            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="category" stroke="#374151" />
                        <YAxis stroke="#9CA3AF" />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.8)",
                                borderColor: "#4B5563",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />

                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#8B5CF6"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default SalesTrendChart;
