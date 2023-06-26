import "bootstrap/dist/css/bootstrap.min.css";

function index() {
  return (
    <div class="container">
      <a class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#createParticipantModal">
        Create
      </a>
      <table class="table mt-5 text-center" id="myTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Participant Name</th>
            <th>Email</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((x) => {
            return (
              <tr>
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td>{x.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
