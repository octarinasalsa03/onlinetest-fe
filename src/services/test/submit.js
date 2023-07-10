import { Navigate, useNavigate } from "react-router-dom";
// import { useState } from "react";
import axios from "axios";

function SubmitPost(data) {
    const url = "http://localhost:8088/api/test-management/";
    const json = JSON.stringify({ encodedemail: data.encodedEmail });
    console.log(json);
    
    axios.post(url + "submit", json, {
        headers: {
            'X-CSRF-TOKEN': data.csrfToken,
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

function SubmitManual(props) {

    const navigate = useNavigate();
    // const [result, setResult] = useState(null);

    const submit = () => {
        // setResult(SubmitPost(encodedEmail));
        SubmitPost(props);
        navigate("/test/finish");
    }

    // useEffect(() => {
    //     navigate("/test/finish");
    // }, [result]);

    return (
        <button className="btn btn-primary test-button" onClick={() => submit()}>Submit</button>
    )
}

function SubmitForce(props) {
    SubmitPost(props);
    return (
        <Navigate replace to="/test/finish"></Navigate>
    )
}

export { SubmitManual };
export default SubmitForce;