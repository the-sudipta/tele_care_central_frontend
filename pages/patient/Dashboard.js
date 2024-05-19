import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/pages/components/layout/customer/Navbar";
import dynamic from "next/dynamic";
import _Title from "@/pages/components/layout/_title";
import Navigation_Card from "@/pages/components/Cards/Navigation_Card";
import routes from "@/route/routes";

export default function Dashboard() {
    const router = useRouter();

    const Navbar = dynamic(() => import("/pages/components/layout/customer/Navbar"));

    useEffect(() => {}, []);

    const navigate = (page) => {
        router.push(page);
    };

    return (
        <>
            <_Title title="Tele Health" />
            <Navbar />
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="grid grid-cols-2 gap-4 mb-6 w-11/12 max-w-screen-lg">
                    <Navigation_Card image={"Appointment.png"} name={"Appointments"} subject={""} path={routes.book_an_appointment}  />
                    <Navigation_Card image={"Medical Report.png"} name={"Medical Reports"} subject={""} path={routes.patient_all_medical_reports} />
                    <Navigation_Card image={"Feedback.png"} name={"Feedback"} subject={""} path={routes.patient_create_feedback} />
                    <Navigation_Card image={"Medical_Payment.png"} name={"Payment"} subject={""} path={routes.patient_create_payment} />
                </div>
            </div>
        </>
    );
}
