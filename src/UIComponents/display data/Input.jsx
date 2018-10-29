import React from 'react';
const Input = (props) => {
    const{v, n, d, t, oc, l, f} = props
    return(
    <div className="row">
    <div className="input-field col s12 m12 l12">
    <input value={v} name={n} id={d} type={t} className="validate" onChange={oc}/>
    <label  className="active indigo-text" htmlFor={f}>{l}</label>
    </div>
    </div>
    )
}
export default Input;