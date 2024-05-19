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

export default function All_Medical_Reports() {

    const router = useRouter();

    const [tableColumnNames, set_tableColumnNames] = useState([
        "ID", "Test Type", "Examine Date", "Result", "Action"
    ]);

    const tableColumnsToDisplay = [
        "id", "test_name", "test_date", "result", "action"
    ];

    const actionButtons = [
        { name: "view", color: "blue" },
    ];

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);

    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: "Medical Reports", path: routes.patient_all_medical_reports },
        { name: "View Report", path: routes.patient_all_medical_reports }
    ]);

    const handleAction = (id, action) => {
        setSelectedRowId(id);
        setSelectedAction(action);
    }

    const performAction = () => {
        // Perform any action here based on selectedRowId and selectedAction
        // For example, you can make an API call or show a modal
        console.log(`Performing action ${selectedAction} for row with ID ${selectedRowId}`);
        navigate(routes.patient_view_single_medical_report+selectedRowId);
    };

    useEffect(() => {
        if (selectedRowId !== null && selectedAction !== null) {
            performAction();
        }
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
                    <Dashed_Breadcrumb breadcrumbs={breadcrumbs} currentPage={"Medical Reports"} root={routes.patient_dashboard} />
                </div>
                <div className="mb-4 text-lg font-bold">All Medical Reports</div>
                <div className="w-full max-w-screen-lg overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <Table_With_Action_Buttons
                                endPoint={API_ENDPOINTS.patient_all_medical_reports}
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
