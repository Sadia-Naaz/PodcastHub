import React from 'react'

function InputComponent({state,setState,type,placeholder,required}) {
  return (
    <div className='input-wrapper'>
    <input
    type={type}
    value={state}
    onChange={(e)=>setState(e.target.value)}
    placeholder={placeholder}
    required={required}
    className='custom-input'
    style={{border:"2px solid var(--grey"}}
    /> 
    </div>
 )
}

export default InputComponent
