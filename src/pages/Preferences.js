import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Container, Grid, Image, Segment} from "semantic-ui-react";
import {API} from "../http/API";

import user from '../assets/user.png';


class Preferences extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        this.api = new API();
    }

    componentDidMount = async () => {
        let user = await this.api.GetUserInfo();
        this.setState({
            user: user
        });
    };

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        window.location.href = '/login';
    }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Личный кабинет'} />
                <Segment>
                <Grid columns={4} divided stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Image src={user} alt="..." />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            {this.state.user === null ? <Segment style={{minHeight: "180px"}} loading /> :
                                <div>
                                    <h1>{this.state.user.name + " " + this.state.user.surname}</h1>
                                    <h3>{this.state.user.email}</h3>
                                    <span>Подписка: {this.state.user["subscription_type"].name}</span><br />
                                    <span>Статус: {this.state.user["subscription_status"].status}</span><br />
                                    <span>Дата окончания: {this.state.user["subscription_end"]}</span><br />
                                    <hr /><br />
                                </div>
                            }
                            <Button negative onClick={this.logout.bind(this)}>Выйти</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Управление профилем</h3>
                            <Button.Group vertical>
                                <Button>Изменить данные</Button>
                                <Button>Изменить пароль</Button>
                                <Button>Управление подпиской</Button>
                                <Button>Связаться с поддержкой</Button>
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>
            </Container>
        </div>
    }
}

export default Preferences;
