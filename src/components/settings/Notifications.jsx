import { useState } from "react";
import SettingSection from "./SettingSection";
import { Bell } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import { motion } from "framer-motion";

const toggleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.15, duration: 0.3 },
    }),
};

const Notifications = () => {
    const [notifications, setNotifications] = useState({
        push: true,
        email: false,
        sms: true,
    });

    const toggles = [
        { label: "Push Notifications", key: "push" },
        { label: "Email Notifications", key: "email" },
        { label: "SMS Notifications", key: "sms" },
    ];

    return (
        <SettingSection icon={Bell} title="Notifications">
            {toggles.map(({ label, key }, i) => (
                <motion.div
                    key={key}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={toggleVariants}
                >
                    <ToggleSwitch
                        label={label}
                        isOn={notifications[key]}
                        onToggle={() =>
                            setNotifications({
                                ...notifications,
                                [key]: !notifications[key],
                            })
                        }
                    />
                </motion.div>
            ))}
        </SettingSection>
    );
};

export default Notifications;
