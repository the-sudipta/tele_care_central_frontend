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

export default function All_Payments() {
    const [tableColumnNames, set_tableColumnNames] = useState([
        "ID", "Amount", "Date", "Status"
    ]);

    const tableColumnsToDisplay = [
        "id", "amount", "payment_date", "status"
    ];

    const actionButtons = [
        { name: "Edit", color: "yellow" },
        { name: "Delete", color: "red" }
    ];

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);

    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: "Pay Money", path: routes.patient_create_payment },
        { name: "All Payments", path: routes.patient_all_payments }
    ]);

    const handleAction = (id, action) => {
        setSelectedRowId(id);
        setSelectedAction(action);
    }

    const performAction = () => {
        // Perform any action here based on selectedRowId and selectedAction
        // For example, you can make an API call or show a modal
        console.log(`Performing action ${selectedAction} for row with ID ${selectedRowId}`);
    };

    useEffect(() => {
        performAction();
    }, [selectedRowId, selectedAction]);

    return (
        <>
            <_Title title={"Paisa"} />
            <Navbar />
            <div id="cash_in" className="flex flex-col items-center justify-center h-screen">
                <div className="mb-10">
                    <Dashed_Breadcrumb breadcrumbs={breadcrumbs} currentPage={"All Payments"} root={routes.patient_dashboard} />
                </div>
                <div className="mb-4 text-lg font-bold">All Payments</div>
                <div className="w-full max-w-screen-lg overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <Table_With_Action_Buttons
                                endPoint={API_ENDPOINTS.patient_all_payment}
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
