import React, { Component } from 'react';
import Button from '../../UIComponents/login/Button';
import InputS from '../../UIComponents/login/InputS';
import An from '../../UIComponents/login/An';
import * as firebase from 'firebase';
import '../../config/config'
import './LogIn.css'
class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            UserName: '',
            UserEmail: '',
            UserPass: '',
            SignUp: false,
            LogIn: true,
            ForgetPass: false,
            messageE: '',
            messageP: '',
            email: null,
            pass : null,

        }
        this.ref = firebase.database().ref();

    }
    onAdd = (event) => {
        event.preventDefault();
        if (this.state.UserEmail === '' || this.state.UserPass === '') {
            return
        }
        else if (this.state.LogIn) {
            firebase.auth().signInWithEmailAndPassword(this.state.UserEmail, this.state.UserPass)
                .then((user) => { console.log("User Logged In") })
                .catch((error) => {
                    console.log({code: error.code,login: error.message});
                    if(error.code === "auth/invalid-email"){
                    this.setState({messageE: error.message, email: true})
                }
                    else if(error.code === "auth/wrong-password"){
                    this.setState({messageP: error.message, pass: true})
                    }
                    else if(error.code === "auth/user-not-found"){
                        this.setState({messageE: `We can't find an account with ${this.state.UserEmail}. Try another email, or if you don't have an account, you can Sign up.`,email: true})
                    }
                    else if(error.code === "auth/user-disabled"){
                        this.setState({messageE: `Sorry, This user account has been disabled by an administrator.`, email: true})
                    }
                })
        }
        else if (this.state.SignUp) {
            firebase.auth().createUserWithEmailAndPassword(this.state.UserEmail, this.state.UserPass)
                .then((user) => { console.log("New User Logged In")
                this.ref.child("User").child(user.user.uid).set({UserName: this.state.UserName, UserEmail: this.state.UserEmail})
            })
                .catch((error) => {
                    console.log({code: error.cod, signup: error.message})
                    if(error.code === "auth/invalid-email"){
                        this.setState({messageE: error.message, email: true})
                    }
                    else if(error.code === "auth/weak-password"){
                        this.setState({messageP: error.message, pass: true})
                        }
                    if(error.code === "auth/email-already-in-use"){
                        this.setState({messageE: error.message, email: true})
                        }
                    })
        }
    }
    changePass = (event) => {
        event.preventDefault();
        if (this.state.UserEmail === '') {
            return
        }
        const auth = firebase.auth();
        const email = this.state.UserEmail;
        auth.sendPasswordResetEmail(email)
        .then((user) => {console.log("User reset password request send")})
        .catch((error) => {console.log({error: error})})

        this.setState({
        UserEmail: '', ForgetPass: false, LogIn: true
        })
        

    }
    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, email: null, pass: null, messageE: '', messageP: ''})

    }
    whenClick = () => {
        this.setState({
            UserName: '',
            UserEmail: '',
            UserPass: '',
            SignUp: true,
            LogIn: false,
            ForgetPass: false,
            messageE: '',
            messageP: '',
            email: null,
            pass : null,
         })
        
    }
    WhenClick = () => {
        this.setState({ 
            UserName: '',
            UserEmail: '',
            UserPass: '',
            SignUp: false,
            LogIn: true,
            ForgetPass: false,
            messageE: '',
            messageP: '',
            email: null,
            pass : null,
         })
    }
    WhenClicK = () => {
        this.setState({ 
            UserName: '',
            UserEmail: '',
            UserPass: '',
            SignUp: false,
            LogIn: false,
            ForgetPass: true,
            messageE: '',
            messageP: '',
            email: null,
            pass : null,
         })
    }
    render() {
        return (
            <div className="l">
                <nav className="nav-wrapper indigo">
                    <div className="container">
                        <span className="brand-logo hide-on-small-only">To-Do App</span>
                        <span className="hide-on-med-and-up">To-do App</span>
                    </div>
                </nav>
                <br />
                <br />
                <br />
                <div className="container">
                    {this.state.LogIn ? (<div className="row">
                        <div className="col s12 m6 l6 offset-l3 offset-m3">
                            <div className="card z-depth-2">
                                <form onSubmit={this.onAdd}>
                                    <div className="card-content indigo lighten-5">
                                        <div className="card-title z-depth-1 center indigo lighten-1 white-text">Log In</div>
                                        <br/>
                                        <InputS n="UserEmail" v={this.state.UserEmail} t="text" oc={this.whenChange} f="email" e={this.state.email} m={this.state.messageE} d="email" l="Email" />
                                        <InputS n="UserPass" v={this.state.UserPass} t="password" oc={this.whenChange} f="pass" p={this.state.pass} m={this.state.messageP} d="pass" l='Password' />
                                    </div>
                                    <div className="card-action indigo lighten-5">
                                        <Button cn="btn indigo form_bu" t="Log in" /> <An cn="blue-text form_a text-ligten-1 text" t="Forget Password?" oc={this.WhenClicK}/> <br/>
                                        <span className="grey-text darken-1">Don't have an account?</span>  &nbsp; <An cn="indigo-text form_a text text-darken-2" t="Sign up" oc={this.whenClick} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>) : (null)}
                    {this.state.SignUp ? (<div className="row">
                        <div className="col s12 m6 l6 offset-l3 offset-m3">
                            <div className="card z-depth-2">
                                <form onSubmit={this.onAdd}>
                                    <div className="card-content indigo lighten-5">
                                        <div className="card-title z-depth-1 center indigo lighten-1 white-text">Sign Up</div>
                                        <br/>
                                        <InputS n="UserName" v={this.state.UserName} t="text" oc={this.whenChange} f="name" d="name" l="Name" />
                                        <InputS n="UserEmail" v={this.state.UserEmail} t="text" oc={this.whenChange} f="email" e={this.state.email} m={this.state.messageE} d="email" l="Email" />
                                        <InputS n="UserPass" v={this.state.UserPass} t="password" oc={this.whenChange} f="pass" p={this.state.pass} m={this.state.messageP} d="pass" l='Password' />
                                    </div>
                                    <div className="card-action indigo lighten-5">
                                        <Button cn="btn indigo form_bu" t="Sign up" />
                                        <span className="grey-text darken-1">Already have an account?</span> &nbsp; <An  cn="indigo-text text-darken-3 text-darken-3 form_a text" t="Log in" oc={this.WhenClick} />
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>) : (null)}
                        {this.state.ForgetPass ? (
                            <div className="row">
                            <div className="col s12 m10 l8 offset-l2 offset-m1">
                                <div className="card z-depth-2">
                                    <form onSubmit={this.changePass}>
                                        <div className="card-content indigo lighten-5">
                                            <div className="card-title z-depth-1 center indigo lighten-1 white-text">Reset Password</div>
                                            <br/>
                                            <div>Enter the email address you used when creating the account and click Send Password Reset Email. 
                                                A message will be sent to that address containing a link to reset your password.</div>
                                                <br/>
                                            <InputS n="UserEmail" v={this.state.UserEmail} t="text" oc={this.whenChange} f="email" d="email" l="Email Address" />
                                        </div>
                                        <div className="card-action indigo lighten-5">
                                            <Button cn="btn indigo form_bu" t="Send Password Reset Email" />
                                            <An cn="blue-text form_a text" t="Go Back" oc={this.WhenClick} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        ) : (null)}
                </div>
            </div>
        )
    }
}
export default LogIn;