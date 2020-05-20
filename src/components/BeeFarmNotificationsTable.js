import React from "react";
import {Button, ButtonGroup, Table} from "semantic-ui-react";


class BeeFarmNotificationsTable extends React.Component {
    constructor(props) {
        super(props);
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
                            <Table.Cell>{r["text"]}</Table.Cell>
                            <Table.Cell>{r["date"]}</Table.Cell>
                            <Table.Cell>
                                <ButtonGroup vertical>
                                    <Button>Прочитано</Button>
                                    <Button>Удалить</Button>
                                </ButtonGroup>
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    }
}

export default BeeFarmNotificationsTable;
