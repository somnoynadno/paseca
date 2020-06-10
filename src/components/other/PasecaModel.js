import React from "react";
import {Button, Popup, Segment} from "semantic-ui-react";
import ChooseBeeFamilyToHiveForm from "../forms/bee_farm/choose/ChooseBeeFamilyToHiveForm";
import ChooseHiveForm from "../forms/bee_farm/choose/ChooseHiveForm";
import {POST_API} from "../../http/POST_API";

import "./PasecaModel.css"
import PropTypes from "prop-types";
import {GET_API} from "../../http/GET_API";

/*
 Компонент схемы пасеки. Принимает в props
 размер схемы и ID пасеки.
 */
class PasecaModel extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
        maxX: PropTypes.number.isRequired,
        maxY: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

        this.maxX = this.props.maxX;
        this.maxY = this.props.maxY;

        this.postAPI = new POST_API();
        this.getAPI = new GET_API();

        this.state = {
            hives: null,
            beeFamilies: null
        }
    }

    async evictBeeFamily(hiveID) {
        await this.postAPI.SetHiveBeeFamily(hiveID, null)
            .then(async (resp) => {
                // everything is fine => reload component
                await this.reload();
            });
    }

    async removeHive(hiveID) {
        await this.postAPI.SetHiveCoords(hiveID, null, null, this.props.beeFarmID)
            .then(async (resp) => {
                // everything is fine => reload component
                await this.reload();
            });
    }

    fetchBeeFamilies = async () => {
        let data = await this.getAPI.GetBeeFamiliesByBeeFarmID(this.props.beeFarmID);
        this.setState({beeFamilies: data});
    }

    fetchHives = async () => {
        let data = await this.getAPI.GetHivesByBeeFarmID(this.props.beeFarmID);
        this.setState({hives: data});
    }

    reload = async () => {
        await this.fetchHives();
        await this.fetchBeeFamilies();
    }

    componentDidMount = async () => {
        await this.reload();
    }

    render() {
        if (this.state.beeFamilies === null || this.state.hives === null) {
            return <Segment style={{minHeight: "100px"}} loading />
        } else {
            let rows = [];
            // идём по всем координатам
            for (let i = 0; i < this.maxY; i++) {
                let columns = [];
                for (let j = 0; j < this.maxX; j++) {
                    let color = "white";
                    let action = <ChooseHiveForm coordX={j} coordY={i}
                                                 reloadCallback={this.reload.bind(this)}
                                                 beeFarmID={this.props.beeFarmID} /> ;
                    // проверяем ульи на сходство с координатой
                    for (let hive of this.state.hives) {
                        if (hive["coord_x"] === j && hive["coord_y"] === i) {
                            let pre = <span><strong>Улей: {hive.name}</strong>
                                <br />Рамка: <u>{hive["hive_frame_type"].name}</u>
                                <br />Формат: {hive["hive_format"].name + " (" + hive["hive_format"].size + ")"}
                                <br /><br /></span>;
                            // проверяем наличие семьи в улье
                            if (hive["bee_family_id"]) {
                                action = <Button onClick={this.evictBeeFamily.bind(this, hive.id)}>
                                                Выселить</Button>;
                                let family = this.state.beeFamilies.find(family => family.id === hive["bee_family_id"]);
                                if (family) {
                                    // семья нашлась
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
                                } else {
                                    // семья была удалена, улей пуст
                                    color = "gray";
                                    action = <div>
                                        <ChooseBeeFamilyToHiveForm reloadCallback={this.reload.bind(this)} hiveID={hive.id} />
                                        <Button onClick={this.removeHive.bind(this, hive.id)}>Убрать улей</Button>
                                    </div>
                                }
                            }
                             else {
                                 // семьи никогда не было, улей пуст
                                color = "gray";
                                action = <div>
                                            <ChooseBeeFamilyToHiveForm reloadCallback={this.reload.bind(this)} hiveID={hive.id} />
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

            // собираем схему пасеки
            return <div style={{overflowX: "scroll", overflowY: "scroll", marginTop: "5px"}}>
                <div style={{width: this.maxX*12, height:this.maxY*12, boxSizing: "border-box"}}>
                    {rows}
                </div>
                <Button onClick={this.reload.bind(this)} style={{marginTop: "10px"}} icon={"redo alternate"} />
            </div>
        }
    }
}

export default PasecaModel;
