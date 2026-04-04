import React, { Component } from "react";
import { FiTrash2 } from "react-icons/fi";

class DeleteButton extends Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(){
        this.props.onDelete(this.props.id)
    }

    render() {
        return (
            <button className="action" onClick={this.handleDelete}><FiTrash2/></button>
        )
    }
}

export default DeleteButton