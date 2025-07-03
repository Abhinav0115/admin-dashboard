import { motion, AnimatePresence } from "framer-motion";
import { Edit, Search, Trash2, Download, Upload } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { PRODUCT_DATA } from "../../data/productData";

const PAGE_SIZES = [5, 10, 15];

const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
};

const ProductsTable = () => {
    const fileInputRef = useRef(null);
    const [products, setProducts] = useState(PRODUCT_DATA);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [sortConfig, setSortConfig] = useState({
        key: "name",
        direction: "asc",
    });
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredProducts = useMemo(() => {
        return products.filter(
            (p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts];
        if (sortConfig) {
            sorted.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                if (typeof aValue === "string") aValue = aValue.toLowerCase();
                if (typeof bValue === "string") bValue = bValue.toLowerCase();

                return sortConfig.direction === "asc"
                    ? aValue < bValue
                        ? -1
                        : aValue > bValue
                        ? 1
                        : 0
                    : aValue > bValue
                    ? -1
                    : aValue < bValue
                    ? 1
                    : 0;
            });
        }
        return sorted;
    }, [filteredProducts, sortConfig]);

    const totalPages = Math.ceil(sortedProducts.length / pageSize);

    const currentPageData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedProducts.slice(start, start + pageSize);
    }, [sortedProducts, currentPage, pageSize]);

    const requestSort = (key) => {
        const direction =
            sortConfig.key === key && sortConfig.direction === "asc"
                ? "desc"
                : "asc";
        setSortConfig({ key, direction });
    };

    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) return null;
        return sortConfig.direction === "asc" ? " ▲" : " ▼";
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setEditForm({ ...product });
    };

    const handleChange = (e, field) => {
        setEditForm({ ...editForm, [field]: e.target.value });
    };

    // Delete with confirm
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter((p) => p.id !== id));
        }
    };

    // CSV import/export
    const exportCSV = () => {
        const headers = ["id", "name", "category", "price", "stock", "sales"];
        const rows = products.map((p) => headers.map((h) => p[h]));
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        const blob = XLSX.write(wb, { bookType: "csv", type: "array" });
        saveAs(new Blob([blob]), "products.csv");
    };
    const importCSV = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const wb = XLSX.read(evt.target.result, { type: "array" });
            const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            setProducts(data.map((d, idx) => ({ id: d.id || idx + 1, ...d })));
        };
        reader.readAsArrayBuffer(file);
        e.target.value = "";
    };

    const saveEdit = () => {
        setProducts(
            products.map((p) =>
                p.id === editingId ? { ...editForm, id: p.id } : p
            )
        );
        setEditingId(null);
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            {/* Header and Search */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-100">
                    Product List
                </h2>
                <div className="flex items-center gap-4">
                    <button
                        onClick={exportCSV}
                        className="px-2 py-1 bg-green-600 hover:bg-green-500 text-white rounded flex items-center"
                    >
                        <Download /> Export CSV
                    </button>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded flex items-center"
                    >
                        <Upload /> Import CSV
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        hidden
                        onChange={importCSV}
                    />
                </div>
                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                    <Search
                        className="absolute left-3 top-2.5 text-gray-400"
                        size={18}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            {[
                                "name",
                                "category",
                                "price",
                                "stock",
                                "sales",
                            ].map((key) => (
                                <th
                                    key={key}
                                    onClick={() => requestSort(key)}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase cursor-pointer"
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                    <SortIcon columnKey={key} />
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        <AnimatePresence initial={false}>
                            {currentPageData.length === 0 ? (
                                <motion.tr
                                    key="no-data"
                                    variants={fadeVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <td
                                        colSpan={6}
                                        className="text-center py-4 text-gray-400"
                                    >
                                        No products found.
                                    </td>
                                </motion.tr>
                            ) : (
                                currentPageData.map((p) => (
                                    <motion.tr
                                        key={p.id}
                                        layout
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={fadeVariants}
                                        transition={{ duration: 0.2 }}
                                        className="hover:bg-gray-700"
                                    >
                                        {editingId === p.id ? (
                                            [
                                                "name",
                                                "category",
                                                "price",
                                                "stock",
                                                "sales",
                                            ].map((field) => (
                                                <td
                                                    key={field}
                                                    className="px-4 py-2"
                                                >
                                                    <motion.input
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        type={
                                                            [
                                                                "price",
                                                                "stock",
                                                                "sales",
                                                            ].includes(field)
                                                                ? "number"
                                                                : "text"
                                                        }
                                                        value={editForm[field]}
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e,
                                                                field
                                                            )
                                                        }
                                                        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                                                    />
                                                </td>
                                            ))
                                        ) : (
                                            <>
                                                <td className="px-4 py-2 text-white">
                                                    {p.name}
                                                </td>
                                                <td className="px-4 py-2 text-white">
                                                    {p.category}
                                                </td>
                                                <td className="px-4 py-2 text-white">
                                                    $
                                                    {Number(p.price).toFixed(2)}
                                                </td>
                                                <td className="px-4 py-2 text-white">
                                                    {p.stock}
                                                </td>
                                                <td className="px-4 py-2 text-white">
                                                    {p.sales}
                                                </td>
                                            </>
                                        )}
                                        <td className="px-4 py-2 flex gap-2">
                                            {editingId === p.id ? (
                                                <>
                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        onClick={saveEdit}
                                                        className="text-green-400"
                                                    >
                                                        Save
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        onClick={() =>
                                                            setEditingId(null)
                                                        }
                                                        className="text-yellow-400"
                                                    >
                                                        Cancel
                                                    </motion.button>
                                                </>
                                            ) : (
                                                <>
                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        onClick={() =>
                                                            handleEdit(p)
                                                        }
                                                        className="text-indigo-400"
                                                    >
                                                        <Edit size={18} />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        onClick={() =>
                                                            handleDelete(p.id)
                                                        }
                                                        className="text-red-400"
                                                    >
                                                        <Trash2 size={18} />
                                                    </motion.button>
                                                </>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-gray-300 text-sm">
                <div>
                    Showing {(currentPage - 1) * pageSize + 1} -{" "}
                    {Math.min(currentPage * pageSize, sortedProducts.length)} of{" "}
                    {sortedProducts.length}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, idx) => {
                        const page = idx + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === page
                                        ? "bg-indigo-600 font-semibold"
                                        : "bg-gray-700 hover:bg-gray-600"
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="pageSize">Rows per page:</label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="bg-gray-700 text-white rounded px-2 py-1"
                    >
                        {PAGE_SIZES.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductsTable;
