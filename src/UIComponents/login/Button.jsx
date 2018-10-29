import React from 'react';

const Button = (props) => {
    
    const check = () => {
        const {t , cn , oc, Sid} = props;
        if(oc === undefined){
            return <button className={cn}>{t}</button>
        }
        else if(t === undefined){
            return <button className={cn} onClick={() => {oc(Sid)}}><i className="material-icons">perm_identity</i></button> 
        }
        else if(Sid === undefined){
            return <button className={cn} onClick={() => {oc()}}>{t}</button>
        }
        else {return <button className={cn} onClick={() => {oc(Sid)}}>{t}</button>}
    }
    return(<div>
        {check()}
        </div>
    )
}
export default Button;