import React, {Component} from 'react';
import './Register.scss';
import firebase from '../../../config/firebase';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';

class Register extends Component {
    state = {
        email: '',
        password: ''
        
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        }) 
   }

    handleRegisterSubmit = async () => {

        const {email, password} = this.state;
        const res = await this.props.registerAPI({email, password}).catch(err => err);
        if(res) {
            // this.props.registerAPI({email, password})
            this.setState({
                email: '',
                password: ''
            })
        }
    }
    render(){
        return(
            <div>
                <div className='auth-container'>
                    <div className='auth-card'>
                        <p>Register Page</p>
                        <input className='input' id='email' placeholder='Email' type="text" onChange={this.handleChangeText} value={this.state.email}></input>
                        <input className='input' id='password' placeholder='Password' type="password" onChange={this.handleChangeText} value={this.state.password}></input>
                        <Button onClick={this.handleRegisterSubmit} title='Register' loading={this.props.isLoading}/>
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
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);