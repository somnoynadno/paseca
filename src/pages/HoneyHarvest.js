import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Container, Grid, Menu, Segment, Table} from "semantic-ui-react";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";


class HoneyHarvest extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

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
                                <Button
                                    color='green'
                                    content='Добавить'
                                    size='medium'
                                    icon='pencil'
                                    floated='right'
                                    label={{ basic: true, color: 'green', pointing: 'left', content: '2,048' }}
                                    style={{marginRight: "30px"}}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Улей</Table.HeaderCell>
                                <Table.HeaderCell>Дата</Table.HeaderCell>
                                <Table.HeaderCell>Количество</Table.HeaderCell>
                                <Table.HeaderCell>Тип мёда</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                            </Table.Row>
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>
                                    <Menu floated='right' pagination>
                                        <Menu.Item as='a' icon>
                                            <Icon name='chevron left' />
                                        </Menu.Item>
                                        <Menu.Item as='a'>1</Menu.Item>
                                        <Menu.Item as='a'>2</Menu.Item>
                                        <Menu.Item as='a'>3</Menu.Item>
                                        <Menu.Item as='a'>4</Menu.Item>
                                        <Menu.Item as='a' icon>
                                            <Icon name='chevron right' />
                                        </Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Segment>
            </Container>
        </div>
    }
}

export default HoneyHarvest;
