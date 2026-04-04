import React, { Component } from "react";
import PropTypes from "prop-types";

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.initialTitle || "",
      body: props.initialBody || "",
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);

    this.setState({
      title: "",
      body: "",
    });
  }

  render() {
    const { title, body } = this.state;
    return (
      <form className="add-new-page__input" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="add-new-page__input__title"
          placeholder="Judul catatan"
          value={title}
          onChange={this.handleTitleChange}
          required
        />

        <textarea
          className="add-new-page__input__body"
          data-placeholder="Isi catatan..."
          value={body}
          onChange={this.handleBodyChange}
          required
        >
        </textarea>

        <div className="add-new-page__action">
          <button type="submit" className="action">
            +
          </button>
        </div>
      </form>
    );
  }
}

NoteForm.propTypes = {
  initialTitle: PropTypes.string,
  initialBody: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default NoteForm;
