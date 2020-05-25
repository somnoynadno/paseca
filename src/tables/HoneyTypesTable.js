import React from "react";
import {Button, Modal, Segment, Table} from "semantic-ui-react";
import DeleteModal from "../modal/DeleteModal";
import {DELETE_API} from "../http/DELETE_API";
import {GET_API} from "../http/GET_API";
import CreateCustomHoneyTypeForm from "../forms/create_custom/CreateCustomHoneyTypeForm";


class HoneyTypesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            honeyTypes: null
        }

        this.getAPI = new GET_API();
        this.deleteAPI = new DELETE_API();
    }

    deleteHoneyType = async (id) => {
        await this.deleteAPI.DeleteHoneyTypeByID(id)
            .then((resp) => {
                if (resp.constructor !== Error) {
                    // everything is fine => reload page
                    document.location.reload();
                } else {
                    console.log(resp.message);
                }
            })
    }

    componentDidMount = async () => {
        let resp = await this.getAPI.GetHoneyTypes();
        this.setState({honeyTypes: resp});
    }

    render() {
        if (this.state.honeyTypes === null) return <Segment style={{minHeight: "100px"}} loading />
        else return <div>
            <Modal trigger={<Button
                color='green'
                content='Новый сорт мёда'
                size='medium'
                icon='add'
                floated='right'
                style={{margin: "0"}}
            />}>
                <Modal.Header>Новый сот мёда</Modal.Header>
                <Modal.Content>
                    <CreateCustomHoneyTypeForm />
                </Modal.Content>
            </Modal>
            <div><h2>Типы рамок</h2></div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Название</Table.HeaderCell>
                        <Table.HeaderCell>Цена за кг</Table.HeaderCell>
                        <Table.HeaderCell>Описание</Table.HeaderCell>
                        <Table.HeaderCell>Опции</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.honeyTypes.map((ht, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{i+1}</Table.Cell>
                            <Table.Cell>{ht["name"]}</Table.Cell>
                            <Table.Cell>{ht["base_price"]}</Table.Cell>
                            <Table.Cell>{ht["description"].split('\n').map((text) => {
                                return <p>{text}</p>
                            })}</Table.Cell>
                            <Table.Cell>
                                <DeleteModal deleteCallback={this.deleteHoneyType.bind(this, ht.id)} />
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    }
}

export default HoneyTypesTable;
