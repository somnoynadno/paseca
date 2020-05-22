import React from "react";

import "./PasecaModel.css"
import {Button, Popup} from "semantic-ui-react";

class PasecaModel extends React.Component {
    constructor(props) {
        super(props);

        this.maxX = this.props.maxX;
        this.maxY = this.props.maxY;

        this.state = {
            beeFarm: this.props.beeFarm
        }

        this.hives = this.state.beeFarm["hives"];
        this.beeFamilies = this.state.beeFarm["bee_families"];
    }

    render() {
        // это просто охуевшее дерьмо с трудоёмость O(n^4), но соре
        let rows = [];
        for (let i = 0; i < this.maxY; i++) {
            let columns = [];
            for (let j = 0; j < this.maxX; j++) {
                let color = "white";
                let action = <Button>Поставить улей</Button>;

                // check for hive
                for (let hive of this.hives) {
                    if (hive["coord_x"] === j && hive["coord_y"] === i) {
                        let pre = <span><strong>Улей: {hive.name}</strong>
                            <br />Рамка: <u>{hive["hive_frame_type"].name}</u>
                            <br />Формат: {hive["hive_format"].name + " (" + hive["hive_format"].size + ")"}
                            <br /><br /></span>;
                        if (hive["bee_family_id"]) {
                            action = <Button>Выселить</Button>;
                            let family = this.beeFamilies.find(item => item.id = hive["bee_family_id"]);
                            color = family["bee_family_status"].color;
                            pre = <span>{pre}
                                <strong>Семья: {family.name}</strong><br />
                                <i>Последний осмотр: <br />
                                {family["last_inspection_date"] ? (new Date(family["last_inspection_date"])).toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',}) : '[нет данных]'}</i>
                                <br />
                            </span>;
                        }
                         else {
                            color = "gray";
                            action = <Button>Заселить</Button>;
                        }
                        let post = <Button>Убрать улей</Button>;
                        action = <div>{pre}<br /><Button.Group vertical>{action}{post}</Button.Group></div>;
                        break;
                    }
                }
                columns.push(<Popup pinned basic key={j} content={action} on='click'
                                    trigger={<div style={{backgroundColor: color}} className="block-style" />} />);
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
