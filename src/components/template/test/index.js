import { useEffect, useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { previous, next, go } from "../../../features/testIndex/testIndexSlice";
// import { Route } from 'react-router-dom';
import axios from "axios";
import { SubmitManual } from "../../../services/test/submit";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function Index(props) {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const encodedEmail = props.encodedEmail;
    const url = props.url;
    const csrfToken = props.csrfToken;

    const idx = useSelector(state => state.testIndex.idx);

    // const [data, setData] = useState([{}]);
    const [data, setData] = useState([{}]);
    const [dataIndex, setDataIndex] = useState({});
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveFail, setSaveFail] = useState(false);

    useEffect(() => {
        setData(props?.data);
    }, []);

    useEffect(() => {
        setDataIndex(data?.at(idx));
    }, [data, idx]);

    useEffect(() => {
        setSaveFail(false);
        setSaveSuccess(false);
        ref.current?.scrollIntoView({ block: "nearest" });
    }, [idx]);

    const handleChange = (event, questionId) => {
        let answerId = +event.target.value;   // convert string to int
        const json = JSON.stringify({
            encodedemail: encodedEmail,
            question_id: questionId,
            answer_id: answerId
        });
        // {
        //     encodedemail: encodedEmail,
        //     question_id: questionId,
        //     answer_id: answerId
        // }
        axios.post(url + "saveanswer", json, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.data.message === "success") {
                let dataCopy = [...data];
                let dataIndexCopy = { ...dataCopy[idx] };
                if (dataIndexCopy.answer == null) {
                    dataIndexCopy.answer = {
                        id: answerId
                    };
                } else {
                    dataIndexCopy.answer.id = answerId;
                }
                dataCopy[idx] = dataIndexCopy;
                setData(dataCopy);
                setSaveFail(false);
                setSaveSuccess(true);
            }
        }).catch(function (error) {
            setSaveSuccess(false);
            setSaveFail(true);
        })
    }

    const SuccessAlert = () => {
        return (
            <div className="alert alert-success" id="success">
                Answer Saved!
            </div>
        )
    }

    const FailAlert = () => {
        return (
            <div className="alert alert-danger" id="fail">
                Answer Save Failed, Please Retry
            </div>
        )
    }

    const SubmitButton = () => {
        return (
            <SubmitManual encodedEmail={encodedEmail} csrfToken={csrfToken}></SubmitManual>
        )
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
                                    className={"list-group-item list-group-item-action navigation-menu-item"
                                        + (x.answer?.id == null ? "" : " filled")
                                        + (index !== idx ? "" : " active")
                                    }
                                    data-toggle="button"
                                    key={index}
                                    ref={index !== idx ? null : ref}>
                                    Number {index + 1}
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
                            {saveSuccess ? <SuccessAlert></SuccessAlert> : null}
                            {saveFail ? <FailAlert></FailAlert> : null}
                        </div>

                        <div className="navigation">
                            <div className="row">
                                <div className="input-group">
                                    <div className="col-md-6 text-center">
                                        <button className="btn btn-outline-primary test-button" onClick={() => dispatch(previous())} disabled={idx < 1}>
                                            <i className="bi bi-arrow-left"></i> Previous
                                        </button>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <button className="btn btn-outline-primary test-button" onClick={() => dispatch(next())} disabled={idx >= data.length - 1}>
                                            Next <i className="bi bi-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="reserve-space">
                            <br></br>
                            <div className="row">
                                <div className="input-group justify-content-md-center">
                                    <div className="col-md-6 text-center">
                                        {idx < data.length - 1 ? null : <SubmitButton></SubmitButton>}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;