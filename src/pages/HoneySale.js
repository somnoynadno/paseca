import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Container, Grid, Loader, Modal, Segment, Table} from "semantic-ui-react";
import CreateHoneySaleForm from "../forms/create/CreateHoneySaleForm";
import {GET_API} from "../http/GET_API";
import {DELETE_API} from "../http/DELETE_API";
import DeleteModal from "../modal/DeleteModal";

class HoneySale extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            honeySales: null,
            salesNum: ''
        }

        this.getAPI = new GET_API();
        this.deleteAPI = new DELETE_API();
    }

    componentDidMount = async () => {
        let sales = await this.getAPI.GetUsersHoneySales();
        this.setState({
            honeySales: sales,
            salesNum: sales.length
        });
    }

    deleteHoneySale = async (id) => {
        await this.deleteAPI.DeleteHoneySaleByID(id)
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
            <Container>
                <MainMenu activeItem={'Медосбор'}  />
                <Segment>
                    <Grid>
                        <Grid.Row columns={2} relaxed='very'>
                            <Grid.Column>
                                <h1 style={{textAlign: "center"}}>Учёт продаж</h1>
                            </Grid.Column>
                            <Grid.Column>
                                <Modal trigger={<Button
                                    color='green'
                                    content='Добавить'
                                    size='medium'
                                    icon='shop'
                                    floated='right'
                                    label={{ basic: true, color: 'green', pointing: 'left', content: this.state.salesNum }}
                                    style={{marginRight: "30px"}}
                                />}>
                                    <Modal.Header>Новая продажа</Modal.Header>
                                    <Modal.Content>
                                        <CreateHoneySaleForm />
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
                                <Table.HeaderCell>Количество</Table.HeaderCell>
                                <Table.HeaderCell>Тип мёда</Table.HeaderCell>
                                <Table.HeaderCell>Стоимость</Table.HeaderCell>
                                <Table.HeaderCell>Опции</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.honeySales === null ? <Table.Row><Loader active inline /></Table.Row> :
                                this.state.honeySales.map((s) => {
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
                                        <Table.Cell>{s["honey_type"].name}</Table.Cell>
                                        <Table.Cell>{s["total_price"]}</Table.Cell>
                                        <Table.Cell id={"delete-cell-" + s.id}>
                                            <DeleteModal deleteCallback={this.deleteHoneySale.bind(this, s.id)} />
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

export default HoneySale;
