import React, { useState, useEffect } from 'react';
import InputComponent from '../../SignUpComponents/InputComponent';
import ButtonComponent from '../../Components/Button';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import FileInputComponent from '../../SignUpComponents/FileInputComponent';

const EpisodeEditForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [audioFile, setAudioFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { podcastId, episodeId } = useParams(); // Get IDs from URL params

    useEffect(() => {
        if (episodeId) {
            const fetchEpisode = async () => {
                const docRef = doc(db, "podcasts", podcastId, "episodes", episodeId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.Title);
                    setDescription(data.Description);
                    setAudioFile(data.AudioFile);
                }
            };
            fetchEpisode();
        }
    }, [podcastId, episodeId]);

    const handleSubmit = async () => {
        if (title && description) {
            setLoading(true);
            try {
                let audioFileUrl = audioFile;

                if (typeof audioFile === 'object') {
                    const audioFileRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                    await uploadBytes(audioFileRef, audioFile);
                    audioFileUrl = await getDownloadURL(audioFileRef);
                }

                const episodeData = {
                    Title: title,
                    Description: description,
                    AudioFile: audioFileUrl,
                    Created_by: auth.currentUser.uid,
                };

                if (episodeId) {
                    const docRef = doc(db, "podcasts", podcastId, "episodes", episodeId);
                    await updateDoc(docRef, episodeData);
                    toast.success("Episode updated successfully!");
                    navigate(`/podcasts/${podcastId}`);
                } else {
                    const docRef = await addDoc(collection(db, "podcasts", podcastId, "episodes"), episodeData);
                    toast.success("Episode created successfully!");
                    navigate(`/podcasts/${podcastId}`);
                }

                setLoading(false);
            } catch (error) {
                toast.error(error.message);
                console.log(error);
                setLoading(false);
            }
        } else {
            toast.error("Please fill all the required fields");
        }
    };

    const handleAudioFileChange = (file) => {
        setAudioFile(file);
    };

    return (
        <> <div className='page-container'>
            <div className='form-container'>
            <InputComponent
                state={title}
                setState={setTitle}
                type="text"
                placeholder="Title"
                required={true}
            />
            <InputComponent
                state={description}
                setState={setDescription}
                type="text"
                placeholder="Description"
                required={true}
            />
            <FileInputComponent
                accept="audio/*"
                id="Audio-File-Input"
                fileHandleFn={handleAudioFileChange}
                text="Audio File Upload"
            />
            <ButtonComponent text={"Update Episode"} onClick={handleSubmit} />
            {loading && <Loader />}
            </div>
        </div>
        </>
    );
};

export default EpisodeEditForm;
