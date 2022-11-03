import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import './styles/main.css'
import { Note } from './components/note'


const App = () => {

    const baseURL = 'http://127.0.0.1:8000'

    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [posts, setPosts] = useState([])

    const createNote = async (event) => {

        event.preventDefault();

        const new_request = new Request(
            `${baseURL}/posts/`,
            {
                body: JSON.stringify({ title, content }),
                headers: {
                    'Content-Type': 'Application/Json'
                },
                method: 'POST'
            }
        );

        const response = await fetch(new_request);

        const data = await response.json();

        if (response.ok) {
            console.log(data)
        }
        else {
            console.log("Failed Network Request")
        }

        setTitle('')
        setContent('')

        setModalVisible(false);

        getAllPosts()
    }

    const getAllPosts = async () => {
        const response = await fetch(`${baseURL}/posts/`)

        const data = await response.json()

        if (response.ok) {
            console.log(data)
            setPosts(data)
        }
        else {
            console.log("Failed Network Request")
        }
    }

    useEffect(
        () => {
            getAllPosts()
        }, []
    )


    const deleteItem = async (noteId) => {
        console.log(noteId)

        const response = await fetch(`${baseURL}/posts/${noteId}/`, {
            method: 'DELETE'
        })

        if (response.ok) {
            console.log(response.status)
        }

        getAllPosts()
    }
    return (
        <div>
            <div className='header'>
                <div className='logo'>
                    <p className='title'>
                        Notes App
                    </p>
                </div>
                <div className='add-section'>
                    <a className='add-btn' href='#' onClick={() => setModalVisible(true)}>
                        Add Notes
                    </a>
                </div>
            </div>
            {posts.length > 0 ?

                (<div className='post-list'>
                    {
                        posts.map(
                            (item) => (
                                <Note title={item.title}
                                    content={item.content}
                                    onClick={() => deleteItem(item.id)} />
                            )
                        )
                    }
                </div>)
                : (
                    <div className='posts'>
                        <p className='centerText'>
                            No posts
                        </p>
                    </div>
                )
            }
            <div className={modalVisible ? 'modal' : 'modal-not-visible'}>
                <div className='form'>
                    <div className='form-header'>
                        <div>
                            <p className='form-header-text'>
                                Create a Note
                            </p>
                        </div>
                        <div>
                            <a href='#' className='close-btn' onClick={() => setModalVisible(!modalVisible)}>X</a>
                        </div>
                    </div>
                    <form action=''>
                        <div className='form-group'>
                            <lable htmlFor='title'>
                                Title
                            </lable>
                            <input type='text' name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' required />
                        </div>
                        <div className='form-group'>
                            <lable htmlFor='content'>
                                Content
                            </lable>
                            <textarea name='content' id='' rows='5' value={content} onChange={(e) => setContent(e.target.value)} className='form-control' required></textarea>
                        </div>
                        <div className='form-group'>
                            <input type='submit' value='Save' className='btn' onClick={createNote} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

ReactDom.render(<App />, document.querySelector('#root'));