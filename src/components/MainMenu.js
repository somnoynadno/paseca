import React from 'react'
import { Menu } from 'semantic-ui-react'
import {Redirect} from "react-router-dom";

import bee from '../assets/bee.png'


class MainMenu extends React.Component {
    constructor(props) {
        super(props);

        let token = localStorage.getItem('token');
        let r = null;

        if (token === null || token === undefined) {
            r = '/login'
        }

        this.state = {
            activeItem: this.props.activeItem,
            referrer: r
        }

        this.handleItemClick = (e, { name }) => {
            this.setState({ activeItem: name });
            this.redirectByName(name);
        }
    }

    redirectByName(name) {
        let r = null;
        if (name === 'Мои пасеки') r = '/my_farms';
        if (name === 'Медосбор')   r = '/honey_select';
        if (name === 'Вики')       r = '/wiki';
        if (name === 'Главная')    r = '/';

        if (window.location.pathname !== r) {
            this.setState({
                referrer: r
            })
        }
    }

    render() {
        const { activeItem } = this.state;
        const { referrer } = this.state;

        if (referrer) return <Redirect to={referrer} />;
        else return (
            <Menu size='huge' stackable fluid widths={4}>
                <Menu.Item name='Главная' onClick={this.handleItemClick} >
                    <img src={bee} alt="..." />
                    &nbsp;PASECA
                </Menu.Item>
                <Menu.Item
                    name='Мои пасеки'
                    active={activeItem === 'Мои пасеки'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Медосбор'
                    active={activeItem === 'Медосбор'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Вики'
                    active={activeItem === 'Вики'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}

export default MainMenu;
