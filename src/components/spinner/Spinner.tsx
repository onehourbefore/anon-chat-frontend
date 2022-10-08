import React from 'react'
import cl from './Spinner.module.scss'

const Spinner: React.FC = () => {
    return (
        <div className={cl.root}>
            <div className={cl.root__spinner}></div>
        </div>
    )
}

export default Spinner