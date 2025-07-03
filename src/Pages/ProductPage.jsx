import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import SalesTrendChart from "../components/products/SalesTrendChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import ProductsTable from "../components/products/ProductsTable";

import { PRODUCT_DATA } from "../data/productData";

//TODO: Add edit and delete functionality to products

const ProductPage = () => {
    const totalProducts = PRODUCT_DATA.length;
    const topSelling = PRODUCT_DATA.reduce(
        (max, p) => (p.sales > max ? p.sales : max),
        0
    );
    const lowStockCount = PRODUCT_DATA.filter((p) => p.stock < 50).length;
    const totalRevenue = PRODUCT_DATA.reduce(
        (sum, p) => sum + p.sales * p.price,
        0
    );

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Products" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}

                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name="Total Products"
                        icon={Package}
                        value={totalProducts}
                        color="#6366F1"
                    />
                    <StatCard
                        name="Top Selling"
                        icon={TrendingUp}
                        value={topSelling}
                        color="#10B981"
                    />
                    <StatCard
                        name="Low Stock"
                        icon={AlertTriangle}
                        value={lowStockCount}
                        color="#F59E0B"
                    />
                    <StatCard
                        name="Total Revenue"
                        icon={DollarSign}
                        value={`$${totalRevenue.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`}
                        color="#EF4444"
                    />
                </motion.div>

                <ProductsTable />

                {/* CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <SalesTrendChart />
                    <CategoryDistributionChart />
                </div>
            </main>
        </div>
    );
};

export default ProductPage;
