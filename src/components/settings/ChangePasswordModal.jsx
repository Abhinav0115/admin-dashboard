import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const modal = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 40, opacity: 0 },
};

const ChangePasswordModal = ({ onClose }) => {
    const [form, setForm] = useState({
        current: "",
        new: "",
        confirm: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { current, new: newPassword, confirm } = form;

        if (!current || !newPassword || !confirm) {
            return setError("All fields are required.");
        }

        if (newPassword.length < 6) {
            return setError("New password must be at least 6 characters.");
        }

        if (newPassword !== confirm) {
            return setError("Passwords do not match.");
        }

        // TODO: Submit to backend or API
        console.log("Password changed successfully");
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={onClose}
            >
                <motion.div
                    className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-md relative z-10"
                    variants={modal}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-lg font-semibold text-white mb-4">
                        Change Password
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="password"
                            name="current"
                            placeholder="Current Password"
                            value={form.current}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                        />
                        <input
                            type="password"
                            name="new"
                            placeholder="New Password"
                            value={form.new}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                        />
                        <input
                            type="password"
                            name="confirm"
                            placeholder="Confirm New Password"
                            value={form.confirm}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                        />

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ChangePasswordModal;
