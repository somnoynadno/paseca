import React from "react";
import {Button, Modal, Segment, Table} from "semantic-ui-react";
import DeleteModal from "../modal/DeleteModal";
import {DELETE_API} from "../http/DELETE_API";
import CreateCustomBeeBreedForm from "../forms/create_custom/CreateCustomBeeBreedForm";
import {GET_API} from "../http/GET_API";


class BeeBreedsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            beeBreeds: null
        }

        this.getAPI = new GET_API();
        this.deleteAPI = new DELETE_API();
    }

    deleteBeeBreed = async (id) => {
        this.deleteAPI.DeleteBeeBreedByID(id)
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
        let resp = await this.getAPI.GetBeeBreeds();
        this.setState({beeBreeds: resp});
    }

    render() {
        if (this.state.beeBreeds === null) return <Segment style={{minHeight: "100px"}} loading />
        else return <div>
            <Modal trigger={<Button
                color='green'
                content='Новая порода'
                size='medium'
                icon='add'
                floated='right'
                style={{margin: "0"}}
            />}>
                <Modal.Header>Новая порода пчёл</Modal.Header>
                <Modal.Content>
                    <CreateCustomBeeBreedForm />
                </Modal.Content>
            </Modal>
            <div><h2>Породы пчёл</h2></div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Порода</Table.HeaderCell>
                        <Table.HeaderCell>Описание</Table.HeaderCell>
                        <Table.HeaderCell>Опции</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.beeBreeds.map((bb, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{i+1}</Table.Cell>
                            <Table.Cell>{bb["name"]}</Table.Cell>
                            <Table.Cell>{bb["description"].split('\n').map((text) => {
                                return <p>{text}</p>
                            })}</Table.Cell>
                            <Table.Cell>
                                <DeleteModal deleteCallback={this.deleteBeeBreed.bind(this, bb.id)} />
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    }
}

export default BeeBreedsTable;
