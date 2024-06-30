
const ButtonComponent=({text,onClick,disabled}) =>{
  return (
    <div>
    <button className='button'onClick={onClick} disabled={disabled}>
      {text}
    </button>
    </div>
  )
}

export default ButtonComponent
