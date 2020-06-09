import  React from "react";
import {Grid, Menu, Segment} from "semantic-ui-react";
import BeeFamiliesTable from "../tables/bee_farm/BeeFamiliesTable";
import HivesTable from "../tables/bee_farm/HivesTable";
import RemindersTable from "../tables/bee_farm/RemindersTable";
import PropTypes from "prop-types";

/*
 Embedded компонент для страницы пасеки.
 Предоставляет менюшку для её содержимого.
 */
class BeeFarmMenu extends React.Component {
    static propTypes = {
        beeFarm: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            activeItem: (localStorage.getItem( 'bee_farm_active_item' ) || null),
            beeFarm: this.props.beeFarm
        }

        this.handleItemClick = (e, { name }) => {
            this.setState({ activeItem: name })
            localStorage.setItem("bee_farm_active_item", name)
        }
    }

    render() {
        return (
            <Grid columns={1}>
                <Grid.Row width={1}>
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
                        </Menu>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment>
                            {this.state.activeItem === 'Семьи' ?
                                <BeeFamiliesTable beeFarm={this.state.beeFarm} />
                                : this.state.activeItem === 'Ульи' ?
                                    <HivesTable beeFarm={this.state.beeFarm} />
                                    : this.state.activeItem === 'Напоминания' ?
                                        <RemindersTable beeFarm={this.state.beeFarm} />
                                        // : this.state.activeItem === 'Роения' ?
                                        //     <BeeFarmSwarmsTable beeFarm={this.state.beeFarm} />
                                        //     : this.state.activeItem === 'Болезни' ?
                                        //         <BeeFarmBeeDiseasesTable beeFarm={this.state.beeFarm} />
                                        : ''
                            }
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default BeeFarmMenu;
