import { Navigate, useNavigate } from "react-router-dom";

function SubmitPost(encodedEmail) {
    // ajax
}

function SubmitManual(encodedEmail) {

    const navigate = useNavigate();
    const submit = () => {
        navigate("/test/finish");
    }
    return (
        <button className="btn btn-primary test-button" onClick={() => submit()}>Submit</button>
    )
}

function SubmitForce(encodedEmail) {
    // console.log(encodedEmail);

    return (
        <Navigate replace to="/test/finish"></Navigate>
    )
}

export { SubmitManual };
export default SubmitForce;