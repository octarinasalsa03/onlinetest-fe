import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SubmitPost(encodedEmail) {
    const url = "http://localhost:8088/api/test-management/";
    const json = JSON.stringify({ encodedemail: encodedEmail.encodedEmail });
    console.log(json);
    // ajax
    axios.post(url + "submit", json, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.data.message === "success") {
            return response.data.message;
        }
        return null;
    }).catch(function (error) {
        return null;
    })
}

function SubmitManual(encodedEmail) {

    const navigate = useNavigate();
    const [result, setResult] = useState(null);

    const submit = () => {
        setResult(SubmitPost(encodedEmail));
        navigate("/test/finish");
    }

    // useEffect(() => {
    //     navigate("/test/finish");
    // }, [result]);

    return (
        <button className="btn btn-primary test-button" onClick={() => submit()}>Submit</button>
    )
}

function SubmitForce(encodedEmail) {
    // console.log(encodedEmail);

    SubmitPost(encodedEmail);

    return (
        <Navigate replace to="/test/finish"></Navigate>
    )
}

export { SubmitManual };
export default SubmitForce;