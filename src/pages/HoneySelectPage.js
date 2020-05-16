import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Container, Divider, Grid, Segment} from "semantic-ui-react";
import {Redirect} from "react-router-dom";


class HoneySelectPage extends React.Component {
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
        if (content === 'Учёт сбора') r = '/honey_harvest';
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
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <Button content='Учёт сбора' primary icon="pencil"
                                    size='huge' onClick={this.handleItemClick.bind(this)} />
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

export default HoneySelectPage;
