import React from "react";
import {Button, Modal, Segment, Table} from "semantic-ui-react";
import DeleteModal from "../../modal/DeleteModal";
import {DELETE_API} from "../../../http/DELETE_API";
import {GET_API} from "../../../http/GET_API";
import CreateCustomHiveFrameTypeForm from "../../forms/custom_types/CreateCustomHiveFrameTypeForm";


class HiveFrameTypesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hiveFrameTypes: null
        }

        this.getAPI = new GET_API();
        this.deleteAPI = new DELETE_API();
    }

    deleteHiveFrameType = async (id) => {
        await this.deleteAPI.DeleteHiveFrameTypeByID(id)
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
        let resp = await this.getAPI.GetHiveFrameTypes();
        this.setState({hiveFrameTypes: resp});
    }

    render() {
        if (this.state.hiveFrameTypes === null) return <Segment style={{minHeight: "100px"}} loading />
        else return <div>
            <Modal trigger={<Button
                color='green'
                content='Новый тип рамки'
                size='medium'
                icon='add'
                floated='right'
                style={{margin: "0"}}
            />}>
                <Modal.Header>Новый тип рамки улья</Modal.Header>
                <Modal.Content>
                    <CreateCustomHiveFrameTypeForm />
                </Modal.Content>
            </Modal>
            <div><h2>Типы рамок</h2></div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Название</Table.HeaderCell>
                        <Table.HeaderCell>Опции</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.hiveFrameTypes.map((hft, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{i+1}</Table.Cell>
                            <Table.Cell>{hft["name"]}</Table.Cell>
                            <Table.Cell>
                                <DeleteModal deleteCallback={this.deleteHiveFrameType.bind(this, hft.id)} />
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    }
}

export default HiveFrameTypesTable;
