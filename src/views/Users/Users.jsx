import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText,  Card, CardBody, CardHeader, Col, Row, Table, Pagination, PaginationItem, PaginationLink, Label, Input, Badge, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import AuthenticationService from '../../services/AuthenticationService';
import axios from '../../interceptors';
import constants from '../../utils/constants';

let StatusEnum = require('../../utils/StatusEnum.json');

class Users extends Component {
  constructor(props) {
    super(props);
    this.AuthenticationService =  new AuthenticationService();

    this.state = {
      userList: [],
      roleList: [],
      currentPage: 0,
      pageSize: 10,
      pageCount: 0,
      result: [],
      modal: false,
      name: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
      status_id: "",
      userRole: "",
      isUpdate: false,
    };
  }

  handleClick = (e, index) => {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log('name: '+e.target.name+ ' value: '+e.target.value);
  }

  handleSave = async e => {
    e.preventDefault();
    const userdata = {
      'name': this.state.name,
      'lastname': this.state.lastname,
      'email': this.state.email,
      'userRole': this.state.userRole,
      'username': this.state.username,
      'password': this.state.username
    }
    await axios.post(constants.UserRegister, userdata)
    .then( res => {
      console.log(res);
    });
    this.toggleModal();
  }
  
  handleFilter = (e) => {
    let value = e.target.value;
    let { userList } = this.state;
    let result = [];

    result = userList.filter((user) => {
      return user.username.toLowerCase().search(value) !== -1;
    });
    this.setState({result})
    this.getPagecount(result);
  }


  handleSize = (e) => {
    this.setState({
      pageSize: e.target.value
    });

    console.log(e.target.value);
    let usersCount = this.state.userList;

    let pageCount = Math.ceil(usersCount.length / e.target.value);
    console.log(pageCount);
    this.setState({
      pageCount: pageCount,
      currentPage: 0
    });
  }

  async getListUser () {
    const userlist = await axios.get(constants.UserListAll).then(res => {
      return Promise.resolve(res);
    });
    
    let users  = userlist.data.users;
    this.setState({userList: users, result: users});

    console.log(users);
    this.getPagecount(users);
  }
  
  getListRol = async () => {
    const Roles = await axios.get(constants.RoleList).then(res => {
      return Promise.resolve(res);
    });

    const roleList  = Roles.data.roles;
    this.setState({roleList});
    console.log(this.state.roleList)
  }

  getPagecount = (users) => {
    let pageCount = Math.ceil(users.length / this.state.pageSize);
    this.setState({pageCount: pageCount});
    console.log(pageCount);
  }

  async componentDidMount() {
    this.getListUser();
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.isModalOpen();
  }

  isModalOpen = () => {
    if(!this.state.modal) {
      this.getListRol();
    }
  }

  handleUpdate = async (id) => {
    this.toggleModal();

    this.setState({
      isUpdate: !this.state.isUpdate
    });

    const res = await axios.get(constants.GetUser+id).then(
      result => {
        return Promise.resolve(result);
      }
    ).catch( err => {
      console.log(err);
    });

    this.setState({
      name: res.data.name,
      lastname: res.data.lastname
    });
    console.log(res.data);
  }

