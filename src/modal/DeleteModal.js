import {Button, Header, Icon, Modal} from "semantic-ui-react";
import React from "react"
import PropTypes from "prop-types";

/*
 Модальное окно для удаление одного элемента.
 В props принимается коллбэк для удаление,
 вызываемый в случае подтверждения.
 */
class DeleteModal extends React.Component {
    state = { modalOpen: false }

    propTypes = {
        deleteCallback : PropTypes.func.isRequired
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleConfirmed = () => {
        this.props.deleteCallback();
        this.handleClose();
    }

    render() {
        return <Modal
            trigger={<Button color='red' icon='trash' onClick={this.handleOpen} />}
            size='small'
            open={this.state.modalOpen}
            onClose={this.handleClose}>
            <Header icon='archive' content='Удаление элемента' />
            <Modal.Content>
                <p>
                    Вы действительно хотите удалить этот элемент?
                </p>
                <p>
                    Это действие <u>необратимо</u>
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={this.handleClose} >
                    <Icon name='remove' /> Нет
                </Button>
                <Button onClick={this.handleConfirmed} color='red'>
                    <Icon name='checkmark' /> Да
                </Button>
            </Modal.Actions>
        </Modal>
    }
}

export default DeleteModal;
