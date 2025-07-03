// src/components/users/UsersTable.jsx
import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2, Download, Upload } from "lucide-react";
import { USERS as initialData } from "../../data/usersData";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const PAGE_SIZES = [5, 10, 20];

export default function UsersTable() {
    const fileInputRef = useRef();
    const [users, setUsers] = useState(initialData);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [sortConfig, setSortConfig] = useState({
        key: "name",
        direction: "asc",
    });
    const [editingRow, setEditingRow] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        role: "",
        status: "",
    });

    // CSV Export
    const exportCSV = () => {
        const sheet = XLSX.utils.json_to_sheet(users);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, sheet, "Users");
        const wbout = XLSX.write(wb, { bookType: "csv", type: "array" });
        saveAs(new Blob([wbout]), "users_export.csv");
    };

    // CSV Import
    const importCSV = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const wb = XLSX.read(evt.target.result, { type: "array" });
            const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            setUsers(data);
            setPage(1);
        };
        reader.readAsArrayBuffer(file);
        e.target.value = "";
    };

    // Filtering
    const filtered = useMemo(() => {
        return users.filter(
            (u) =>
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, users]);

    // Sorting
    const sorted = useMemo(() => {
        const sortedArr = [...filtered].sort((a, b) => {
            const x = a[sortConfig.key].toString().toLowerCase();
            const y = b[sortConfig.key].toString().toLowerCase();
            return sortConfig.direction === "asc"
                ? x < y
                    ? -1
                    : x > y
                    ? 1
                    : 0
                : x > y
                ? -1
                : x < y
                ? 1
                : 0;
        });
        return sortedArr;
    }, [filtered, sortConfig]);

    const totalPages = Math.ceil(sorted.length / pageSize);
    const pageData = useMemo(
        () => sorted.slice((page - 1) * pageSize, page * pageSize),
        [sorted, page, pageSize]
    );

    // Sorting click handler
    const handleSort = (key) => {
        setSortConfig((current) => ({
            key,
            direction:
                current.key === key && current.direction === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    // Begin editing a row
    const startEdit = (u) => {
        setEditingRow(u.id);
        setEditForm({
            name: u.name,
            email: u.email,
            role: u.role,
            status: u.status,
        });
    };

    // Save changes
    const saveEdit = (id) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === id ? { ...u, ...editForm } : u))
        );
        setEditingRow(null);
    };

    return (
        <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                <h2 className="text-xl font-semibold text-gray-100">Users</h2>
                <div className="flex gap-2">
                    <button
                        onClick={exportCSV}
                        className="px-2 py-1 bg-green-600 hover:bg-green-500 text-white rounded flex items-center"
                    >
                        <Download size={16} className="mr-1" /> Export CSV
                    </button>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded flex items-center"
                    >
                        <Upload size={16} className="mr-1" /> Import CSV
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
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full sm:w-52 focus:ring-2 focus:ring-blue-500"
                    />
                    <Search
                        className="absolute left-3 top-2.5 text-gray-400"
                        size={18}
                    />
                </div>
            </div>

            <table className="min-w-full divide-y divide-gray-700">
                <thead>
                    <tr>
                        {["name", "email", "role", "status"].map((key) => (
                            <th
                                key={key}
                                onClick={() => handleSort(key)}
                                className="px-6 py-3 text-xs font-medium text-gray-400 uppercase cursor-pointer"
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                {sortConfig.key === key
                                    ? sortConfig.direction === "asc"
                                        ? " ▲"
                                        : " ▼"
                                    : ""}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {pageData.map((u) => (
                        <tr key={u.id} className="text-gray-200">
                            {["name", "email", "role", "status"].map(
                                (field) => (
                                    <td key={field} className="px-6 py-3">
                                        {editingRow === u.id ? (
                                            <input
                                                className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                                                value={editForm[field]}
                                                onChange={(e) =>
                                                    setEditForm((f) => ({
                                                        ...f,
                                                        [field]: e.target.value,
                                                    }))
                                                }
                                            />
                                        ) : field === "status" ? (
                                            <span
                                                className={`px-2 rounded-full text-xs ${
                                                    u.status === "Active"
                                                        ? "bg-green-800 text-green-100"
                                                        : "bg-red-800 text-red-100"
                                                }`}
                                            >
                                                {u.status}
                                            </span>
                                        ) : (
                                            u[field]
                                        )}
                                    </td>
                                )
                            )}
                            <td className="px-6 py-3 whitespace-nowrap">
                                {editingRow === u.id ? (
                                    <button
                                        onClick={() => saveEdit(u.id)}
                                        className="px-2 py-1 bg-blue-600 rounded text-sm"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <motion.button
                                        whileHover={{
                                            scale: 1.1,
                                        }}
                                        onClick={() => startEdit(u)}
                                        className="text-indigo-400"
                                    >
                                        <Edit size={18} />
                                    </motion.button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2 text-gray-300 text-sm">
                <div>
                    Showing {(page - 1) * pageSize + 1}–
                    {Math.min(page * pageSize, sorted.length)} of{" "}
                    {sorted.length}
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setPage(idx + 1)}
                            className={`px-2 py-1 rounded ${
                                page === idx + 1
                                    ? "bg-indigo-600"
                                    : "bg-gray-700 hover:bg-gray-600"
                            }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        onClick={() =>
                            setPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={page === totalPages}
                        className="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="pageSize">Rows:</label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(+e.target.value);
                            setPage(1);
                        }}
                        className="bg-gray-700 text-white rounded px-2 py-1"
                    >
                        {PAGE_SIZES.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </motion.div>
    );
}
