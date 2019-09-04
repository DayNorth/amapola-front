import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, } from 'reactstrap';
import AuthenticationService from '../../../services/AuthenticationService';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.AuthenticationService = new AuthenticationService();
    this.sendFormLogin = this.sendFormLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      password: '',
      validate: {
        usernameState: '',
        validCredentials: '',
      }
    }
  }
  
  async componentWillMount() {
    if(this.AuthenticationService.loggedIn()) {
      console.log(this.props)
      //this.props.history.push('/dashboard')
    }
  }

  handleChange(e) {
    this.setState (
      {
        [e.target.name]: e.target.value
      }
    )
  }

  validateUsername(e) {
    const validUsername = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    const { validate } = this.state
    if (validUsername.test(e.target.value)) {
      validate.usernameState = 'has-success'
    } else {
      validate.usernameState = 'has-danger'
    }
    this.setState({ validate })
  }

  sendFormLogin(e) {
    const { validate } = this.state

    e.preventDefault();
    this.AuthenticationService.login(this.state.username, this.state.password)
    .then(res => {
      if(res.status === 200) {
        this.props.history.push('/dashboard')
      }
    })
    .catch(err => {
      validate.validCredentials = false;
      this.setState({validate})
    });
  }

  render() {
    return (
    <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.sendFormLogin}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="username" placeholder="Username" autoComplete="username" onChange={this.handleChange} />
                        {/* <Input type="text" name="username" placeholder="Username" autoComplete="username" onChange={(e) => { this.handleChange(e); this.validateUsername(e)}} valid={this.state.validate.usernameState === 'has-success'} invalid={this.state.validate.usernameState === 'has-danger'} /> */}
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder="Password" autoComplete="current-password" onChange={this.handleChange}/>
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                        {
                          this.state.validate.validCredentials === false && <Alert color="danger">Wrong username or password</Alert>
                        }
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="4">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
