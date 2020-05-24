import React from "react";

import "./PasecaModel.css"
import {Button, Popup} from "semantic-ui-react";
import ChooseBeeFamilyToHiveForm from "../forms/choose/ChooseBeeFamilyToHiveForm";
import ChooseHiveForm from "../forms/choose/ChooseHiveForm";
import {POST_API} from "../http/POST_API";

class PasecaModel extends React.Component {
    constructor(props) {
        super(props);

        this.maxX = this.props.maxX;
        this.maxY = this.props.maxY;

        this.state = {
            beeFarm: this.props.beeFarm
        }

        this.api = new POST_API();

        this.hives = this.state.beeFarm["hives"];
        this.beeFamilies = this.state.beeFarm["bee_families"];
    }

    async evictBeeFamily(hiveID) {
        await this.api.SetHiveBeeFamily(hiveID, null)
            .then((resp) => {
                if (resp.constructor !== Error) {
                    // everything is fine => reload page
                    document.location.reload();
                } else console.log(resp)
            });
    }

    async removeHive(hiveID) {
        await this.api.SetHiveCoords(hiveID, null, null)
            .then((resp) => {
                if (resp.constructor !== Error) {
                    // everything is fine => reload page
                    document.location.reload();
                } else console.log(resp)
            });
    }

    render() {
        // это просто охуевшее дерьмо с трудоёмость O(n^4), но соре
        let rows = [];
        for (let i = 0; i < this.maxY; i++) {
            let columns = [];
            for (let j = 0; j < this.maxX; j++) {
                let color = "white";
                let action = <ChooseHiveForm coordX={j} coordY={i} /> ;

                // check for hive
                for (let hive of this.hives) {
                    if (hive["coord_x"] === j && hive["coord_y"] === i) {
                        let pre = <span><strong>Улей: {hive.name}</strong>
                            <br />Рамка: <u>{hive["hive_frame_type"].name}</u>
                            <br />Формат: {hive["hive_format"].name + " (" + hive["hive_format"].size + ")"}
                            <br /><br /></span>;
                        if (hive["bee_family_id"]) {
                            action = <Button onClick={this.evictBeeFamily.bind(this, hive.id)}>
                                            Выселить</Button>;
                            let family = this.beeFamilies.find(family => family.id === hive["bee_family_id"]);
                            console.log(hive)
                            console.log(family)
                            color = family["bee_family_status"].color;
                            pre = <span>{pre}
                                <strong>Семья: {family.name}</strong><br />
                                <i>Последний осмотр: <br />
                                {family["last_inspection_date"] ? (new Date(family["last_inspection_date"]))
                                    .toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',}) : '[нет данных]'}</i>
                                <br />
                            </span>;
                        }
                         else {
                            color = "gray";
                            action = <div>
                                        <ChooseBeeFamilyToHiveForm hiveID={hive.id} />
                                        <Button onClick={this.removeHive.bind(this, hive.id)}>Убрать улей</Button>
                                    </div>
                        }
                        action = <div>{pre}<br /><Button.Group vertical>{action}</Button.Group></div>;
                        break;
                    }
                }
                columns.push(<Popup pinned basic key={j} content={action} on='click'
                                    trigger={<div style={{backgroundColor: color}}
                                                  className="block-style" />} />);
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
