import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Container, Grid, Loader, Modal, Segment, Table} from "semantic-ui-react";
import CreatePollenHarvestForm from "../forms/create/CreatePollenHarvestForm";
import {GET_API} from "../http/GET_API";
import DeleteModal from "../modal/DeleteModal";
import {DELETE_API} from "../http/DELETE_API";


class PollenHarvest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pollenHarvests: null,
            harvestsNum: ''
        }

        this.getAPI = new GET_API();
        this.deleteAPI = new DELETE_API();
    }

    deletePollenHarvest = async (id) => {
        await this.deleteAPI.DeletePollenHarvestByID(id)
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

    componentDidMount = async () => {
        let harvests = await this.getAPI.GetUsersPollenHarvests();
        this.setState({
            pollenHarvests: harvests,
            harvestsNum: harvests.length
        });
    }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Медосбор'} />
                <Segment>
                    <Grid>
                        <Grid.Row columns={2} relaxed='very'>
                            <Grid.Column>
                                <h1 style={{textAlign: "center"}}>Сборы пыльцы</h1>
                            </Grid.Column>
                            <Grid.Column>
                                <Modal trigger={<Button
                                    color='green'
                                    content='Добавить'
                                    size='medium'
                                    icon='pencil'
                                    floated='right'
                                    label={{ basic: true, color: 'green', pointing: 'left', content: this.state.harvestsNum }}
                                    style={{marginRight: "30px"}}
                                />}>
                                    <Modal.Header>Добавить сбор</Modal.Header>
                                    <Modal.Content>
                                        <CreatePollenHarvestForm />
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Пасека</Table.HeaderCell>
                                <Table.HeaderCell>Дата</Table.HeaderCell>
                                <Table.HeaderCell>Количество (кг)</Table.HeaderCell>
                                <Table.HeaderCell>Опции</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.pollenHarvests === null ? <Table.Row><Loader active inline /></Table.Row> :
                                this.state.pollenHarvests.map((s) => {
                                    return <Table.Row>
                                        <Table.Cell>{s["bee_farm"].name}</Table.Cell>
                                        <Table.Cell>
                                            {s["date"] === null ? '' :
                                                (new Date(s["date"])).toLocaleString('ru', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',})
                                            }
                                        </Table.Cell>
                                        <Table.Cell>{s["amount"]}</Table.Cell>
                                        <Table.Cell id={"delete-cell-" + s.id}>
                                            <DeleteModal deleteCallback={this.deletePollenHarvest.bind(this, s.id)} />
                                        </Table.Cell>
                                    </Table.Row>
                                })
                            }
                        </Table.Body>
                    </Table>
                </Segment>
            </Container>
        </div>
    }
}

export default PollenHarvest;
