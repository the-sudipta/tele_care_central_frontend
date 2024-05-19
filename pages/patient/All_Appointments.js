// All_Appointments.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import _Title from "@/pages/components/layout/_title";
import Navbar from "@/pages/components/layout/customer/Navbar";
import Hover_Highlight_Table from "@/pages/components/table/Hover_Highlight_Table";
import API_ENDPOINTS from "@/route/api";
import routes from "@/route/routes";
import Dashed_Breadcrumb from "@/pages/components/breadcrumbs/Dashed_Breadcrumb";
import Hover_Highlight_Table_with_Badges from "@/pages/components/table/Hover_Highlight_Table_with_Badges";
import Table_With_Action_Buttons from "@/pages/components/table/Table_With_Action_Buttons";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function All_Appointments() {

    const router = useRouter();
    const [data, setData] = useState(false);

    const [tableColumnNames, set_tableColumnNames] = useState([
        "ID", "Appointment Date", "Appointment Time", "Status", "Actions"
    ]);

    const tableColumnsToDisplay = [
        "id", "appointment_date", "appointment_time", "status", "action"
    ];

    const actionButtons = [
        // { name: "Edit", color: "yellow" },
        { name: "Delete", color: "red" }
    ];

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);

    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: "Appointment Booking", path: routes.book_an_appointment },
        { name: "All Appointments", path: routes.all_appointments }
    ]);




    const handleAction = (id, action) => {
        setSelectedRowId(id);
        setSelectedAction(action);
    }

    const performAction = async () => {
        // Perform any action here based on selectedRowId and selectedAction
        // For example, you can make an API call or show a modal
        console.log(`Performing action ${selectedAction} for row with ID ${selectedRowId}`);

        try {
            const response = await axios.delete(
                process.env.NEXT_PUBLIC_API_ENDPOINT + API_ENDPOINTS.patient_delete_appointment + selectedRowId,
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    withCredentials: true,
                }
            );

            if(response.status === 200){
                console.warn('Deleted Successfully');
                navigate(routes.book_an_appointment);
            }
            const receivedData = response.data;
        } catch (error) {
            console.error("Error Deleting Data : ", error);
        } finally {
        }
    };

    useEffect(() => {
        performAction();
    }, [selectedRowId, selectedAction]);

    const navigate = (page) => {
        router.push(page)
    }

    return (
        <>
            <_Title title={"Paisa"} />
            <Navbar />
            <div id="cash_in" className="flex flex-col items-center justify-center h-screen">
                <div className="mb-10">
                    <Dashed_Breadcrumb breadcrumbs={breadcrumbs} currentPage={"All Appointments"} root={routes.patient_dashboard} />
                </div>
                <div className="mb-4 text-lg font-bold">All Appointments</div>
                <div className="w-full max-w-screen-lg overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <Table_With_Action_Buttons
                                endPoint={API_ENDPOINTS.patientAllAppointmentList}
                                headings={tableColumnNames}
                                columns={tableColumnsToDisplay}
                                actionButtons={actionButtons}
                                handleAction={handleAction}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
