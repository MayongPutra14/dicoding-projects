import React from "react";

class UpdateTextRealTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      namaUser: "",
      textColor: "black",
    };

    this.eventChangeHandler = this.eventChangeHandler.bind(this);
    this.eventResetHandler = this.eventResetHandler.bind(this);
    this.chnageTextColor = this.chnageTextColor.bind(this);
  }

  eventChangeHandler(event) {
    this.setState({
      namaUser: event.target.value,
    });
  }

  eventResetHandler() {
    this.setState({
      namaUser: "",
      textColor: "black",
    });
  }

  chnageTextColor(event) {
    this.setState({
      textColor: "blue",
    });
  }

  render() {
    const { namaUser, textColor } = this.state;
    return (
      <div style={{ padding: "20px" }}>
        <h2><span style={{color:textColor }}>Halo</span>, {namaUser || "Tamu"}!</h2>

        {/* Event Handling On Input */}
        <input
          type="text"
          placeholder="ketik namamu..."
          value={this.state.namaUser}
          onChange={this.eventChangeHandler}
        />

        {/* Event For Reset Button */}
        <button onClick={this.eventResetHandler} style={{ marginLeft: "10px" }}>
          Reset Name
        </button>

        <button onClick={this.chnageTextColor} style={{ marginLeft: "10px" }}> Change Color</button>
      </div>
    );
  }
}

export default UpdateTextRealTime;
