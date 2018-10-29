import React from 'react'

const  InputS = (props) => {
    const {f,d,l,n,t, oc, v,m, e, p} = props;
  return (
    <div className="row">
    <div className="input-field col s10 m10 l10">
    <input value={v} name={n} id={d} type={t} className="validate" onChange={oc}/>
    <label className="indigo-text" htmlFor={f}>{l}</label>
    {e ? <div className="red-text">{m}</div> : null}
    {p ? <div className="red-text">{m}</div> : null}
    </div>
    </div>
  )
}

export default InputS
