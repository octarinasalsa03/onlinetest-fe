import AdminTemplate from "../../template/admin/candidate";

function Candidate() {
  var data = [
    {
      id: 1,
      name: "Ipin",
      email: "ipin@gmail.com",
      score: "0",
    },
    {
      id: 2,
      name: "Octarina",
      email: "octarinasalsabila@gmail.com",
      score: "0",
    },
  ];
  return <AdminTemplate data={data}></AdminTemplate>;
}

export default Candidate;
