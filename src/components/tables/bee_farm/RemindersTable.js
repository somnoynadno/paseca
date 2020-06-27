import React from "react";
import {Button, ButtonGroup, Icon, Modal, Segment, Table} from "semantic-ui-react";
import {DELETE_API} from "../../../http/DELETE_API";
import DeleteModal from "../../modal/DeleteModal";
import {POST_API} from "../../../http/POST_API";
import CreateReminderForm from "../../forms/bee_farm/create/CreateReminderForm";
import PropTypes from "prop-types";
import {GET_API} from "../../../http/GET_API";
import {sortByKey} from "../../../helpers";


class RemindersTable extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            reminders: null,
            modalOpen: false,
            order: false
        }

        this.deleteAPI = new DELETE_API();
        this.postAPI = new POST_API();
        this.getAPI = new GET_API();
    }

    deleteReminder = async (id) => {
        await this.deleteAPI.DeleteReminderByID(id)
            .then((resp) => {
                // everything is fine => remove delete button
                document.getElementById("delete-cell-" + id).innerHTML = 'успешно удалено';
                document.getElementById("delete-cell-" + id).style.color = 'green';
            })
    }

    checkReminder = async (id) => {
        await this.postAPI.CheckReminderByID(id)
            .then((resp) => {
                // everything is fine => disable check button
                document.getElementById("check-" + id).disabled = true;
            })
    }

    fetchData = async () => {
        let data = await this.getAPI.GetRemindersByBeeFarmID(this.props.beeFarmID);
        this.setState({
            reminders: data,
            modalOpen: false
        });
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    render() {
        if (this.state.reminders === null) return <Segment style={{minHeight: "100px"}} loading />
        else return <div>
            <Modal open={this.state.modalOpen}
                   onClose={() => this.setState({modalOpen: false})}
                   trigger={<Button
                        color='green'
                        content='Создать напоминание'
                        size='medium'
                        icon='attention'
                        onClick={() => this.setState({modalOpen: true})}
                   />}>
                <Modal.Header>Новое напоминание</Modal.Header>
                <Modal.Content>
                    <CreateReminderForm
                        reloadCallback={this.fetchData.bind(this)}
                        beeFarmID={this.props.beeFarmID}
                    />
                </Modal.Content>
            </Modal>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Название</Table.HeaderCell>
                        <Table.HeaderCell>Описание</Table.HeaderCell>
                        <Table.HeaderCell>
                            Дата
                            <Icon link name='arrow down' onClick={() =>
                                this.setState({reminders: sortByKey(this.state.reminders, "date", this.state.order),
                                    order: !this.state.order})} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>Опции</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.reminders.map((r, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{r["title"]}</Table.Cell>
                            <Table.Cell>{r.text.split('\n').map((text) => {
                                return <p>{text}</p>
                            })}</Table.Cell>
                            <Table.Cell>
                                {(new Date(r["date"])).toLocaleString('ru', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',})}
                            </Table.Cell>
                            <Table.Cell id={"delete-cell-" + r.id}>
                                <ButtonGroup>
                                    <Button id={"check-" + r.id} color="green" icon="check"
                                            disabled={r["is_checked"]}
                                            onClick={this.checkReminder.bind(this, r.id)} />
                                    <DeleteModal deleteCallback={this.deleteReminder.bind(this, r.id)} />
                                </ButtonGroup>
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    }
}

export default RemindersTable;
