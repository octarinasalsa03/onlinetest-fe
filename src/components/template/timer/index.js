import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import SubmitForce, { SubmitManual } from "../../../services/test/submit";


function Index(props) {
    // from https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/
    const ref = useRef(null);

    const durationHours = 1;
    const initialTime = '01:00:00';
    const startDate = new Date(props.startTime);
    const encodedEmail = props.encodedEmail;
    const csrfToken = props.csrfToken;

    const [timer, setTimer] = useState(initialTime);
    const [start, setStart] = useState(false);

    useEffect(() => {
        setStart(props.start);
    }, []);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        }
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);

        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {

        setTimer(initialTime);

        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (ref.current) clearInterval(ref.current);

        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        ref.current = id;
    }

    const getDeadTime = () => {
        // let deadline = new Date(); // start date disini
        let deadline = startDate;


        // let startDate = new Date(rawStartTime);
        // console.log(rawStartTime);
        // console.log(startDate);

        deadline.setHours(deadline.getHours() + durationHours);
        // deadline.setMinutes(deadline.getMinutes() + durationMinutes);
        // deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }

    useEffect(() => {
        if (start) {
            clearTimer(getDeadTime());
        }
    }, [start]);

    const loadPage = () => {
        if (timer === '00:00:00') {
            return (
                <SubmitForce encodedEmail={encodedEmail} csrfToken={csrfToken}></SubmitForce>
            )
        }

        return (
            <div className="container-fluid">
                <h4>
                    <p>Time Left: {timer}</p>
                </h4>
            </div>
        )
    }

    return (
        <>
            {loadPage()}
        </>

    )
}

export default Index;