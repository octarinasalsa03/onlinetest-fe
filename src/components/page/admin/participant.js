import ParticipantTemplate from "../../template/admin/participant";

function Participant() {
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
  return <ParticipantTemplate data={data}></ParticipantTemplate>;
}

export default Participant;
