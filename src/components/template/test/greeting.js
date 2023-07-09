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
                <div className="row">
                    <h5>
                        <p>- There are 50 multiple choices test problems.</p>
                    </h5>
                </div>
                <div className="row">
                    <h5>
                        <p>- You have 1 hour to finish the test.</p>
                    </h5>
                </div>
                <div className="row">
                    <h5>
                        <p>- You are allowed to leave mid test and come back later, but the timer will keep running!.</p>
                    </h5>
                </div>
                <button onClick={() => startTest()} className="btn btn-primary text-center start-button">
                    Start Test
                </button>
            </div>
        </div>
    )
}

export default Greeting;