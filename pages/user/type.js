import { useRouter } from "next/router";
import routes from "@/route/routes";
import _Title from "@/pages/components/layout/_title";

export default function Type() {
    const router = useRouter();

    const navigate = (page) => {
        router.push(page);
    };

    return (
        <>
            <_Title title={"Tele Health"} />
            <section className="bg-black dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white-900 dark:text-white">Online Healthcare Consultation Management System</h2>
                        <p className="mb-5 font-light text-white-500 sm:text-xl dark:text-gray-400">Select the feature or role that helps you to consult telemedicine needs</p>
                    </div>
                    <div className="flex justify-center"> {/* Centering the content */}
                        <div id={"Patient_div"} className="flex flex-col p-6 max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white" style={{ marginLeft: '34px', width: '451px' }}>
                            <h3 className="mb-4 text-2xl font-semibold">Patient</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large-scale uses and extended redistribution rights.</p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">Patient</span>
                            </div>
                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Accepting their account by providing personal information and medical history</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Limited access to certain features within this platform like scheduling appointments and viewing medical records, communicating with healthcare providers</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span>Managing Data access and Portability to set privacy preferences for who can see their reports</span>
                                </li>
                            </ul>
                            <a href="#" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900" onClick={(e) => { e.preventDefault(); navigate(routes.signup); }}>Get started</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
