import React, {useEffect, useState} from "react";
import dynamic from 'next/dynamic';
import {useRouter} from "next/router";
import Progress_Bar_With_Label_inside from "@/pages/components/ProgressBar/Progress_Bar_With_Label_inside";

const _Title = dynamic(() => import('./components/layout/_title'))

export default function Home() {
    const router = useRouter();
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        navigate("/user/Login");
    }, []);


    const navigate = (page) => {
        router.push(page);
    }

    return (
        <>
            <_Title title="Tele Health" />

        </>
    );
}
