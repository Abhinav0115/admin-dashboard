import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { motion } from "framer-motion";
import { DEMOGRAPHICS_DATA } from "../../data/usersData";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

export default function UserDemographicsChart() {
    return (
        <motion.div
            className="lg:col-span-2 ..."
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
                User Demographics
            </h2>
            <div className="h-80">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={DEMOGRAPHICS_DATA}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={(e) =>
                                `${e.name} ${(e.percent * 100).toFixed(0)}%`
                            }
                        >
                            {DEMOGRAPHICS_DATA.map((_, i) => (
                                <Cell
                                    key={i}
                                    fill={COLORS[i % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31,41,55,0.8)",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
