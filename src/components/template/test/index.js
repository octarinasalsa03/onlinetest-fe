import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { previous, next, go } from "../../../features/testIndex/testIndexSlice";
import axios from "axios";
import './index.css'

function Index() {

    const url = "http://localhost:8088/api/test-management/";
    const encoded = "amltQGdtYWlsLmNvbQ";
    const idx = useSelector(state => state.testIndex.idx);
    const dispatch = useDispatch();

    const [data, setData] = useState([{}]);
    const [dataIndex, setDataIndex] = useState({});

    useEffect(() => {
        axios.get(url + "gettest/" + encoded)
            .then(function (response) {
                console.log(response.data.data);
                setData(response.data.data);
                // setDataIndex(data.at(index));
                // console.log(data);
            })
            .catch(function (error) {
                // console.log(error);
            })
    }, []);

    useEffect(() => {
        setDataIndex(data?.at(idx));
    }, [data, idx]);

    const handleChange = (event, questionId) => {
        // console.log(questionId);
        let answerId = +event.target.value;   // convert string to int
        axios.post(url + "saveanswer", {
            encodedemail: encoded,
            question_id: questionId,
            answer_id: answerId
        }).then(function (response) {
            if (response.data.message === "success") {
                let dataCopy = [...data];
                let dataIndexCopy = { ...dataCopy[idx] };
                dataIndexCopy.answer.id = answerId;
                dataCopy[idx] = dataIndexCopy;
                setData(dataCopy);
                console.log("hi");
            }
        }).catch(function (error) {
            console.log(error);
        })

    }

    return (
        <div className="container-fluid" id="body">
            <div className="row justify-content-md-center">
                <div className="col-4">
                    <h4 className="navigation-menu-header">
                        <span className="fw-semibold navigation-menu-item">
                            Test Problems
                        </span>
                    </h4>
                    <hr></hr>
                    <div className="list-group">
                        {data.map((x, index) => {
                            return (
                                <button onClick={() => dispatch(go(index))}
                                    className="list-group-item list-group-item-action navigation-menu-item"
                                    data-toggle="list">
                                    Number {index}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="col-8 bg-body-primary test-content">
                    <div className="tab-content">
                        <p>
                            Problem <span id="problem-number">{idx + 1}</span>
                        </p>

                        <p className="form-control description-box">
                            {dataIndex.question?.description}
                        </p>

                        <form>
                            {/* <div hidden={true}>
                                <input type="text" name="questionId" value={dataIndex.question?.id} hidden={true}></input>
                            </div> */}
                            Answer:
                            <div className="form-group answers">
                                {dataIndex.question?.answer.map(x => {
                                    return (
                                        <p className="form-check" key={x.id}>
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="answerId" value={x.id} checked={x.id === dataIndex.answer?.id} onChange={event => handleChange(event, dataIndex.question?.id)} />
                                                {x.value}
                                            </label>
                                        </p>
                                    )
                                })}
                            </div>
                        </form>

                        <div className="reserve-space" id="alert-space">
                            <div className="alert alert-success" style={{ display: "none" }} id="success">
                                Answer Saved!
                            </div>
                            <div className="alert alert-danger" style={{ display: "none" }} id="fail">
                                Answer Save Failed, Please Retry
                            </div>
                        </div>

                        <div className="navigation">
                            <div className="row">
                                <div className="input-group">
                                    <div className="col-md-6 text-center">
                                        <button className="btn btn-outline-primary test-button" onClick={() => dispatch(previous())} disabled={idx < 1}>Previous</button>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <button className="btn btn-outline-primary test-button" onClick={() => dispatch(next())} disabled={idx >= data.length - 1}>Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* <div>
                <p>
                    {idx}
                </p>
            </div> */}
        </div>
    )
}

export default Index;