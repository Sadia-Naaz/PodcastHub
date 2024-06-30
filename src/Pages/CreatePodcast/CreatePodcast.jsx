import React from 'react'
import PodcastForm from '../../Components/PodcastForm/PodcastForm'
import Header from '../../Components/Header'

const CreatePodcast = () => {


  return (
    <div >
       <Header/>
      <h1>Create Podcast</h1>
      <div className='page-container'>
        <div className='form-container'>
        <PodcastForm/>
        </div>
      </div>
     
    </div>
  )
}

export default CreatePodcast;
