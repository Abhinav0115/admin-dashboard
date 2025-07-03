import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";
import { ORDER_DATA } from "../data/orderData";

const calculateOrderStats = (data) => {
    const totalOrders = data.length;
    const pendingOrders = data.filter((o) => o.status === "Pending").length;
    const completedOrders = data.filter((o) => o.status === "Delivered").length;
    const totalRevenue = `$${data
        .reduce((sum, order) => sum + order.total, 0)
        .toFixed(2)}`;
    return { totalOrders, pendingOrders, completedOrders, totalRevenue };
};

const OrdersPage = () => {
    const stats = calculateOrderStats(ORDER_DATA);

    return (
        <div className="flex-1 relative z-10 overflow-auto">
            <Header title={"Orders"} />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name="Total Orders"
                        icon={ShoppingBag}
                        value={stats.totalOrders}
                        color="#6366F1"
                    />
                    <StatCard
                        name="Pending Orders"
                        icon={Clock}
                        value={stats.pendingOrders}
                        color="#F59E0B"
                    />
                    <StatCard
                        name="Completed Orders"
                        icon={CheckCircle}
                        value={stats.completedOrders}
                        color="#10B981"
                    />
                    <StatCard
                        name="Total Revenue"
                        icon={DollarSign}
                        value={stats.totalRevenue}
                        color="#EF4444"
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <DailyOrders />
                    <OrderDistribution />
                </div>

                <OrdersTable />
            </main>
        </div>
    );
};

export default OrdersPage;
