import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Navbar from "@/pages/components/layout/customer/Navbar";
import _Title from "@/pages/components/layout/_title";
import Hover_Highlight_Table from "@/pages/components/table/Hover_Highlight_Table";
import API_ENDPOINTS from "@/route/api";
import {useAuth} from "@/pages/utils/authcontext";
import routes from "@/route/routes";
import Solid_Background_Breadcrumb from "@/pages/components/breadcrumbs/Solid_Background_Breadcrumb";
import Default_Breadcrumb from "@/pages/components/breadcrumbs/Default_Breadcrumb";
import Dashed_Breadcrumb from "@/pages/components/breadcrumbs/Dashed_Breadcrumb";

export default function Create_Feedback() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const [SuccessMessage, setSuccessMessage] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');

    const [Show_Success_Alert, setShow_Success_Alert] = useState(false);
    const [Show_Error_Alert, setShow_Error_Alert] = useState(false);

    const [Email_Error, setEmail_Error] = useState('');
    const [Password_Error, setPassword_Error] = useState('');

    const { login, user } = useAuth();

    const [breadcrumbs, setBreadcrumbs] = useState([
        { name: "Feedback", path: routes.book_an_appointment },
    ]);

    const [data, setData] = useState({
        id: -1,
        test_name: '',
        feedback_text: '',
        feedback_date: 'x',
        user_id: -1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const show_Error = (message) => {
        setShow_Error_Alert(true);
        setErrorMessage(message);

        setTimeout(() => {
            setShow_Error_Alert(false);
            setErrorMessage('');
        }, 3000); // Hide after 3 seconds
    };

    const show_Success = (message) => {
        setShow_Success_Alert(true);
        setSuccessMessage(message);

        setTimeout(() => {
            setShow_Success_Alert(false);
            setSuccessMessage('');
        }, 3000); // Hide after 3 seconds
    };


    const validationCheck = async (test_name, feedback_text) => {

        if (!test_name) {
            setEmail_Error("Test Name is required");
            return false;
        }
        if( !feedback_text){
            setPassword_Error("Your Feedback required");
            return false;
        }
        // All validation checks passed
        return true;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const decision = await validationCheck(data.test_name, data.feedback_text);
        // alert('Decision = '+decision);
        if(decision){
            try {

                setIsLoading(true);
                const response = await axios.post(
                    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ENDPOINTS.patient_create_feedback,
                    {
                        id: data.id,
                        test_name: data.test_name,
                        feedback_text: data.feedback_text,
                        feedback_date: data.feedback_date,
                        user_id: data.user_id
                    },
                    {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        withCredentials: true,
                    }
                );
                const receivedData = response.data;
                if (response.data) {
                    setIsLoading(false);
                    show_Success("Feedback Successfully Sent")
                    navigate(routes.patient_dashboard);
                } else {
                    setIsLoading(false);
                    show_Error("Failed to send Feedback");
                    navigate(routes.patient_create_feedback)
                }

                // console.log("JWT = "+response.data.access_token);
            } catch (error) {
                setIsLoading(false);
                show_Error("Failed to send Feedback");
                console.error("Error Sending Feedback Request"+error);
                navigate(routes.patient_create_feedback)
            }
        }else{
            // alert("Got Final Error, so in the else section");
        }
    };



    useEffect(() => {

    }, []);

    const navigate = (page) => {
        router.push(page)
    }

    return (
        <>
            <_Title title={"Tele Health"} />
            <Navbar/>

            <div className="flex items-center justify-center h-screen">
                <div id="appointment_div" className="mx-auto w-full max-w-[550px] ">
                    <form onSubmit={handleSubmit}>

                        <div id="breadcrumb" className={"mb-10"}>
                            <Dashed_Breadcrumb breadcrumbs={breadcrumbs} currentPage={"Feedback"} root={routes.patient_dashboard} />
                        </div>
                        <p className={"text-5xl mb-7"}>Send Feedback</p>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="date" className="mb-3 block text-base font-medium text-white">
                                        Test Name
                                    </label>
                                    <input
                                        type="text"
                                        name="test_name"
                                        value={data.test_name}
                                        onChange={handleChange}
                                        id="test_name"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="time" className="mb-3 block text-base font-medium text-white">
                                        Your Feedback
                                    </label>
                                    <input
                                        type="text"
                                        name="feedback_text"
                                        value={data.feedback_text}
                                        onChange={handleChange}
                                        id="feedback_text"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                Send Feedback
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}
