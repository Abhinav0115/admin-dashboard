import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./Pages/OverviewPage";
import ProductPage from "./Pages/ProductPage";
import UsersPage from "./Pages/UsersPage";
import SalesPage from "./Pages/SalesPage";
import OrdersPage from "./Pages/OrdersPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import SettingsPage from "./Pages/SettingsPage";
import EditProfile from "./components/settings/EditProfile";

function App() {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* BG */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>

            <Sidebar />

            <Routes>
                <Route path="/" element={<OverviewPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                    path="/settings/edit-profile"
                    element={<EditProfile />}
                />
            </Routes>
        </div>
    );
}

export default App;
