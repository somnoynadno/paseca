import React from "react";
import {Button, ButtonGroup, Table} from "semantic-ui-react";
import {DELETE_API} from "../../../http/DELETE_API";
import DeleteModal from "../../modal/DeleteModal";
import {POST_API} from "../../../http/POST_API";


class RemindersTable extends React.Component {
    constructor(props) {
        super(props);

        this.deleteAPI = new DELETE_API();
        this.postAPI = new POST_API();
    }

    deleteReminder = async (id) => {
        await this.deleteAPI.DeleteReminderByID(id)
            .then((resp) => {
                if (resp.constructor !== Error) {
                    // everything is fine => remove delete button
                    document.getElementById("delete-cell-" + id).innerHTML = 'успешно удалено';
                    document.getElementById("delete-cell-" + id).style.color = 'green';
                } else {
                    console.log(resp.message);
                }
            })
    }

    checkReminder = async (id) => {
        await this.postAPI.CheckReminderByID(id)
            .then((resp) => {
                if (resp.constructor !== Error) {
                    // everything is fine => disable check button
                    document.getElementById("check-" + id).disabled = true;
                } else {
                    console.log(resp.message);
                }
            })
    }

    render() {
        return <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Название</Table.HeaderCell>
                        <Table.HeaderCell>Описание</Table.HeaderCell>
                        <Table.HeaderCell>Дата</Table.HeaderCell>
                        <Table.HeaderCell>Опции</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.beeFarm["reminders"].map((r, i) => {
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
