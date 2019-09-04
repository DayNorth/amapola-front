import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Button, Input, Label } from 'reactstrap';
import { Form } from 'formik';
import { SketchPicker } from 'react-color';

class Settings_UI extends Component {
    state = {
        displayColorPicker: false,
        color: {
          r: '241',
          g: '112',
          b: '19',
          a: '1',
        },
        fontColor : {
            r: '255',
            g: '255',
            b: '255',
            a: '0',
        }
      };

    colorPicker = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false })
    }

    handleChange = (color) => {
        this.setState({ color: color.rgb })
    };

    render () {
        const styles = {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={6}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> UI Settings <small className="text-muted">Configuration</small>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <p className="text-muted">Custom Settings</p>
                                    <FormGroup row>
                                        <Col md={{size:4, offset:2}}>
                                            <Label for="backgroundColor">Background Color</Label>
                                        </Col>
                                        <Col md={4}>
                                        <div style={ styles.swatch } onClick={() => this.colorPicker() }>
                                            <div style={ styles.color } />
                                        </div>
                                        { this.state.displayColorPicker ? <div style={ styles.popover }>
                                            <div style={ styles.cover } onClick={() => this.handleClose() }/>
                                            <SketchPicker color={ this.state.color } onChange={(color) => this.handleChange(color)}/>
                                            </div> : null }
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={{size:4, offset:2}}>
                                            <Label for="fontSelect">Font: </Label>
                                        </Col>
                                        <Col md={4}>
                                            <div>
                                                <Input type="select">
                                                    <option>1</option>
                                                    <option>2</option>
                                                </Input>
                                            </div>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={{size:4, offset:2}}>
                                            <Label for="fontColor">Font Color: </Label>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Settings_UI;