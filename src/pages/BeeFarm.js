import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Container, Grid, Modal, Segment} from "semantic-ui-react";
import PasecaModel from "../components/PasecaModel";


class BeeFarm extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Мои пасеки'} />
                <Segment>
                    <Grid>
                        <Grid.Row columns={2} relaxed='very'>
                            <Grid.Column>
                                <h1 style={{textAlign: "center"}}>Название пасеки</h1>
                            </Grid.Column>
                            <Grid.Column>
                                <Modal trigger={<Button
                                    color='orange'
                                    content='Добавить улей'
                                    size='medium'
                                    icon='archive'
                                    floated='right'
                                    style={{marginRight: "20px"}}
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
                                    style={{marginRight: "20px"}}
                                />}>
                                    <Modal.Header>Новая семья</Modal.Header>
                                    <Modal.Content>
                                        TODO
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{padding: "30px"}}>
                            <PasecaModel maxX={70} maxY={20} />
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Segment>
                                    <h2>Семьи</h2>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <h2>Ульи</h2>
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
