import React from "react";
import MainMenu from "../components/menu/MainMenu"
import {Button, Container, Divider, Grid, Segment} from "semantic-ui-react";
import {Redirect} from "react-router-dom";

/*
 Компонент, представляющий подменю для
 выбора следующей страницы
 */
class HoneySelectPagePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: null
        }

        this.handleItemClick = (e, { content }) => {
            this.redirectByContent(content);
        }
    }

    redirectByContent(content) {
        let r = null;
        if (content === 'Сбор мёда') r = '/honey_harvest';
        if (content === 'Контрольные сборы') r = '/control_harvest';
        if (content === 'Сборы пыльцы') r = '/pollen_harvest';
        if (content === 'Продажи')    r = '/honey_sale';

        this.setState({
            referrer: r
        })
    }

    render() {
        const { referrer } = this.state;

        if (referrer) return <Redirect to={referrer} />;
        else return <div>
            <Container>
                <MainMenu activeItem={'Медосбор'} />
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable padded='horizontally'>
                        <Grid.Column verticalAlign='middle' textAlign='center'>
                            <Button.Group vertical>
                                <Button content='Сбор мёда'
                                        primary
                                        icon="pencil"
                                        size='huge'
                                        onClick={this.handleItemClick.bind(this)}
                                />
                                <Button
                                    color='green'
                                    content='Контрольные сборы'
                                    size='medium'
                                    icon='signal'
                                    onClick={this.handleItemClick.bind(this)}
                                />
                                <Button
                                    color='orange'
                                    content='Сборы пыльцы'
                                    size='medium'
                                    icon='certificate'
                                    onClick={this.handleItemClick.bind(this)}
                                />
                            </Button.Group>
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                            <Button content='Продажи' primary icon='money'
                                    size='huge' onClick={this.handleItemClick.bind(this)} />
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>или</Divider>
                </Segment>
            </Container>
        </div>
    }
}

export default HoneySelectPagePage;
