import React, { useState } from 'react'


const FileInputComponent = ({accept,id,fileHandleFn,text,placeholder}) => {
      const[fileSelected,setFileSelected]=useState("");
      const onChange = (event)=>{
        setFileSelected(event.target.files[0].name);
        console.log(event.target.files[0].name)
       fileHandleFn(event.target.files[0]);
      }
  return (
    <>
     <div className='file-input-wrapper input-wrapper'>
      <label htmlFor={id} >
        {fileSelected ? `file${fileSelected}is selected`:"import image"}
      </label>

      <input 
      type='file'
      id={id}
      accept={accept}
      onChange={onChange}
      className={`custom-input ${!fileSelected}?"label-input":"active"`}
      text={text}
      placeholder={placeholder}
      />
      </div>
    </>
  )
}

export default FileInputComponent;
