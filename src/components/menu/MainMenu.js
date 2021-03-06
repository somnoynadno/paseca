import React from 'react'
import { Menu } from 'semantic-ui-react'

import bee from '../../assets/bee.png'
import PropTypes from "prop-types";
import {API_VERSION} from "../../globals";
import {checkPermissionByPathname} from "../../permissions";

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
            if (this.props.activeItem !== 'Главная') r = '/login';
            if (window.location.href === '/subscriptions') r = null;
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
        if (name === 'Справочник')      r = '/wiki';
        if (name === 'Личный кабинет')  r = '/preferences';
        if (name === 'Зимовка')         r = '/winter';
        if (name === 'Главная') {
            r = (localStorage.getItem('token') ? '/news' : '/');
        }

        let permittedPath = checkPermissionByPathname(r);
        if (window.location.pathname !== permittedPath) {
            this.setState({
                referrer: permittedPath
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
            <Menu size='huge' stackable fluid widths={6}>
                <Menu.Item name='Главная' onClick={this.handleItemClick} >
                    <img src={bee} alt="..." />
                    &nbsp;PASECA&nbsp;<i style={{fontSize: "8pt"}}>(v{API_VERSION})</i>
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
                    name='Зимовка'
                    active={activeItem === 'Зимовка'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Справочник'
                    active={activeItem === 'Справочник'}
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
