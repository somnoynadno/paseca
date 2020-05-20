import React from "react";
import {Button, Table} from "semantic-ui-react";


class BeeFarmHivesTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Номер</Table.HeaderCell>
                        <Table.HeaderCell>Тип улья</Table.HeaderCell>
                        <Table.HeaderCell>Размер улья</Table.HeaderCell>
                        <Table.HeaderCell>Формат рамки</Table.HeaderCell>
                        <Table.HeaderCell>Опции</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.beeFarm["hives"].map((hive, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{hive["name"]}</Table.Cell>
                            <Table.Cell>{hive["hive_format"]["name"]}</Table.Cell>
                            <Table.Cell>{hive["hive_format"]["size"]}</Table.Cell>
                            <Table.Cell>{hive["hive_frame_type"]["name"]}</Table.Cell>
                            <Table.Cell><Button>Изменить</Button></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    }
}

export default BeeFarmHivesTable;
