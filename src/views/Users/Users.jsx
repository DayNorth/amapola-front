import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import AuthenticationService from '../../services/AuthenticationService';
import axios from '../../interceptors';

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row"><Link to={userLink}>{user.id}</Link></th>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.registered}</td>
      <td>{user.role}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
    </tr>
  )
}


class Users extends Component {
  constructor(props) {
    super(props);
    this.AuthenticationService =  new AuthenticationService();

    this.state = {
      userList: []
    };
  }
  
  async getListUser () {
    const userlist = await axios.get('http://127.0.0.1:5000/user/all').then(res => {
      return Promise.resolve(res);
    });
    
    let users  = userlist.data.users;
    this.setState({userList: users});
    console.log(users)
  }

  async componentDidMount() {
    this.getListUser();
  }


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">username</th>
                      <th scope="col">role</th>
                      <th scope="col">registered</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userList.map((user, index) => (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.userRole}</td>
                        <td>{user.created_at}</td>
                        <td>{user.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
