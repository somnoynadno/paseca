import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Container, Grid, Loader, Modal, Segment, Table} from "semantic-ui-react";
import CreateHoneyHarvestForm from "../forms/CreateHoneyHarvestForm";
import {GET_API} from "../http/GET_API";


class HoneyHarvest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            honeyHarvests: null,
            harvestsNum: ''
        }

        this.api = new GET_API();
    }

    componentDidMount = async () => {
        let harvests = await this.api.GetUsersHoneyHarvests();
        this.setState({
            honeyHarvests: harvests,
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
                                <h1 style={{textAlign: "center"}}>Учёт сбора мёда</h1>
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
                                    <Modal.Header>Новый медосбор</Modal.Header>
                                    <Modal.Content>
                                        <CreateHoneyHarvestForm />
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Семья</Table.HeaderCell>
                                <Table.HeaderCell>Дата</Table.HeaderCell>
                                <Table.HeaderCell>Количество (кг)</Table.HeaderCell>
                                <Table.HeaderCell>Сорт мёда</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.honeyHarvests === null ? <Table.Row><Loader active inline /></Table.Row> :
                                this.state.honeyHarvests.map((s) => {
                                    return <Table.Row>
                                        <Table.Cell>{s["bee_family"].name}</Table.Cell>
                                        <Table.Cell>
                                            {s["date"] === null ? '' :
                                                (new Date(s["date"])).toLocaleString('ru', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',})
                                            }
                                        </Table.Cell>
                                        <Table.Cell>{s["amount"]}</Table.Cell>
                                        <Table.Cell>{s["honey_type"].name}</Table.Cell>
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

export default HoneyHarvest;
