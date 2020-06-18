import React from "react";
import {Button, ButtonGroup, Modal, Segment, Table} from "semantic-ui-react";
import {DELETE_API} from "../../../http/DELETE_API";
import DeleteModal from "../../modal/DeleteModal";
import {POST_API} from "../../../http/POST_API";
import PropTypes from "prop-types";
import {GET_API} from "../../../http/GET_API";
import CreateSwarmForm from "../../forms/bee_farm/create/CreateSwarmForm";


class SwarmsTable extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
        history: PropTypes.any.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            swarms: null,
            modalOpen: false
        }

        this.deleteAPI = new DELETE_API();
        this.postAPI = new POST_API();
        this.getAPI = new GET_API();
    }

    deleteSwarm = async (id) => {
        await this.deleteAPI.DeleteSwarmByID(id)
            .then((resp) => {
                // everything is fine => remove delete button
                document.getElementById("delete-cell-" + id).innerHTML = 'успешно удалено';
                document.getElementById("delete-cell-" + id).style.color = 'green';
            })
    }

    fetchData = async () => {
        let data = await this.getAPI.GetSwarmsByBeeFarmID(this.props.beeFarmID);
        this.setState({
            swarms: data,
            modalOpen: false
        });
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    render() {
        let r = null;
        if (parseInt(localStorage.getItem("subscription_type_id")) < 2) r = '/subscription_not_sufficient';
        else if (localStorage.getItem("subscription_expired")) r = '/subscription_expired';

        if (r) {
            localStorage.setItem("bee_farm_active_item", null);
            this.props.history.push({pathname: r});
        }

        if (this.state.swarms === null) return <Segment style={{minHeight: "100px"}} loading />
        else return <div>
            <Modal open={this.state.modalOpen}
                   onClose={() => this.setState({modalOpen: false})}
                   trigger={<Button
                       color='orange'
                       content='Создать роение'
                       size='medium'
                       icon='certificate'
                       onClick={() => this.setState({modalOpen: true})}
                   />}>
                <Modal.Header>Новое роение</Modal.Header>
                <Modal.Content>
                    <CreateSwarmForm
                        reloadCallback={this.fetchData.bind(this)}
                        beeFarmID={this.props.beeFarmID}
                    />
                </Modal.Content>
            </Modal>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Семья</Table.HeaderCell>
                        <Table.HeaderCell>Порядок</Table.HeaderCell>
                        <Table.HeaderCell>Статус</Table.HeaderCell>
                        <Table.HeaderCell>Дата</Table.HeaderCell>
                        <Table.HeaderCell>Опции</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.swarms.map((s, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{s["bee_family"]["name"]}</Table.Cell>
                            <Table.Cell>{s["order"]}</Table.Cell>
                            <Table.Cell>{s["swarm_status"]["status"]}</Table.Cell>
                            <Table.Cell>
                                {(new Date(s["date"])).toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',})}
                            </Table.Cell>
                            <Table.Cell id={"delete-cell-" + s.id}>
                                <ButtonGroup>
                                    <DeleteModal deleteCallback={this.deleteSwarm.bind(this, s.id)} />
                                </ButtonGroup>
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    }
}

export default SwarmsTable;
