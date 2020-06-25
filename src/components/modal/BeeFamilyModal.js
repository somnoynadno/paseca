import {Button, Modal} from "semantic-ui-react";
import React from "react";
import PropTypes from "prop-types";
import {GET_API} from "../../http/GET_API";
import EditBeeFamilyForm from "../forms/bee_farm/edit/EditBeeFamilyForm";


class BeeFamilyModal extends React.Component {
    static propTypes = {
        beeFamilyID : PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            beeFamily: null,
            modalOpen: false
        }

        this.getAPI = new GET_API();
    }

    fetchBeeFamily = async () => {
        let bf = await this.getAPI.GetBeeFamilyByID(this.props.beeFamilyID);
        this.setState({
            beeFamily: bf,
            modalOpen: false
        })
    }

    render() {
        let bf = this.state.beeFamily;

        if (bf === null) {
            return <Modal trigger={<Button
                color='green'
                size='medium'
                icon='pencil'
                onClick={this.fetchBeeFamily.bind(this)}
            />}> </Modal>
        } else return <Modal trigger={<Button
            color='green'
            size='medium'
            icon='pencil'
        />}>
            <Modal.Header>Семья {bf.name}</Modal.Header>
            <Modal open={this.state.modalOpen}
                   onClose={() => this.setState({modalOpen: false})}
                   trigger={<Button
                       floated={"right"}
                       color='blue'
                       content='Изменить семью'
                       size='medium'
                       icon='pencil'
                       style={{margin: "15px"}}
                       onClick={() => this.setState({modalOpen: true})}
                   />}>
                <Modal.Header>Изменить семью</Modal.Header>
                <Modal.Content>
                    <EditBeeFamilyForm
                        reloadCallback={this.fetchBeeFamily.bind(this)}
                        beeFamily={this.state.beeFamily}
                    />
                </Modal.Content>
            </Modal>
            <Modal.Content>
                <h3>Информация</h3>
                <ul>
                    <li>Статус: {bf["bee_family_status"].status}</li>
                    <li>Порода: {bf["bee_breed"].name}</li>
                    <li>Контрольная: {bf["is_control"] ? 'да' : 'нет'}</li>
                    <li>Улей: {bf["hive"] ? bf["hive"]["name"] : '-'}</li>
                    {bf["parent1"] ? <li>Родитель: {bf["parent1"].name}</li>: ''}
                    {bf["parent2"] ? <li>Родитель: {bf["parent2"].name}</li>: ''}
                </ul>
                <hr />
                <h3>Болезни</h3>
                <ul>
                    {bf["bee_diseases"] ? bf["bee_diseases"].map((d) => {
                        return <li>{d.name}</li>
                    }) : ''}
                </ul>
                <hr />
                <h3>Роения</h3>
                <ul>
                    {bf["swarms"] ? bf["swarms"].map((s) => {
                        return <li>{s["swarm_status"].status + ", порядок: " + s["order"]}</li>
                    }) : ''}
                </ul>
                <hr />
                <h3>Сборы мёда</h3>
                <ul>
                    {bf["honey_harvests"] ? bf["honey_harvests"].map((hh) => {
                        return <li>{hh["amount"] + " кг (" + (new Date(hh["date"]))
                            .toLocaleString('ru', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) + ")"}</li>
                    }) : ''}
                </ul>
                <hr />
                {bf["is_control"] === true ? <span>
                    <h3>Контрольные сборы</h3>
                    <ul>
                        {bf["control_harvests"] ? bf["control_harvests"].map((ch) => {
                            return <li>{ch["amount"] + " кг (" + (new Date(ch["date"]))
                                .toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }) + ")"}</li>
                        }) : ''}
                    </ul>
                </span> : ''}
            </Modal.Content>
        </Modal>
    }
}

export default BeeFamilyModal;
