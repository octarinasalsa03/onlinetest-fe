import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../style.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <span className="brand-name fs-4">User Test Online</span>
      </div>
      <hr className="text-dark"></hr>
      <div className="list-group list-group-flush ">
        <a className="list-group-item list-group-action py-2 my-1" onClick={() => navigate("/admin")}>
          <i class="bi bi-person me-1"></i>
          <span>Candidate</span>
        </a>
        <a className="list-group-item list-group-action py-2 my-1" onClick={() => navigate("/admin/participant")}>
          <i class="bi bi-file-earmark-person me-1"></i>
          <span>Participant</span>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
