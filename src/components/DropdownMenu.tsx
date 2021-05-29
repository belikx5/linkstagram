import '../styles/dropdown.scss'
import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { deleteUserPost } from '../store/actions/userActions'

type DropdownMenuProps = {
    postId: string,
    deleteUserPost: Function
}

const DropdownMenu = ({ postId, deleteUserPost }: DropdownMenuProps) => {

    const [open, setOpen] = useState(false)
    const containerRef = React.createRef<HTMLDivElement>()

    const handleClick = () => setOpen(!open)
    const handleClickOutside = (event:any) => {
        if(containerRef.current && !containerRef.current.contains(event.target)){
            setOpen(false)
        }
    }

    useEffect(()=> {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [containerRef])
    return (
        <div className="dropdown-container" ref={containerRef}>
            <button className="dropdown-button" onClick={handleClick}>
                <img className="post-header-menu" src="../../assets/menu.svg"/>
            </button>
            {open && <div className="dropdown">
                    <ul>
                        <li onClick={() => {
                            deleteUserPost(postId)
                            setOpen(false)
                        }}>Delete</li>
                    </ul>
                </div>
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch:any)=> bindActionCreators({deleteUserPost}, dispatch)

export default connect(null, mapDispatchToProps)(DropdownMenu)
