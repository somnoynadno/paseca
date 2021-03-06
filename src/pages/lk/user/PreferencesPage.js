import React from "react";
import MainMenu from "../../../components/menu/MainMenu"
import {Button, Container, Grid, Image, Modal, Segment} from "semantic-ui-react";

import user from '../../../assets/user.png';
import CustomTypesMenu from "../../../components/menu/CustomTypesMenu";
import {GET_API} from "../../../http/GET_API";

/*
 Страница личного кабинета пользователя.
 Предоставляет меню для настроек аккаунта и
 создания пользовательских типов данных.
 */
class PreferencesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            referrer: null
        };

        this.api = new GET_API();
    }

    handleItemClick = (e, { name }) => {
        this.setState({ referrer: name });
    }

    componentDidMount = async () => {
        let user = await this.api.GetUserInfo();
        this.setState({
            user: user
        });
    };

    logout() {
        this.cleanLocalStorage();
        this.setState({referrer: "/"});
    }

    cleanLocalStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('subscription_type_id');
        localStorage.removeItem('subscription_expired');
    }

    render() {
        if (this.state.referrer) this.props.history.push({
            pathname: this.state.referrer,
        });

        return <div>
            <Container>
                <MainMenu activeItem={'Личный кабинет'} history={this.props.history} />
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
                                    <span>Дата окончания: {this.state.user["subscription_end"] ?
                                        (new Date(this.state.user["subscription_end"]))
                                            .toLocaleString('ru', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',}) : ''}
                                    </span><br />
                                    <hr /><br />
                                </div>
                            }
                            <Button negative onClick={this.logout.bind(this)}>Выйти</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Управление профилем</h3>
                            <Modal trigger={
                                <Button.Group vertical>
                                    <Button>Изменить данные</Button>
                                    <Button>Изменить пароль</Button>
                                    <Button name={'/subscriptions'}
                                            onClick={this.handleItemClick}>
                                        Управление подпиской
                                    </Button>
                                    <Button name={'/help'}
                                            onClick={this.handleItemClick}>
                                        Нужна помощь?
                                    </Button>
                                </Button.Group>
                            }>
                                <Modal.Header>В разработке</Modal.Header>
                                <Modal.Content>
                                    Этот функционал временно отсутствует
                                </Modal.Content>
                            </Modal>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>
                <CustomTypesMenu />
            </Container>
        </div>
    }
}

export default PreferencesPage;
