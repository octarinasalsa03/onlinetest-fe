import { useState, useEffect, useRef } from "react";
// import { useSearchParams } from "react-router-dom";
import Submit from "../../../services/test/submit";


function Index(props) {
    // from https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/
    const Ref = useRef(null);
    // const [searchParams] = useSearchParams();
    // const encodedEmail = searchParams.get("par1");
    const encodedEmail = props.encodedEmail;
    const [timer, setTimer] = useState('00:00:10');
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

        setTimer('00:00:10');

        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);

        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        // deadline.setMinutes(deadline.getMinutes() + 30);
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }

    useEffect(() => {
        if(start) {
            clearTimer(getDeadTime());
        }
    }, [start])

    useEffect(() => {
        if(timer ===  '00:00:00') {
            console.log("time's up!");
            Submit(encodedEmail);
        }
    }, [timer])

    return (
        <>
            <div className="container-fluid">
                <p>Time Left: {timer}</p>
            </div>
        </>
    )
}

export default Index;