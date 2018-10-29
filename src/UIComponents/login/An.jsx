import React from 'react'

const An = (props) =>{
    const{cn, oc, t} = props
  return (
      <span className={cn} onClick={oc}>{t}</span>
  )
}

export default An;
