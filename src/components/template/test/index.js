import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { previous, next, go } from "../../../features/testIndex/testIndexSlice";
import axios from "axios";

function Index() {

    const url = "http://localhost:8088/api/test-management/gettest/amltQGdtYWlsLmNvbQ";
    const idx = useSelector(state => state.testIndex.idx);
    const dispatch = useDispatch();

    const [data, setData] = useState([{}]);
    const [dataIndex, setDataIndex] = useState({});

    useEffect(() => {
        axios.get(url)
            .then(function (response) {
                // console.log(response.data.data);
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

    return (
        <div className="container" id="body">
            <p>
                {dataIndex.question?.description}
            </p>
            <form>
                Answer:
                <p>
                    <label>
                        <input type="radio" name="myRadio" value="option1" />
                        Option 1
                    </label>
                </p>
                <p>
                    <label>
                        <input type="radio" name="myRadio" value="option2" defaultChecked={true} />
                        Option 2
                    </label>
                </p>
                <p>
                    <label>
                        <input type="radio" name="myRadio" value="option3" />
                        Option 3
                    </label>
                </p>
            </form>

            <table id="departmentTable" className="table table-bordered">
                <thead>
                    <tr>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(x => {
                        return (
                            <tr>
                                <td>{x.question?.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <button onClick={() => dispatch(previous())}>Previous</button>
            <button onClick={() => dispatch(next())}>Next</button>
            {/* klik button -> redux function go dari paginationSlice -> state.url berubah -> url berubah -> useEffect jalan -> get dari url baru */}
        </div>
    )
}

export default Index;