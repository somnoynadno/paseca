import React from "react";
import PropTypes from 'prop-types';
import {GET_API} from "../../http/GET_API";
import {DELETE_API} from "../../http/DELETE_API";

const ITEMS_PER_PAGE = 20;

/*
 Базовый компонент для таблицы с пагинацией.
 Для использования необходимо унаследоваться
 и переопредлить коллбэки для запроса всех элементов
 и удаление одного из них.

 Используется в ControlHarvestPage, HoneySalePage,
 HoneyHarvestPage и PollenHarvestPage.
 */

class TablePaginatorComponent extends React.Component {
    static propTypes = {
        getItemsCallback : PropTypes.func,
        deleteItemCallback: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            items: null,
            itemsCount: '',
            // query state
            sort: 'id',
            order: 'ASC',
            // pagination state
            activePage: 1,
            totalPages: 1,
        }

        this.getAPI = new GET_API();
        this.deleteAPI = new DELETE_API();
    }

    deleteItem = async (id) => {
        await this.deleteItemCallback(id)
            .then((resp) => {
                if (resp.constructor !== Error) {
                    // everything is fine => remove delete button
                    document.getElementById("delete-cell-" + id).innerHTML = 'успешно удалено';
                    document.getElementById("delete-cell-" + id).style.color = 'green';
                } else {
                    console.log(resp.message);
                }
            })
    }

    reorder = async (sortColumn) => {
        this.setState({
            sort: sortColumn,
            order: (this.state.order === 'ASC' ? 'DESC' : 'ASC'),
            items: null
        });
        await this.fetchData(this.state.activePage-1);
    }

    handlePaginationChange = async (e, { activePage }) => {
        this.setState({
            activePage: activePage,
            items: null,
        });
        await this.fetchData(activePage-1);
    }

    componentDidMount = async () => {
        await this.fetchData(0);
    }

    fetchData = async (n) => {
        await this.getItemsCallback(
            this.state.sort, this.state.order,
            n*ITEMS_PER_PAGE,
            n*ITEMS_PER_PAGE + ITEMS_PER_PAGE
        ).then((response) => {
            const {count} = response;
            this.setState({
                items: response,
                itemsCount: count,
                totalPages: parseInt(count/ITEMS_PER_PAGE)+1
            });
        });
    }
}

export default TablePaginatorComponent;
