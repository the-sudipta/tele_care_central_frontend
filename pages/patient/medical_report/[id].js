import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import _Title from "@/pages/components/layout/_title";
import Navbar from "@/pages/components/layout/customer/Navbar";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import API_ENDPOINTS from "@/route/api";
import routes from "@/route/routes";
import Dashed_Breadcrumb from "@/pages/components/breadcrumbs/Dashed_Breadcrumb";

export default function View_Single() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [id, setID] = useState(null); // Initialize id state to null

    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: "Medical Reports", path: routes.patient_all_medical_reports },
        { name: "View Report", path: routes.patient_all_medical_reports }
    ]);

    useEffect(() => {
        // Check if the query id is valid before updating state and fetching data
        if (router.query.id && parseInt(router.query.id) > 0) {
            setID(router.query.id);
            fetchData();
        }
    }, [router.query.id]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_API_ENDPOINT + API_ENDPOINTS.patientShowMedicalRecords + router.query.id,
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    withCredentials: true,
                }
            );
            const receivedData = response.data;
            setData(receivedData);
        } catch (error) {
            console.error("Error fetching Data : ", error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <_Title title="Paisa" />
            <Navbar />
            <div className="flex justify-center items-center h-screen">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : data ? (
                    <>
                        {/* Medical Report Big Card Here  */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="mb-10">
                                    <Dashed_Breadcrumb
                                        breadcrumbs={breadcrumbs}
                                        currentPage={"View Report"}
                                        root={routes.patient_dashboard}
                                    />
                                </div>
                                <div className="flex items-center mb-6">
                                    <svg
                                        className="w-8 h-8 text-blue-500 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 21h18M3 10h15l-3-7-3 7H3zm0 0a2 2 0 100-4 2 2 0 000 4z"
                                        ></path>
                                    </svg>
                                    <h2 className="text-5xl font-semibold dark:text-white">
                                        {data.test_name}
                                    </h2>
                                </div>
                                <p className="text-white text-2xl mb-4 dark:text-white">
                                    Test Date: {data.test_date}
                                </p>
                                <p className="text-white text-2xl mb-4 dark:text-white">
                                    Results: {data.result}
                                </p>
                            </div>
                            <div>
                                <Image
                                    src="/images/Medical_Hostory_illustrator.png"
                                    width={400}
                                    height={400}
                                    alt="Medical Report Illustration"
                                />
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
}
