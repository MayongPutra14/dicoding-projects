import React, {Component} from "react";
import { FiArchive, FiUpload } from "react-icons/fi";

class ArchiveButton extends Component{
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const {id, archived, onArchive, onUnarchive} = this.props;
        if(archived) {
            onUnarchive(id)
        }else {
            onArchive(id)
        }
    }

    render() {
        const {archived} = this.props
        return <button className="action" onClick={this.handleClick}>{archived ? <FiUpload/> : <FiArchive/>} </button>
    }
}

export default ArchiveButton