import React from "react";
import {Button, Table} from "semantic-ui-react";
import DeleteModal from "../modal/DeleteModal";
import {DELETE_API} from "../http/DELETE_API";


class BeeFarmBeeFamiliesTable extends React.Component {
    constructor(props) {
        super(props);

        this.deleteAPI = new DELETE_API();
    }

    deleteBeeFamily = async (id) => {
        await this.deleteAPI.DeleteBeeFamilyByID(id)
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

    render() {
        return <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Семья</Table.HeaderCell>
                            <Table.HeaderCell>Улей</Table.HeaderCell>
                            <Table.HeaderCell>Статус</Table.HeaderCell>
                            <Table.HeaderCell>Опции</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.props.beeFarm["bee_families"].map((bf, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{bf["name"]}</Table.Cell>
                            <Table.Cell>{bf["hive"] !== undefined ? bf["hive"]["name"] : '-'}</Table.Cell>
                            <Table.Cell>{bf["bee_family_status"]["status"]}</Table.Cell>
                            <Table.Cell id={"delete-cell-" + bf.id}>
                                <Button>Просмотр</Button>
                                <DeleteModal deleteCallback={this.deleteBeeFamily.bind(this, bf.id)} />
                            </Table.Cell>
                        </Table.Row>
                    })}
                    </Table.Body>
                </Table>
            </div>
    }
}

export default BeeFarmBeeFamiliesTable;
