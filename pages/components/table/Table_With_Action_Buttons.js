import { useEffect, useState } from "react";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import { useStatusBadge } from "@/pages/utils/StatusBadgeContext";
import { useButtonColor } from "@/pages/utils/ButtonColorContext";

export default function Table_With_Action_Buttons(props) {
    const [tableRowData, setTableRowData] = useState([]);
    const { getStatusBadge } = useStatusBadge();
    const { getButtonColor } = useButtonColor();

    useEffect(() => {
        // Check if window object is defined (i.e., code is running in the browser)
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem("tableRowData");
            setTableRowData(storedData ? JSON.parse(storedData) : []);
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_API_ENDPOINT + props.endPoint,
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    withCredentials: true,
                }
            );
            const receivedData = response.data;
            setTableRowData(receivedData);
            if (typeof window !== "undefined") {
                localStorage.setItem("tableRowData", JSON.stringify(receivedData));
            }
        } catch (error) {
            console.error("Error fetching Data : ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [props.endPoint]);

    const navigate = (page) => {
        router.push(page);
    };

    const handleAction = (id, action) => {
        props.handleAction(id, action);
    };

    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {props.headings.map((heading, index) => (
                            <th key={index} className="px-6 py-3">
                                {heading}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tableRowData.map((rowData, rowIndex) => (
                        <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 hover:text-black">
                            {props.columns.map((columnName, columnIndex) => (
                                <td key={columnIndex} className="px-6 py-4">
                                    {columnName === "status" ? getStatusBadge(rowData[columnName]) : columnName === "action" ? (
                                        <div className="flex space-x-2">
                                            {props.actionButtons.map((button, buttonIndex) => (
                                                <button
                                                    key={buttonIndex}
                                                    onClick={() => handleAction(rowData.id, button.name)}
                                                    className={`px-2 py-1 text-xs font-semibold text-white rounded ${getButtonColor(button.name)}`}
                                                >
                                                    {button.name}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        rowData[columnName]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
