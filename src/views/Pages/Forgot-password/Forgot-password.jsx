import React, { Component } from 'react';
import { Form, FormGroup, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';


export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isOpen: props.isOpen,
        };
    }

    togglemodal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    
    handleSave = (e) => {
        e.preventDefault();
        alert('has been sent');
    }

    render() {
        return (
            <Modal isOpen={this.state.isOpen} toggle={() => this.togglemodal()} className={this.props.className}>
                <ModalHeader toggle={() => this.togglemodal()}>Password recovery</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-envelope fa-fw"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input type="email" name="email" onChange={(e) => this.handleChange(e)} placeholder="registered email"/>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={(e) => this.handleSave(e)}>Send</Button>
                    <Button color="danger" onClick={() => this.togglemodal()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}