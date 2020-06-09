import  React from "react";
import {Grid, Menu, Segment} from "semantic-ui-react";
import BeeBreedsTable from "../tables/custom_types/BeeBreedsTable";
import HoneyTypesTable from "../tables/custom_types/HoneyTypesTable";
import HiveFormatsTable from "../tables/custom_types/HiveFormatsTable";
import HiveFrameTypesTable from "../tables/custom_types/HiveFrameTypesTable";

/*
 Embedded компонент для личного кабинета.
 Предоставляет менюшку для пользовательских типов.
 */
class CustomTypesMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: (localStorage.getItem('custom_types_active_item' ) || null)
        }

        this.handleItemClick = (e, { name }) => {
            this.setState({ activeItem: name })
            localStorage.setItem('custom_types_active_item', name)
        }
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
                            {this.state.activeItem === 'Породы пчёл' ?
                                <BeeBreedsTable /> : this.state.activeItem === 'Сорта мёда' ?
                                    <HoneyTypesTable /> : this.state.activeItem === 'Форматы ульев' ?
                                        <HiveFormatsTable /> : this.state.activeItem === 'Рамки ульев' ?
                                            <HiveFrameTypesTable /> : ''
                            }
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    }
}

export default CustomTypesMenu;
