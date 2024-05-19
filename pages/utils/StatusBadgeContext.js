import React, { createContext, useContext } from "react";

// Create a context
const StatusBadgeContext = createContext();

// Custom hook to use the context
export const useStatusBadge = () => {
    return useContext(StatusBadgeContext);
};

// Provider component to wrap your application
export const StatusBadgeProvider = ({ children }) => {
    // Function to determine badge color based on status
    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return <span className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">Pending</span>;
            case "approved":
                return <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Approved</span>;
            case "rejected":
                return <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Rejected</span>;
            case "completed":
                return <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Completed</span>;
            default:
                return <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">{status}</span>;
        }
    };

    // Provide the function to the children
    return (
        <StatusBadgeContext.Provider value={{ getStatusBadge }}>
            {children}
        </StatusBadgeContext.Provider>
    );
};
