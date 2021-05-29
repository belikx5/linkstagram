import '../styles/createPost.scss'
import React, { useState } from 'react'
import { savePhoto, createPost } from '../firebase/helpers'
import history from '../services/history'
import { fetchUserPosts } from '../store/actions/userActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

type CreateFormProps = {
    setModalOpen?: Function,
    fetchUserPosts: Function,
}

const CreatePostForm = ({ setModalOpen, fetchUserPosts }: CreateFormProps) => {
    const [image, setImage] = useState<string>('');
    const [description, setDescription] = useState('');
    const [fileLoading, setFileLoading] = useState(false);

    const onFileChange = (e:any) => {
        setFileLoading(true)
        const file = e.target.files[0];
        savePhoto(file)
            .then(url => {
                setImage(url)
                setFileLoading(false)
            })
    }

    const onPostClick = () => {
        createPost(image, description)
        .then(()=>{
            fetchUserPosts()
            //fetchUserFollowing()
            if(setModalOpen)
                setModalOpen(false)
            else 
                history.push('/profile')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const onCancelClick = () => {
        if(setModalOpen)
            setModalOpen(false)
        else 
            history.push('/profile')
    }

    return (
        <div className="create-post-form">
            <input
                id="file"
                className="create-post-file-loader"
                type="file"
                accept="image/*"
                onChange={onFileChange}
            />
            <label htmlFor="file" className="file-loader-label">
            <div className={`file-loader-label-inner ${image ? "max-size" : ""}`}>
                {image 
                ? <img src={image} className="max-size"/>
                : <img src="../../assets/default-image.svg"/>
                }
                Upload any photos from your library
                </div>
            </label>
            <div className="create-form-item">
                <label 
                    htmlFor="description" 
                    className="create-post-form-label">
                    Description
                </label>
                <textarea
                    id="description" 
                    className="create-post-form-textarea"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
            </div>
            <div className="create-form-actions">
                <button 
                    onClick={onCancelClick}
                    className="create-form-action-button">
                    Cancel
                </button>
                <button 
                    disabled={fileLoading}
                    onClick={onPostClick} 
                    className="create-form-action-button">
                    Post
                </button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch:any) => bindActionCreators({
    fetchUserPosts,
}, dispatch)

export default connect(null,mapDispatchToProps)(CreatePostForm)
