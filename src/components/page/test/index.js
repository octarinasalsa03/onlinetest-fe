import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TestTemplate from '../../template/test';
import TimerTemplate from '../../template/timer';
import axios from 'axios';

function Index() {
    const url = "http://localhost:8088/api/test-management/";
    const [searchParams] = useSearchParams();
    const encodedEmail = searchParams.get("par1");

    const [data, setData] = useState([{}]);
    const [start, setStart] = useState(false);

    useEffect(() => {
        axios.get(url + "gettest/" + encodedEmail)
            .then(function (response) {
                // console.log(response.data.data);
                setData(response.data.data);
                setStart(true);
                // setDataIndex(data.at(index));
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const loadPage = () => {
        if (start) {
            return (
                <div>
                    <TimerTemplate url={url} encodedEmail={encodedEmail} start={start}></TimerTemplate>
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