import React from 'react'
import { Menu } from 'semantic-ui-react'

import bee from '../../assets/bee.png'
import PropTypes from "prop-types";

/*
 Главное меню. Рендерится на каждой странице.
 В props принимается активный элемент и история.
 */
class MainMenu extends React.Component {
    static propTypes = {
        activeItem : PropTypes.string.isRequired,
        history: PropTypes.any.isRequired
    }

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
        if (name === 'Мои пасеки')      r = '/my_farms';
        if (name === 'Медосбор')        r = '/honey_select';
        if (name === 'Вики')            r = '/wiki';
        if (name === 'Личный кабинет')  r = '/preferences';
        if (name === 'Главная')         r = '/';

        if (window.location.pathname !== r) {
            this.setState({
                referrer: r
            })
        }
    }

    render() {
        const { activeItem } = this.state;
        const { referrer } = this.state;

        if (referrer) this.props.history.push({
            pathname: referrer,
        });
        return (
            <Menu size='huge' stackable fluid widths={5}>
                <Menu.Item name='Главная' onClick={this.handleItemClick} >
                    <img src={bee} alt="..." />
                    &nbsp;PASECA&nbsp;<i style={{fontSize: "8pt"}}>(v0.92)</i>
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
                <Menu.Item
                    name='Личный кабинет'
                    active={activeItem === 'Личный кабинет'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}

export default MainMenu;