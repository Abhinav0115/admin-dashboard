// src/data/usersData.js

export const USERS = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ["Admin", "User", "Editor"][i % 3],
    status: i % 4 === 0 ? "Inactive" : "Active",
}));

export const GROWTH_DATA = [
    { month: "Jan", users: 1000 },
    { month: "Feb", users: 1200 },
    { month: "Mar", users: 1150 },
    { month: "Apr", users: 1400 },
    { month: "May", users: 1600 },
    { month: "Jun", users: 1800 },
];

export const DEMOGRAPHICS_DATA = [
    { name: "18-24", value: 400 },
    { name: "25-34", value: 800 },
    { name: "35-44", value: 600 },
    { name: "45-54", value: 300 },
    { name: "55+", value: 200 },
];

export const ACTIVITY_DATA = [
    {
        name: "Mon",
        "0-4": 10,
        "4-8": 30,
        "8-12": 50,
        "12-16": 40,
        "16-20": 60,
        "20-24": 20,
    },
    {
        name: "Tue",
        "0-4": 15,
        "4-8": 35,
        "8-12": 55,
        "12-16": 45,
        "16-20": 65,
        "20-24": 25,
    },
    {
        name: "Wed",
        "0-4": 12,
        "4-8": 32,
        "8-12": 52,
        "12-16": 42,
        "16-20": 62,
        "20-24": 22,
    },
    {
        name: "Thu",
        "0-4": 18,
        "4-8": 38,
        "8-12": 58,
        "12-16": 48,
        "16-20": 68,
        "20-24": 28,
    },
    {
        name: "Fri",
        "0-4": 20,
        "4-8": 40,
        "8-12": 60,
        "12-16": 50,
        "16-20": 70,
        "20-24": 30,
    },
];
