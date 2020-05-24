import  React from "react";
import {Grid, Menu, Segment} from "semantic-ui-react";


class CustomTypes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: null
        }

        this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    }

    render() {
        return <Segment>
            <Grid columns={1}>
                <Grid.Row width={1}>
                    <Grid.Column>
                        <h1>Мои используемые типы</h1>
                        <br />
                    </Grid.Column>
                    <Grid.Column>
                        <Menu stackable pointing secondary>
                            <Menu.Item
                                name='Породы пчёл'
                                active={this.state.activeItem === 'Породы пчёл'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Сорта мёда'
                                active={this.state.activeItem === 'Сорта мёда'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Форматы ульев'
                                active={this.state.activeItem === 'Форматы ульев'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Рамки ульев'
                                active={this.state.activeItem === 'Рамки ульев'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment>
                            {/* TODO: render tables */}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    }
}

export default CustomTypes;
