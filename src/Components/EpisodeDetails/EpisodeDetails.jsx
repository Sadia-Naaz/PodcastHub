import React from 'react'
import ButtonComponent from '../Button'
import { useNavigate } from 'react-router-dom'

const EpisodeDetails = ({Title,Description,AudioFile,onClick,id,podcastID}) => {
  const navigate = useNavigate();
  const HandleEdit=(id)=>{
      navigate(`/podcasts/${podcastID}/episodes/${id}/edit-episode`);
  }
  return (
    <div className='podcast-card'>
      <p>{Title}</p>
      <p>{Description}</p>
      <div className='button group'> 
        
      <ButtonComponent text="PLAY" onClick={()=>onClick(AudioFile)}/>
      <ButtonComponent onClick={()=>HandleEdit(id)} text="Edit Epdisode"/></div>
    </div> 
  )
}

export default EpisodeDetails
