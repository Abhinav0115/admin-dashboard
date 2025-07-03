import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import { USERS } from "../data/usersData";

const userStats = {
    totalUsers: USERS.length,
    newUsersToday: Math.floor(Math.random() * 100),
    activeUsers: USERS.filter((u) => u.status === "Active").length,
    churnRate: `${(
        (USERS.filter((u) => u.status === "Inactive").length / USERS.length) *
        100
    ).toFixed(1)}%`,
};

export default function UsersPage() {
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Users" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <StatCard
                        name="Total Users"
                        icon={UsersIcon}
                        value={userStats.totalUsers.toLocaleString()}
                        color="#6366F1"
                    />
                    <StatCard
                        name="New Users Today"
                        icon={UserPlus}
                        value={userStats.newUsersToday}
                        color="#10B981"
                    />
                    <StatCard
                        name="Active Users"
                        icon={UserCheck}
                        value={userStats.activeUsers.toLocaleString()}
                        color="#F59E0B"
                    />
                    <StatCard
                        name="Churn Rate"
                        icon={UserX}
                        value={userStats.churnRate}
                        color="#EF4444"
                    />
                </motion.div>

                <UsersTable />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <UserGrowthChart />
                    <UserActivityHeatmap />
                    <UserDemographicsChart />
                </div>
            </main>
        </div>
    );
}
