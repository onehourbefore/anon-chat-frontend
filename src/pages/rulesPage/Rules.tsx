import React from 'react'
import { Link } from 'react-router-dom'
import { valuesOfRules } from './valuesOfRules'
import backIcon from '../../assets/back.png'
import cl from './Rules.module.scss'

const Rules: React.FC = () => {
    return (
        <div className={cl.root}>
            <div className={cl.root__back}>
                <Link to="/chat"><img src={backIcon} alt="Назад" /></Link>
            </div>
            <h3 className={cl.root__title}>В АНОНИМНОМ ЧАТЕ ЗАПРЕЩЕНО:</h3>
            <ul className={cl.root__list}>
                    {valuesOfRules.map (item => 
                        <li key={item} className={cl.root__listItem}>{item}</li>)}
            </ul>
            <div className={cl.root__title}>ЗА НАРУШЕНИЕ ПРАВИЛ ВЫ БУДЕТЕ <span>ЗАБЛОКИРОВАНЫ!</span></div>
        </div>
    )
}

export default Rules