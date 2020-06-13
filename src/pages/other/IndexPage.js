import React from "react";
import {Container, Segment, List, Statistic, Button, Transition} from "semantic-ui-react";
import MainMenu from "../../components/menu/MainMenu";
import {API} from "../../http/API";


/*
 Главная страница (лендинг)
 */
class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stats: null,
            visible: false
        }

        this.api = new API();
    }

    componentDidMount = async () => {
        let items = await this.api.GetStatsForLanding();
        this.setState({stats: items, visible: true});
    }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={"Главная"} history={this.props.history} />
                <Segment.Group padded size={"huge"}>
                    <Transition visible={this.state.visible} animation='fade' duration={1200}>
                    <Segment padded>
                        <p><strong>PASECA</strong> — современная платформа для ведения пчелиного хозяйства.</p>
                    </Segment>
                    </Transition>
                    <Transition visible={this.state.visible} animation='fade' duration={2000}>

                    <Segment padded>
                        <p>Наш сервис предоставляет следующие возможности:</p>
                        <List style={{marginLeft: "20px"}} relaxed>
                            <List.Item>
                                <List.Icon name='archive' />
                                <List.Content>Моделирование схемы пасеки</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='search' />
                                <List.Content>Учёт особенностей пчёл, ульев и пасек</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='pencil' />
                                <List.Content>Ведение журнала сбора и продаж мёда</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='book' />
                                <List.Content>Справочник пчеловода с полезными статьями</List.Content>
                            </List.Item>
                        </List>
                    </Segment>
                    </Transition>
                    <Transition visible={this.state.visible} animation='fade' duration={4000}>

                    <Segment padded>
                        {this.state.stats === null ? '' :
                            <Statistic.Group widths='three' size='big'>
                                <Statistic>
                                    <Statistic.Value>
                                        {this.state.stats["UsersCount"]}
                                        <br />
                                    </Statistic.Value>
                                    <Statistic.Label>Пользователей</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        {this.state.stats["BeeFarmsCount"]}
                                        <br />
                                    </Statistic.Value>
                                    <Statistic.Label>Создано пасек</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        {this.state.stats["BeeFamiliesCount"]}
                                        <br />
                                    </Statistic.Value>
                                    <Statistic.Label>Пчелосемей</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                        }
                    </Segment>
                    </Transition>
                    <Transition visible={this.state.visible} animation='fade' duration={3000}>
                        <Segment padded textAlign={"center"}>
                            <Button primary size={"big"}>
                                Присоединиться
                            </Button>
                        </Segment>
                    </Transition>
                </Segment.Group>
            </Container>
        </div>
    }
}

export default IndexPage;
