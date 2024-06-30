import React from 'react'

import { Link, useNavigate } from 'react-router-dom';
import ButtonComponent from '../Button';
const PodcastCard = ({ id,DisplayImg,Title}) => {
  const navigate =useNavigate();
  const handleEdit=(id)=>{
    navigate(`/podcasts/${id}/edit`);
  }
  return (
    // <Link to={`/podcasts/${id}`}>
    <div className='podcast-card'>
        <img src={DisplayImg}/>
        <h3 className='card-title'>{Title}</h3>
        <ButtonComponent onClick={()=>handleEdit(id)} text="Edit-Podcast"/>
         <Link to={`/podcasts/${id}`}>Click For Details</Link>
      
    </div>
   
  )
}

export default PodcastCard
