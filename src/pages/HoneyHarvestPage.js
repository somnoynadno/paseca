import React from "react";
import MainMenu from "../components/menu/MainMenu"
import {Button, Container, Grid, Icon, Loader, Modal, Pagination, Segment, Table} from "semantic-ui-react";
import CreateHoneyHarvestForm from "../components/forms/harvests/CreateHoneyHarvestForm";
import DeleteModal from "../components/modal/DeleteModal";
import TablePaginatorComponent from "../components/other/TablePaginatorComponent";

/*
 Страница сборов мёда
 */
class HoneyHarvestPage extends TablePaginatorComponent {
    constructor(props) {
        super(props);

        this.getItemsCallback = this.getAPI.GetUsersHoneyHarvests;
        this.deleteItemCallback = this.deleteAPI.DeleteHoneyHarvestByID;
    }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Медосбор'} history={this.props.history} />
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
                                    label={{ basic: true, color: 'green', pointing: 'left', content: this.state.itemsCount }}
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
                                <Table.HeaderCell>Семья&nbsp;
                                    <Icon link name='arrow down' onClick={this.reorder.bind(this, "bee_family_id")} />
                                </Table.HeaderCell>
                                <Table.HeaderCell>Дата&nbsp;
                                    <Icon link name='arrow down' onClick={this.reorder.bind(this, "date")} />
                                </Table.HeaderCell>
                                <Table.HeaderCell>Количество (кг)&nbsp;
                                    <Icon link name='arrow down' onClick={this.reorder.bind(this, "amount")} />
                                </Table.HeaderCell>
                                <Table.HeaderCell>Сорт мёда&nbsp;
                                    <Icon link name='arrow down' onClick={this.reorder.bind(this, "honey_type_id")} />
                                </Table.HeaderCell>
                                <Table.HeaderCell>Опции</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.items === null ? <Table.Row>
                                    <Table.Cell><Loader active inline /></Table.Cell>
                                </Table.Row> :
                                this.state.items.map((item) => {
                                    return <Table.Row key={item.id}>
                                        <Table.Cell>{item["bee_family"].name}</Table.Cell>
                                        <Table.Cell>
                                            {item["date"] === null ? '' :
                                                (new Date(item["date"])).toLocaleString('ru', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',})
                                            }
                                        </Table.Cell>
                                        <Table.Cell>{item["amount"]}</Table.Cell>
                                        <Table.Cell>{item["honey_type"].name}</Table.Cell>
                                        <Table.Cell id={"delete-cell-" + item.id}>
                                            <DeleteModal deleteCallback={this.deleteItem.bind(this, item.id)} />
                                        </Table.Cell>
                                    </Table.Row>
                                })
                            }
                        </Table.Body>
                    </Table>
                    <Pagination style={{float: "right"}}
                        activePage={this.state.activePage}
                        onPageChange={this.handlePaginationChange}
                        size='mini'
                        totalPages={this.state.totalPages}
                    /><div style={{clear: "both"}} />
                </Segment>
            </Container>
        </div>
    }
}

export default HoneyHarvestPage;
