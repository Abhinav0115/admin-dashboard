import Header from "../components/common/Header";
import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";

const AnalyticsPage = () => (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen">
        <Header title="Analytics Dashboard" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-8">
            <OverviewCards />

            <RevenueChart />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                <ChannelPerformance />
                <ProductPerformance />
                <UserRetention />
                <CustomerSegmentation />
            </div>

            <AIPoweredInsights />
        </main>
    </div>
);

export default AnalyticsPage;
