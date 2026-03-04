import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: "Programer Pemula",
      status: "Offline",
      jumlahKlik: 0,
      biodata: "Belum Ada Biodata.",
    };

    this.toggleStatus = this.toggleStatus.bind(this)
    this.updateBiodata = this.updateBiodata.bind(this)
  }

  // 1. Function reguler
  toggleStatus() {
    this.setState((prevState) => ({
      status: prevState.status === "Offline" ? "Online" : "Offline",
      jumlahKlik: prevState.jumlahKlik + 1,
    }));
  }

  updateBiodata() {
    this.setState({
      biodata:
        "Saya sedang belajar React Class Component dengan cara fundamental!",
    });
  }

  render() {
    const { nama, status, jumlahKlik, biodata } = this.state;

    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        {/* Style Container */}
        <h1>User Profile</h1>
        <p>
          <strong>Nama: </strong>
          {nama}
        </p>
        <p>
          <strong>Status: </strong>
          {status}
        </p>
        <p>
          <strong>Biodata: </strong>
          {biodata}
        </p>
        <p>interaksi: {jumlahKlik}</p>

        {/* button triger */}
        <button onClick={this.toggleStatus} style={{ marginRight: "10px" }}>
          Change Status
        </button>
        <button onClick={this.updateBiodata}>Update Bidoata</button>
      </div>
    );
  }
}

export default App