  render() {
    const currentPage = this.state.currentPage;
    const pageCount  = this.state.pageCount;
    const pageSize = this.state.pageSize;
    const recordsCount = this.state.result.length;

    const getStatus = (status) => {
      return status === StatusEnum.Active ? 'success' :
        status === StatusEnum.Inactive ? 'secondary' :
          status === StatusEnum.Temporal ? 'warning' :
            status === StatusEnum.Suspended ? 'danger' :
              'primary'
    }

    const showStatus = (status) => {
      return status === StatusEnum.Active ? 'Active' :
        status === StatusEnum.Inactive ? 'Inactive' :
          status === StatusEnum.Temporal ? 'Temporal' :
            status === StatusEnum.Suspended ? 'Suspended' :
              'License'
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Row style={{alignItems:"center", marginBottom:"10px"}}>
                  <Col md={3}>
                    <Button color="primary" onClick={() => this.toggleModal()}>Add User</Button>
                    <Modal isOpen={this.state.modal} toggle={() => this.toggleModal()} className={this.props.className}>
                      <ModalHeader toggle={() => this.toggleModal()}>User Information</ModalHeader>
                      <ModalBody>
                        <Form>
                          <FormGroup>
                            <Row>
                              <Col sm={12} md={6} xl={6}>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-user fa-fw"></i></InputGroupText>
                                  </InputGroupAddon>
                                  <Input type="text" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} placeholder="Name" />
                                </InputGroup>
                              </Col>
                              <Col sm={12} md={6} xl={6}>
                                <Input type="text" name="lastname" value={this.state.lastname} onChange={(e) => this.handleChange(e)} placeholder="last name" />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                  <InputGroupText><i className="fa fa-envelope fa-fw"></i></InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" name="email" onChange={(e) => this.handleChange(e)} placeholder="Email" />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-key fa-fw"></i></InputGroupText>
                              </InputGroupAddon>
                              <Input type="select" name="userRole" onChange={(e) => this.handleChange(e)} placeholder="Rol">
                                <option key={"0"} value="">Select user profile</option>
                                { this.state.roleList.map((rol) => (
                                  <option key={rol.id} value={rol.id}>{rol.rolename}</option>
                                ))}
                              </Input>
                            </InputGroup>
                          </FormGroup>
                          { this.state.isUpdate? 
                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-exclamation fa-fw"></i></InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" placeholder="Status"/>
                            </InputGroup>
                          </FormGroup>
                          : (null)
                          }
                          
                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user-circle-o fa-fw"></i></InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" name="username" onChange={(e) => this.handleChange(e)} placeholder="username"/>
                            </InputGroup>
                          </FormGroup>

                          <FormGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-lock fa-fw"></i></InputGroupText>
                              </InputGroupAddon>
                              <Input type="password" name="password" onChange={(e) => this.handleChange(e)} placeholder="*******"/>
                            </InputGroup>
                          </FormGroup>
                        </Form>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="success" onClick={(e) => this.handleSave(e)}>Save</Button>
                        <Button color="danger" onClick={() => this.toggleModal()}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                  <Col md={2} style={{paddingRight: 0}}>
                    <Label>Show entries: </Label>
                  </Col>
                  <Col md={2}>
                    <Input type="select" name="entries" onChange={(e) => this.handleSize(e)}>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </Input>
                  </Col>
                  <Col md={{size:1}}>
                    <Label>Search: </Label>
                  </Col>
                  <Col md={4}>
                    <Input type="text" md={12} onChange={(e) => this.handleFilter(e)}/>
                  </Col>
                </Row>

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">registered</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.result.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((user, index) => (
                      <tr key={index}>
                        <th scope="row"><Link to={`/users/${user.id}`}>{user.id}</Link></th>
                        {/* <td>{user.id}</td> */}
                        <td>{user.name}</td>
                        <td>{user.lastname}</td>
                        <td>{user.created_at}</td>
                        <td><Badge color={getStatus(user.status)}>{showStatus(user.status)}</Badge></td>
                        <td><Button color="warning" onClick={() => this.handleUpdate(user.id)}><i className="fa fa-pencil fa-md mt-1"></i></Button> <Button color="danger"><i className="fa fa-remove fa-md mt-1"></i></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="pull-right">
                <Pagination>
                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink previous tag="button" onClick={(e) => this.handleClick(e, currentPage - 1)}></PaginationLink>
                  </PaginationItem>
                  {[...Array(pageCount)].map((page, index) =>
                    <PaginationItem active={index === currentPage} key={index}>
                      <PaginationLink onClick={(e) => {this.handleClick(e, index)}}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem disabled={currentPage >= pageCount - 1}>
                    <PaginationLink next tag="button" onClick={(e) => this.handleClick(e, currentPage + 1)}></PaginationLink>
                  </PaginationItem>
                </Pagination>
                </div> <Label className="text-muted">total records: {recordsCount}</Label>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Modal isOpen={this.state.modal} toggle={() => this.toggleModal()} className={this.props.className}>
          <ModalHeader toggle={() => this.toggleModal()}>Update user information</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-user fa-fw"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="name" value={this.state.name}  className={this.props.className} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-lock fa-fw"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" name="password" onChange={(e) => this.handleChange(e)} placeholder="*******"/>
                </InputGroup>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={(e) => this.handleSave(e)}>Save</Button>
            <Button color="danger" onClick={() => this.toggleModal()}>Cancel</Button>
          </ModalFooter>
        </Modal> */}
      </div>
    )
  }
}

export default Users;
