import React from "react";

import "./PasecaModel.css"
import {Popup} from "semantic-ui-react";

class PasecaModel extends React.Component {
    constructor(props) {
        super(props);

        this.maxX = this.props.maxX;
        this.maxY = this.props.maxY;
    }

    render() {
        let rows = [];
        for (let i = 0; i < this.maxY; i++) {
            let columns = [];
            for (let i = 0; i < this.maxX; i++) {
                columns.push(<Popup content='Офигенный улей' basic trigger={<div className="block-style" />} />);
            }
            rows.push(<div className="row-style">{columns}</div>);
        }

        return <div style={{width: this.maxX*12, height:this.maxY*12, boxShadow: "2px 2px 2px gray"}}>
            {rows}
        </div>

    }
}

export default PasecaModel;
