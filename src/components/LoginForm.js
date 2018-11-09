import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router'
import { loginUser } from '../actions/user'
import { Button, Form, Segment, Message } from 'semantic-ui-react'

class LoginForm extends React.Component {
  state = { email: '', password: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  // handleChange = (e, semanticInputData) => {
  //   // semanticInputData.name -> 'email'
  //   this.setState({ [semanticInputData.name]: semanticInputData.value })
  // }

  handleLoginSubmit = () => { //semantic forms preventDefault for you
    this.props.loginUser(this.state.email, this.state.password) //comes from mapDispatchToProps
    this.setState({ email: '', password: '' }) //reset form to initial state
  }

  render() {
    console.log('%c PROPS IN LOGINFORM ', 'color: goldenrod', this.props)
    return this.props.loggedIn ? (
      <Redirect to="/profile" />
    ) : (
      <Segment>
        <Form
          onSubmit={this.handleLoginSubmit}
          size="mini"
          key="mini"
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          <Message error header={this.props.failedLogin ? this.props.error : null} />
          <Form.Group widths="equal">
            <Form.Input
              label="email"
              placeholder="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <Form.Input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Segment>
    )
  }
}


// const mapStateToProps = (reduxStoreState) => {
//   return {
//     authenticatingUser: reduxStoreState.usersReducer.authenticatingUser,
//     failedLogin: reduxStoreState.usersReducer.failedLogin,
//     error: reduxStoreState.usersReducer.error,
//     loggedIn: reduxStoreState.usersReducer.loggedIn
//   }
// }

// which pieces of the reduxStoreState does this component care about????
// const mapStateToProps = ({usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
//   authenticatingUser,
//   failedLogin,
//   error,
//   loggedIn
// })

const mapStateToProps = (state) => {
  return {
    authenticatingUser: state.user.authenticatingUser,
    failedLogin: state.user.failedLogin,
    error: state.user.error,
    loggedIn: state.user.loggedIn
  }
}

// gives my component props (callback fns) that allow it to dispatch (SEND) actions to redux. these actions are then handled by my reducers
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginUser: (email, password) => dispatch(loginUser(email, password))
//   }
// }

// const connectedToReduxHOC = connect(mapStateToProps, mapDispatchToProps)
// const connectedToReduxLoginForm = connectedToReduxHOC(LoginForm)
// const connectedToReduxHOCWithRouterLoginForm = withRouter(connectedToReduxLoginForm)
//
// export default connectedToReduxHOCWithRouterLoginForm


export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm))
