import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Download, Upload } from "lucide-react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useLocation, useNavigate } from "react-router-dom";
import { ORDER_DATA } from "../../data/orderData";

const OrdersTable = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const query = new URLSearchParams(location.search);
    const [searchTerm, setSearchTerm] = useState(query.get("q") || "");
    const [currentPage, setCurrentPage] = useState(
        parseInt(query.get("p")) || 1
    );
    const [itemsPerPage, setItemsPerPage] = useState(
        parseInt(query.get("s")) || 5
    );
    const [dateFrom, setDateFrom] = useState(query.get("from") || "");
    const [dateTo, setDateTo] = useState(query.get("to") || "");
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Sorting state: key is column, direction is 'asc' or 'desc'
    const [sortConfig, setSortConfig] = useState({
        key: "id",
        direction: "asc",
    });

    // Update URL whenever filters/sorting/pagination change
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("q", searchTerm);
        if (currentPage > 1) params.set("p", currentPage.toString());
        if (itemsPerPage !== 5) params.set("s", itemsPerPage.toString());
        if (dateFrom) params.set("from", dateFrom);
        if (dateTo) params.set("to", dateTo);
        if (sortConfig.key) params.set("sort", sortConfig.key);
        if (sortConfig.direction) params.set("dir", sortConfig.direction);
        navigate({ search: params.toString() }, { replace: true });
    }, [
        searchTerm,
        currentPage,
        itemsPerPage,
        dateFrom,
        dateTo,
        sortConfig,
        navigate,
    ]);

    // Parse order date (YYYY-MM-DD)
    const dateInRange = (order) => {
        if (dateFrom && order.date < dateFrom) return false;
        if (dateTo && order.date > dateTo) return false;
        return true;
    };

    // Handle sorting header click
    const handleSort = (key) => {
        setCurrentPage(1);
        setSortConfig((prev) => {
            if (prev.key === key) {
                // Toggle direction
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    // Filter orders by search & date range
    const filteredOrders = ORDER_DATA.filter((o) =>
        (o.id + o.customer).toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(dateInRange);

    // Sort filteredOrders based on sortConfig, memoized for performance
    const sortedOrders = useMemo(() => {
        const sorted = [...filteredOrders];
        sorted.sort((a, b) => {
            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];

            // Number sorting
            if (typeof aVal === "number" && typeof bVal === "number") {
                return sortConfig.direction === "asc"
                    ? aVal - bVal
                    : bVal - aVal;
            }

            // Date sorting (string to Date)
            if (sortConfig.key === "date") {
                const dateA = new Date(aVal);
                const dateB = new Date(bVal);
                return sortConfig.direction === "asc"
                    ? dateA - dateB
                    : dateB - dateA;
            }

            // String sorting (case insensitive)
            aVal = aVal.toString().toLowerCase();
            bVal = bVal.toString().toLowerCase();
            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredOrders, sortConfig]);

    // Pagination calculation on sortedOrders
    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentOrders = sortedOrders.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // CSV export
    const exportCSV = () => {
        const headers = ["Order ID", "Customer", "Total", "Status", "Date"];
        const rows = sortedOrders.map((o) => [
            o.id,
            o.customer,
            o.total,
            o.status,
            o.date,
        ]);
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        const output = XLSX.write(wb, { bookType: "csv", type: "array" });
        saveAs(new Blob([output]), "orders_export.csv");
    };

    // CSV import
    const importCSV = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const wb = XLSX.read(evt.target.result, { type: "array" });
            const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
                header: 1,
            });
            console.log("Imported:", data.slice(1));
            // TODO: integrate imported data if needed
        };
        reader.readAsArrayBuffer(file);
        e.target.value = "";
    };

    // Helper to show sorting arrow
    const getSortArrow = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? "▲" : "▼";
    };

    return (
        <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            {/* Top Controls */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={exportCSV}
                        className="px-2 py-2 bg-green-600 hover:bg-green-500 text-white rounded flex items-center text-sm"
                    >
                        <Download size={14} className="mr-1 text-sm" /> Export
                        CSV
                    </button>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="px-2 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded flex items-center text-sm"
                    >
                        <Upload size={14} className="mr-1" /> Import CSV
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        hidden
                        onChange={importCSV}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto flex-wrap">
                    <div className="relative flex-1 w-44 ">
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-1 py-2 focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <Search
                            className="absolute left-3 top-3 text-gray-400"
                            size={16}
                        />
                    </div>

                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => {
                            setDateFrom(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-gray-700 text-white rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => {
                            setDateTo(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-gray-700 text-white rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(parseInt(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="bg-gray-700 text-white rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                        {[5, 10, 20].map((n) => (
                            <option key={n} value={n}>
                                {n} / page
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            {[
                                { label: "ID", key: "id" },
                                { label: "Customer", key: "customer" },
                                { label: "Total", key: "total" },
                                { label: "Status", key: "status" },
                                { label: "Date", key: "date" },
                                { label: "Actions", key: null },
                            ].map(({ label, key }) => (
                                <th
                                    key={label}
                                    className={`px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider ${
                                        key ? "cursor-pointer select-none" : ""
                                    }`}
                                    onClick={() => key && handleSort(key)}
                                >
                                    <div className="flex items-center gap-1">
                                        {label}
                                        {key && (
                                            <span className="text-gray-300 text-sm">
                                                {getSortArrow(key)}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {currentOrders.map((o) => (
                            <tr key={o.id}>
                                <td className="px-6 py-4 text-gray-100 text-sm">
                                    {o.id}
                                </td>
                                <td className="px-6 py-4 text-gray-100 text-sm">
                                    {o.customer}
                                </td>
                                <td className="px-6 py-4 text-gray-100 text-sm">
                                    ${o.total.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span
                                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                                            o.status === "Delivered"
                                                ? "bg-green-100 text-green-800"
                                                : o.status === "Processing"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : o.status === "Shipped"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {o.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-300 text-sm">
                                    {o.date}
                                </td>
                                <td className="px-6 py-4 text-gray-300 text-sm">
                                    <button
                                        className="text-indigo-400 hover:text-indigo-300"
                                        onClick={() => setSelectedOrder(o)}
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center gap-4">
                <p className="text-sm text-gray-400">
                    Showing {startIndex + 1}–
                    {Math.min(startIndex + itemsPerPage, sortedOrders.length)}{" "}
                    of {sortedOrders.length}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (p) => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`px-3 py-1 text-sm rounded ${
                                    p === currentPage
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-700 text-white hover:bg-gray-600"
                                }`}
                            >
                                {p}
                            </button>
                        )
                    )}
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-bold text-white mb-2">
                            Order Details
                        </h3>
                        {Object.entries(selectedOrder).map(([k, v]) => (
                            <p key={k} className="text-gray-300">
                                <strong>{k}:</strong> {v}
                            </p>
                        ))}
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="mt-4 px-4 py-2 bg-indigo-600 rounded text-white hover:bg-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default OrdersTable;
