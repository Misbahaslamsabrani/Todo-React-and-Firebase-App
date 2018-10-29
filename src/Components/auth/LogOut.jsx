import React from 'react';
import Anchor from '../../UICom/Anchor';
import * as firebase from 'firebase';
import '../../config/fb'
const LogOut = (props) => {
   const whenClick = () => {
       props.history.push('/')
        firebase.auth().signOut();
        
    }
    const WhenClick = () => {
        props.history.push('/')
    }
    return (
        <div className="container">
        <br/>
        <br/>
        <br/>
        <div className="row">
                <div className="col s10 m6 l6 offset-l3">
                    <div className="card teal lighten-5">
                        <div className="card-content">
                            <b className="card-title teal-text">Log out</b>
                            <p className="Black-text">Are you sure, You want to log out?</p>
                        </div>
                        <div className="card-action">
                        <Anchor cn="btn-small black-text" t="Cancel" oc={WhenClick} />
                        &nbsp; &nbsp; &nbsp;
                        <Anchor cn="btn-small black-text" t="Log out" oc={whenClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LogOut;