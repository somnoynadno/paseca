import React from "react";
import {Button, ButtonGroup, Icon, Modal, Segment, Table} from "semantic-ui-react";
import {DELETE_API} from "../../../http/DELETE_API";
import DeleteModal from "../../modal/DeleteModal";
import {POST_API} from "../../../http/POST_API";
import PropTypes from "prop-types";
import {GET_API} from "../../../http/GET_API";
import CreateSwarmForm from "../../forms/bee_farm/create/CreateSwarmForm";
import EditSwarmForm from "../../forms/bee_farm/edit/EditSwarmForm";
import {sortByKey} from "../../../helpers";


class SwarmsTable extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
        history: PropTypes.any.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            swarms: null,
            modalEditOpen: false,
            modalCreateOpen: false,
            order: false
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
            modalEditOpen: false,
            modalCreateOpen: false
        });
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    render() {
        let r = null;
        if (parseInt(localStorage.getItem("subscription_type_id")) < 3) r = '/subscription_not_sufficient';
        else if (localStorage.getItem("subscription_expired") === 'true') r = '/subscription_expired';

        if (r) {
            localStorage.setItem("bee_farm_active_item", null);
            this.props.history.push({pathname: r});
        }

        if (this.state.swarms === null) return <Segment style={{minHeight: "100px"}} loading />
        else return <div>
            <Modal open={this.state.modalCreateOpen}
                   onClose={() => this.setState({modalCreateOpen: false})}
                   trigger={<Button
                       color='orange'
                       content='Создать роение'
                       size='medium'
                       icon='certificate'
                       onClick={() => this.setState({modalCreateOpen: true})}
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
                        <Table.HeaderCell>
                            Семья
                            <Icon link name='arrow down' onClick={() =>
                                this.setState({swarms: sortByKey(this.state.swarms, "bee_family_id", this.state.order),
                                    order: !this.state.order})} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Порядок
                            <Icon link name='arrow down' onClick={() =>
                                this.setState({swarms: sortByKey(this.state.swarms, "order", this.state.order),
                                    order: !this.state.order})} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Статус
                            <Icon link name='arrow down' onClick={() =>
                                this.setState({swarms: sortByKey(this.state.swarms, "swarm_status_id", this.state.order),
                                    order: !this.state.order})} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Дата
                            <Icon link name='arrow down' onClick={() =>
                                this.setState({swarms: sortByKey(this.state.swarms, "date", this.state.order),
                                    order: !this.state.order})} />
                        </Table.HeaderCell>
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
                                    <Modal open={this.state.modalEditOpen}
                                           onClose={() => this.setState({modalEditOpen: false})}
                                           trigger={<Button
                                               color='green'
                                               size='medium'
                                               icon='pencil'
                                               onClick={() => this.setState({modalEditOpen: true})}
                                           />}>
                                        <Modal.Header>Изменить роение</Modal.Header>
                                        <Modal.Content>
                                            <EditSwarmForm
                                                reloadCallback={this.fetchData.bind(this)}
                                                swarm={s}
                                            />
                                        </Modal.Content>
                                    </Modal>
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
