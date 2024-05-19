// ButtonColorContext.js
import React, { createContext, useContext } from "react";

// Create a context
const ButtonColorContext = createContext();

// Custom hook to use the context
export const useButtonColor = () => {
    return useContext(ButtonColorContext);
};

// Provider component to wrap your application
export const ButtonColorProvider = ({ children }) => {
    // Function to determine button color based on button name
    const getButtonColor = (buttonName) => {
        switch (buttonName.toLowerCase()) {
            case "edit":
                return "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 dark:text-black";
            case "delete":
                return "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"; // Red background for Delete button
            case "view":
                return "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"; // Red background for Delete button

            // Add more cases for other button names if needed
            default:
                return "bg-gray-500"; // Default background color for other buttons
        }
    };

    // Provide the function to the children
    return (
        <ButtonColorContext.Provider value={{ getButtonColor }}>
            {children}
        </ButtonColorContext.Provider>
    );
};
