import React from "react";
import {Button, Table} from "semantic-ui-react";


class BeeFarmFamiliesTable extends React.Component {
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
                            <Table.Cell>{bf["hive"]["id"] !== 0 ? bf["hive"]["name"] : '-'}</Table.Cell>
                            <Table.Cell>{bf["bee_family_status"]["status"]}</Table.Cell>
                            <Table.Cell><Button>Просмотр</Button></Table.Cell>
                        </Table.Row>
                    })}
                    </Table.Body>
                </Table>
            </div>
    }
}

export default BeeFarmFamiliesTable;
