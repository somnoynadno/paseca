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
            for (let j = 0; j < this.maxX; j++) {
                columns.push(<Popup key={j} content='Офигенный улей' basic trigger={<div className="block-style" />} />);
            }
            rows.push(<div key={i} className="row-style">{columns}</div>);
        }

        return <div style={{width: "auto", overflowX: "scroll", overflowY: "scroll", boxShadow: "2px 2px 2px gray"}}>
            <div style={{width: this.maxX*12, height:this.maxY*12, boxSizing: "border-box"}}>
                {rows}
            </div>
        </div>

    }
}

export default PasecaModel;
