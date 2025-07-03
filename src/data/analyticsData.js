import { DollarSign, Users, ShoppingBag, Eye } from "lucide-react";

export const overviewMetrics = [
    { name: "Revenue", value: "$1,234,567", change: 12.5, icon: DollarSign },
    { name: "Users", value: "45,678", change: 8.3, icon: Users },
    { name: "Orders", value: "9,876", change: -3.2, icon: ShoppingBag },
    { name: "Page Views", value: "1,234,567", change: 15.7, icon: Eye },
];

export const productPerformanceData = [
    { name: "Product A", sales: 4000, revenue: 2400, profit: 2400 },
    { name: "Product B", sales: 3000, revenue: 1398, profit: 2210 },
    { name: "Product C", sales: 2000, revenue: 9800, profit: 2290 },
    { name: "Product D", sales: 2780, revenue: 3908, profit: 2000 },
    { name: "Product E", sales: 1890, revenue: 4800, profit: 2181 },
];

export const channelPerformanceData = [
    { name: "Organic Search", value: 4000 },
    { name: "Paid Search", value: 3000 },
    { name: "Direct", value: 2000 },
    { name: "Social Media", value: 2780 },
    { name: "Referral", value: 1890 },
    { name: "Email", value: 2390 },
];

export const revenueRanges = ["This Month", "This Quarter", "This Year"];

export const revenueData = {
    "This Month": [
        { period: "Week 1", revenue: 1200, target: 1100 },
        { period: "Week 2", revenue: 1350, target: 1400 },
        { period: "Week 3", revenue: 1500, target: 1400 },
        { period: "Week 4", revenue: 1600, target: 1500 },
    ],
    "This Quarter": [
        { period: "Jan", revenue: 4200, target: 3800 },
        { period: "Feb", revenue: 3000, target: 3200 },
        { period: "Mar", revenue: 5000, target: 4500 },
    ],
    "This Year": [
        { period: "Q1", revenue: 12000, target: 13000 },
        { period: "Q2", revenue: 15000, target: 14000 },
        { period: "Q3", revenue: 18000, target: 16000 },
        { period: "Q4", revenue: 21000, target: 18000 },
    ],
};

export const customerSegmentationData = [
    { subject: "Engagement", A: 120, B: 110, fullMark: 150 },
    { subject: "Loyalty", A: 98, B: 130, fullMark: 150 },
    { subject: "Satisfaction", A: 86, B: 130, fullMark: 150 },
    { subject: "Spend", A: 99, B: 100, fullMark: 150 },
    { subject: "Frequency", A: 85, B: 90, fullMark: 150 },
    { subject: "Recency", A: 65, B: 85, fullMark: 150 },
];

export const userRetentionData = [
    { name: "Week 1", retention: 100 },
    { name: "Week 2", retention: 75 },
    { name: "Week 3", retention: 60 },
    { name: "Week 4", retention: 50 },
    { name: "Week 5", retention: 45 },
    { name: "Week 6", retention: 40 },
    { name: "Week 7", retention: 38 },
    { name: "Week 8", retention: 35 },
];

export const aiInsights = [
    {
        icon: "TrendingUp",
        color: "text-green-500",
        insight:
            "Revenue is up 15% compared to last month, driven primarily by a successful email campaign.",
    },
    {
        icon: "Users",
        color: "text-blue-500",
        insight:
            "Customer retention has improved by 8% following the launch of the new loyalty program.",
    },
    {
        icon: "ShoppingBag",
        color: "text-purple-500",
        insight:
            'Product category "Electronics" shows the highest growth potential based on recent market trends.',
    },
    {
        icon: "DollarSign",
        color: "text-yellow-500",
        insight:
            "Optimizing pricing strategy could potentially increase overall profit margins by 5-7%.",
    },
];
