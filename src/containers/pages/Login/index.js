import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actionUserName } from '../../../config/redux/action/';
import Button from '../../../components/atoms/Button';
import { loginUserAPI } from '../../../config/redux/action';
import {useNavigate} from 'react-router-dom'


const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();

  return (
    <WrappedComponent
      {...props}
      navigate={navigate}
    />
  );
};

class Login extends Component {
    state = {
      email: '',
      password: ''
      
  }
  
  handleChangeText = (e) => {
      this.setState({
          [e.target.id]: e.target.value,
      }) 
 }

  handleLoginSubmit = async () => {
      const {email, password} = this.state;
      const res = await this.props.loginAPI({email, password}).catch(err => err);
      if(res) {
        console.log('login success', res);
        localStorage.setItem('userData', JSON.stringify(res))
        this.setState({
            email: '',
            password: ''
        })
        this.props.navigate("/");
      }else {
          console.log('login failed');
      }

  }

    render(){
        return(
          <div>
          <div className='auth-container'>
              <div className='auth-card'>
                  <p>Login Page</p>
                  <input className='input' id='email' placeholder='Email' type="text" onChange={this.handleChangeText} value={this.state.email}></input>
                  <input className='input' id='password' placeholder='Password' type="password" onChange={this.handleChangeText} value={this.state.password}></input>
                  <Button onClick={this.handleLoginSubmit} title='Login' loading={this.props.isLoading}/>
              </div>
          </div>
      </div>
        )
    }
}



const reduxState = (state) => ({
  isLoading: state.isLoading
})

const reduxDispatch = (dispatch)=> ({
  loginAPI: (data) => dispatch(loginUserAPI(data))
})

export default withRouter(connect(reduxState, reduxDispatch)(Login));