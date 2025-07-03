import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "John Doe",
        email: "johndoe11@gmail.com",
        avatar: "/assets/user.jpeg",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile saved!");
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen">
            <Header title="Edit Profile" />
            <motion.main
                className="max-w-3xl mx-auto p-6 lg:p-8 bg-gray-800 rounded-xl shadow-lg mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center space-x-6">
                        <img
                            src={formData.avatar}
                            alt="Profile avatar"
                            className="w-24 h-24 rounded-full object-cover shadow-md"
                        />
                        <input
                            type="text"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            placeholder="Avatar URL"
                            className="flex-1 bg-gray-700 text-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-gray-300 mb-1 font-semibold"
                        >
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-700 text-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-300 mb-1 font-semibold"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-700 text-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex gap-6">
                        <motion.button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded shadow-md w-full transition duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Save Changes
                        </motion.button>
                        <motion.button
                            onClick={() => navigate("/settings")}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded shadow-md w-full transition duration-200"
                            whileTap={{ scale: 0.95 }}
                        >
                            Cancel
                        </motion.button>
                    </div>
                </form>
            </motion.main>
        </div>
    );
};

export default EditProfile;
