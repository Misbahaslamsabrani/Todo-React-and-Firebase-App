import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../../config/config';
import Input from '../../UIComponents/display data/Input';
import Button from '../../UIComponents/login/Button';
import Items from '../../UIComponents/display data/DisplayItems'
import Loader from '../Loader/Loader';
class DashBoard extends Component {
    constructor() {
        super()
        this.state = {
            todoItem: '',
            todoItems: [],
            editId: null,
            edit: false,
            ShowInput: false,
            UserData: null,
            data: false,

        }
        this.ref = firebase.database().ref();
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("current user")
                this.getUserData(user.uid)
            } else {
                console.log("current user null")
            }
          });
    }
    
    getTodoItems = (uid) => {
        const id = uid
        this.ref.child(`Items${id}`).on("value", (snapshot) => {
            const items = snapshot.val();
            const TempArr = [];
            for (let key in items) {
                TempArr.push({ id: key, todo: items[key].item });
            }
            this.setState({ todoItems: TempArr, data: true })
        })
    }
    getUserData = (uid) => {
        this.ref.child(`User`).on('value', (snapshot) => {
            const data = snapshot.val();
            const TemArr = [];
        
            for (let key in data) {
               TemArr.push({ Userid: key, UserName: data[key].UserName, UserEmail: data[key].UserEmail });
            }
           let User =  TemArr.find((v) => {
                return v.Userid === uid
            })

            this.getTodoItems(User.Userid);
            this.setState({UserData: User, data: true})
        })
    }
    onAdd = (event) => {
        let {UserData} = this.state;
        let userid = UserData.Userid;

        event.preventDefault();
        if (this.state.todoItem === '') {
            return
        }
        if (this.state.editId !== null) {
            this.ref.child(`Items${userid}/${this.state.editId}`).update({ item: this.state.todoItem })
        }
        else {
           this.ref.child(`Items${userid}`).push({ item: this.state.todoItem })
        }
        this.getTodoItems(userid);
        this.setState({ todoItem: '', editId: null,edit: false, ShowInput: false })
    }

    ondelete = (itemId) => {
        let {UserData} = this.state;
        let userid = UserData.Userid;
        const selectedItem = this.state.todoItems.find((item) => {
            return item.id === itemId;
        })
        if (selectedItem.todo === this.state.todoItem) {
            this.setState({ todoItem: '', editId: null, edit: false})
        }
        this.ref.child(`Items${userid}/${itemId}`).remove();
        this.getTodoItems(userid);


    }
    onEdit = (itemId) => {
        const TemArr = this.state.todoItems.find((todos) => {
            return todos.id === itemId
        });
        this.setState({todoItem: TemArr.todo, editId: itemId, ShowInput: true,edit: "Edit"});
    }

    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }
    ShowInput = () => {
        this.setState({ ShowInput: true })
    }
    showUserP = () => {
        this.setState({
            todoItem: '',
            todoItems: [],
            editId: null,
            ShowInput: false,
            UserData: null,
            data: false,
        })
        console.log("log out")
        firebase.auth().signOut();
    }
    render() {
        const { todoItems, data } = this.state;
        const showData = data ? (
            todoItems.length > 0 ? (
                <div className="container">
                    <div className="center indigo lighten-1"><h5 className="white-text">To-Do Items</h5></div>
                    <table>
                        <Items todoItems={todoItems} editItem={this.onEdit} delItem={this.ondelete} />
                    </table>
                    <br />
                    <br />
                    <div className="center"><Button cn="btn indigo" oc={this.ShowInput} t="Add More Items" /></div>
                </div>
            ) : (<div className="center">
                <h3 className="indigo-text text-lighten-2">"No, To-do Items"</h3>
                <Button cn="btn indigo" t="Add To-do" oc={this.ShowInput} />
            </div>)    
        ) : (<div className="row">
        <div className="col s5 m3 l2 offset-s4 offset-m5 offset-l5">
        <Loader />
        </div>
        </div>)
        const {UserData} = this.state;
        const UserName = this.state.UserData ? (<li><Button cn="btn-flat white-text" t={UserData.UserName}/></li>) : (null)
        return (<div>
            <nav className="nav-wrapper indigo darken-3">
                <div className="container">
                    <div className="brand-logo hide-on-med-and-down">To-do App</div>
                     <span className="hide-on-large-only text-flow">To-do App</span>
                        <ul className="right">
                        {UserName}
                        <li><Button cn="btn indigo"t="Log out" oc={this.showUserP}/></li>
                        </ul>
                </div>
            </nav>
            <br />
            <br />
            {this.state.ShowInput ? (
                <div className="container">
                    <div className="row">
                        <form onSubmit={this.onAdd}>
                            <div className="col s10 m6 l6 lighten-5 offset-l3">
                                <Input n="todoItem" v={this.state.todoItem} t="text" oc={this.whenChange} f="addItem" d="additem" l="Add Item" />
                            </div>
                            <div className="col s2 m2 l2 lighten-5">
                            {this.state.edit ? (<Button cn="btn indigo form_bu" t={this.state.edit} />) : (<Button cn="btn indigo form_bu" t="Add" />)}
                            </div>
                        </form>
                    </div>
                </div>) : (null)}

            {showData}

        </div>
        )
    }
}
export default DashBoard;