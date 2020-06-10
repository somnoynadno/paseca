import  React from "react";
import {Grid, Menu, Segment} from "semantic-ui-react";
import BeeFamiliesTable from "../tables/bee_farm/BeeFamiliesTable";
import HivesTable from "../tables/bee_farm/HivesTable";
import RemindersTable from "../tables/bee_farm/RemindersTable";
import PropTypes from "prop-types";
import SwarmsTable from "../tables/bee_farm/SwarmsTable";
import FamilyDiseasesTable from "../tables/bee_farm/FamilyDiseasesTable";

/*
 Embedded компонент для страницы пасеки.
 Предоставляет менюшку для её содержимого.
 Принимает ID пасеки обязательным параметром.
 */
class BeeFarmMenu extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            activeItem: (localStorage.getItem( 'bee_farm_active_item' ) || null),
            beeFarmID: this.props.beeFarmID
        }

        this.handleItemClick = (e, { name }) => {
            this.setState({ activeItem: name });
            localStorage.setItem("bee_farm_active_item", name);
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
                            <Menu.Item
                                name='Роения'
                                active={this.state.activeItem === 'Роения'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Болезни'
                                active={this.state.activeItem === 'Болезни'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment>
                            {this.state.activeItem === 'Семьи' ?
                                <BeeFamiliesTable beeFarmID={this.state.beeFarmID} />
                                : this.state.activeItem === 'Ульи' ?
                                    <HivesTable beeFarmID={this.state.beeFarmID} />
                                    : this.state.activeItem === 'Напоминания' ?
                                        <RemindersTable beeFarmID={this.state.beeFarmID} />
                                        : this.state.activeItem === 'Роения' ?
                                            <SwarmsTable beeFarmID={this.state.beeFarmID} />
                                            : this.state.activeItem === 'Болезни' ?
                                                <FamilyDiseasesTable beeFarmID={this.state.beeFarmID} />
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
