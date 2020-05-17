import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Container, Grid, Menu, Modal, Segment} from "semantic-ui-react";
import PasecaModel from "../components/PasecaModel";


class BeeFarm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { activeItem: 'bio' }

        this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Мои пасеки'} />
                <Segment>
                    <Grid>
                        <Grid.Row columns={3} >
                            <Grid.Column>
                                <h1 style={{textAlign: "center"}}>Название пасеки</h1>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Modal trigger={<Button
                                    color='orange'
                                    content='Добавить улей'
                                    size='medium'
                                    icon='archive'
                                    floated='right'
                                    style={{margin: "0 10px"}}
                                />}>
                                    <Modal.Header>Новый улей</Modal.Header>
                                    <Modal.Content>
                                        TODO
                                    </Modal.Content>
                                </Modal>
                                <Modal trigger={<Button
                                    color='yellow'
                                    content='Создать семью'
                                    size='medium'
                                    icon='add'
                                    floated='right'
                                    style={{margin: "0 10px"}}
                                />}>
                                    <Modal.Header>Новая семья</Modal.Header>
                                    <Modal.Content>
                                        TODO
                                    </Modal.Content>
                                </Modal>
                                <Modal trigger={<Button
                                    color='red'
                                    content='Создать напоминание'
                                    size='medium'
                                    icon='attention'
                                    floated='right'
                                    style={{margin: "0 10px"}}
                                />}>
                                    <Modal.Header>Новое напоминание</Modal.Header>
                                    <Modal.Content>
                                        TODO
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{paddingLeft: "30px"}}>
                            <PasecaModel maxX={70} maxY={20} />
                        </Grid.Row>
                        <Grid.Row style={{paddingLeft: "30px"}}>
                            <Modal trigger={<Button
                                color='blue'
                                content='Изменение пасеки'
                                size='small'
                                icon='pencil'
                            />}>
                                <Modal.Header>Изменение пасеки</Modal.Header>
                                <Modal.Content>
                                    TODO
                                </Modal.Content>
                            </Modal>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Menu stackable pointing secondary>
                                    <Menu.Item
                                        name='Семьи'
                                        active={this.state.activeItem === 'Семьи'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name='Ульи'
                                        active={this.state.activeItem === 'Ульи'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name='Напоминания'
                                        active={this.state.activeItem === 'Напоминания'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name='Контроль'
                                        active={this.state.activeItem === 'Контроль'}
                                        onClick={this.handleItemClick}
                                    />
                                </Menu>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment>
                                    TODO
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        </div>
    }
}

export default BeeFarm;
