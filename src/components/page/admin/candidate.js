import CandidateTemplate from "../../template/admin/candidate";

function Candidate() {
  var data = [
    {
      id: 1,
      name: "Ipin",
      email: "ipin@gmail.com",
    },
    {
      id: 2,
      name: "Octarina",
      email: "octarinasalsabila@gmail.com",
    },
  ];
  return <CandidateTemplate data={data}></CandidateTemplate>;
}

export default Candidate;
