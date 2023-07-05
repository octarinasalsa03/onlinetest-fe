import { useNavigate, useSearchParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export const Greeting = () => {
    const navigate = useNavigate();

    const encodedEmailKey = "par1";
    const [searchParams] = useSearchParams();
    const encodedEmail = searchParams.get(encodedEmailKey);

    const startTest = () => {
        navigate("/test/test?" + encodedEmailKey + "=" + encodedEmail);
    }

    return (
        <div className="overlay justify-content-center">
            <div className="home-container">
                <button onClick={() => startTest()} className="btn btn-primary text-center start-button">
                    Start Test
                </button>
            </div>
        </div>
    )
}

export default Greeting;