import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Card, Container, Grid, Icon, Modal, Segment} from "semantic-ui-react";
import {Redirect} from "react-router-dom";
import CreateBeeFarmForm from "../forms/CreateBeeFarmForm";


class MyFarms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: null
        }

        this.handleItemClick = (e, { name }) => {
            this.setState({ activeItem: name });
            this.redirectToFarm(name);
        }
    }

    redirectToFarm(name) {
        console.log(name);
        this.setState({
            referrer: "bee_farm"
        })
    }

    render() {
        const { referrer } = this.state;

        if (referrer) return <Redirect to={referrer} />;
        else return <div>
            <Container>
                <MainMenu activeItem={'Мои пасеки'} />
                <Segment>
                    <Grid>
                        <Grid.Row columns={2} relaxed='very'>
                            <Grid.Column>
                                <h1 style={{textAlign: "center"}}>Выбор пасеки</h1>
                            </Grid.Column>
                            <Grid.Column>
                                <Modal trigger={<Button
                                    color='green'
                                    content='Создать новую'
                                    size='medium'
                                    icon='plus'
                                    floated='right'
                                    style={{marginRight: "30px"}}
                                />}>
                                    <Modal.Header>Новая пасека</Modal.Header>
                                    <Modal.Content>
                                        <CreateBeeFarmForm />
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Card.Group>
                        <Card onClick={this.handleItemClick.bind(this)}>
                            <Card.Content>
                                <Card.Header>Основная</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Создана в 2007г</span>
                                </Card.Meta>
                                <Card.Description>
                                    Расположена там-то
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='archive' />
                                22 улья
                            </Card.Content>
                        </Card>
                        <Card onClick={this.handleItemClick.bind(this)} >
                            <Card.Content>
                                <Card.Header>Кочевая</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Создана в 2020г</span>
                                </Card.Meta>
                                <Card.Description>
                                    Расположена в другом месте
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='archive' />
                                12 ульев
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Segment>
            </Container>
        </div>
    }
}

export default MyFarms;
