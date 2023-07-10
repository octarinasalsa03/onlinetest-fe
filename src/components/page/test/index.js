import { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import TestTemplate from '../../template/test';
import TimerTemplate from '../../template/timer';
import axios from 'axios';
import { type } from "@testing-library/user-event/dist/type";

function Index() {
    const url = "http://localhost:8088/api/test-management/";
    const [searchParams] = useSearchParams();
    const encodedEmail = searchParams.get("par1");
    const json = JSON.stringify({ encodedemail: encodedEmail });

    // const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    const [csrfToken, setCsrfToken] = useState("");
    const [data, setData] = useState([{}]);
    const [start, setStart] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [errorObj, setErrorObj] = useState({});

    useEffect(() => {
        axios.defaults.withCredentials = false;
        axios.get(url + "gettest/" + encodedEmail)
            .then(function (response) {
                if (response.data.data) {
                    if (response.data.data.length > 0) {
                        setData(response.data.data);
                        setStart(true);
                        // console.log(response)
                    } else {
                        setErrorObj({ message: "not found" });
                    }
                } else {
                    setErrorObj({ message: "finish" });
                }
            })
            .catch(function (error) {
                setErrorObj({ message: error.message });
            });
    }, []);

    // useEffect(() => {
    //     // console.log(data.length > 1);
    //     if (data.length > 1 && start) {
    //         axios.get(url + "csrf")
    //             .then(function (tokenResponse) {
    //                 setCsrfToken(tokenResponse.data.token);
    //                 // console.log(tokenResponse.data);
    //             })
    //             .catch(function (error) {
    //                 setErrorObj({ message: error.message });
    //             });
    //     }
    // }, [start]);

    useEffect(() => {
        // console.log(csrfToken !== "");
        // if (csrfToken !== "" && start) {
        if (start) {
            setCsrfToken(document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
            axios.post(url + "start", json, {
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                setStartTime(response.data.data);
            }).catch(function (error) {
                console.log(error)
                setErrorObj({ message: error.message });
            });
        }
        // }, [csrfToken, start]);
    }, [start]);

    const loadPage = () => {
        // console.log(typeof csrfToken);
        console.log(csrfToken);
        console.log(csrfToken.trim());
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

        if (csrfToken !== "" && start && data.length > 1 && startTime !== "") {
            return (
                <div>
                    <TimerTemplate url={url} encodedEmail={encodedEmail} csrfToken={csrfToken} start={start} startTime={startTime}></TimerTemplate>
                    <TestTemplate url={url} encodedEmail={encodedEmail} csrfToken={csrfToken} data={data}></TestTemplate>
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