import { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import TestTemplate from '../../template/test';
import TimerTemplate from '../../template/timer';
import axios from 'axios';

function Index() {
    const url = "http://localhost:8088/api/test-management/";
    const [searchParams] = useSearchParams();
    const encodedEmail = searchParams.get("par1");
    const json = JSON.stringify({ encodedemail: encodedEmail });

    const [data, setData] = useState([{}]);
    const [start, setStart] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [errorObj, setErrorObj] = useState({});

    useEffect(() => {
        axios.get(url + "gettest/" + encodedEmail)
            .then(function (response) {
                if (response.data.data) {
                    if (response.data.data.length > 0) {
                        setData(response.data.data);
                        setStart(true);

                        axios.post(url + "start", json, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(function (response2) {
                            setStartTime(response2.data.data);
                        }).catch(function (error) {
                            setErrorObj({ message: error.message });
                        })
                        
                    } else {
                        setErrorObj({ message: "not found" });
                    }
                } else {
                    setErrorObj({ message: "finish" });
                }
            })
            .catch(function (error) {
                // console.log(error);
                setErrorObj({ message: error.message });
            })
    }, []);

    const loadPage = () => {
        if (errorObj.message) {
            if (errorObj.message === "finish") {
                return (
                    <Navigate replace={false} to='/test/finish'></Navigate>
                )
            } else if (errorObj.message === "not found") {
                return (
                    <Navigate replace={false} to='/test/candidate-not-found'></Navigate>
                )
            } else {
                return (
                    <Navigate replace={false} to='/error'></Navigate>
                )
            }
        }

        if (start && data && startTime !== "") {
            return (
                <div>
                    <TimerTemplate url={url} encodedEmail={encodedEmail} start={start} startTime={startTime}></TimerTemplate>
                    <TestTemplate url={url} encodedEmail={encodedEmail} data={data}></TestTemplate>
                </div>
            )
        }

        return (
            <p>Loading...</p>
        )
    }

    return (
        <div>
            {loadPage()}
        </div>
    )
}

export default Index;