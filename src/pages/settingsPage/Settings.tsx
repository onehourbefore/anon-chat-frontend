import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from '../../store'
import { Link } from 'react-router-dom'
import { setTheme, setShowThemeSelection, setFont } from '../../store/mainSlice'
import backIcon from '../../assets/back.png'
import cl from './Settings.module.scss'


const Settings: React.FC = () => {
    const dispatch = useAppDispatch ()
    const { theme, font } = useSelector ((state: RootState) => state.main)
    const [checkbox, setCheckbox] = React.useState ('')

    const changeTheme = (theme: {value: string, name: string}) => {
        dispatch (setTheme (theme))
    }

    const showThemeDiv = () => {
        dispatch (setShowThemeSelection (!theme.showThemeSelection))
    }

    const changeFont = (fontParams: {value: string, name: string, size: string}) => {
        dispatch (setFont (fontParams))
    }

    return (
        <div className={cl.root}>
            <div className={cl.root__back}>
                <Link to="/chat">
                    <img src={backIcon} alt="Назад" />
                </Link>
            </div>
            <h3 className={cl.root__title}>Оформление</h3>
            <div className={cl.root__inputsDiv}>
                <div className={cl.root__inputsDiv_subtitle}>
                    Изменить фон чата
                </div>
                {theme.values.map (item => 
                    <div 
                        className={cl.root__inputsDiv_wrapper} 
                        key={item.value}
                    >
                        <label
                            className={item.value === theme.selected.value ? cl.root__active : ''}
                            onClick={() => changeTheme (item)} 
                            htmlFor={item.value}>{item.name} тема</label>
                        <input
                            onClick={() => changeTheme (item)} 
                            type="radio" 
                            id={item.value} 
                            name="theme" 
                            value={item.value}
                            checked={item.value === theme.selected.value} 
                            />
                    </div>)}
                <div className={cl.root__inputsDiv_wrapper}>
                    <label htmlFor="showThemeSelection">
                        Показать выбор темы на главном экране
                        </label>
                    <input
                        type="checkbox" 
                        id="showThemeSelection" 
                        checked={theme.showThemeSelection}
                        onChange={showThemeDiv}
                        />
                </div>

                <div className={cl.root__inputsDiv_subtitle}>
                    Изменить размер шрифтов
                </div>
                {font.values.map (item => 
                    <div 
                        className={cl.root__inputsDiv_wrapper} 
                        key={item.value}
                    >
                        <label
                            className={item.value === font.selected.value ? cl.root__active : ''}
                            onClick={() => changeFont (item)} 
                            htmlFor={item.value}>{item.name}</label>
                        <input
                            onClick={() => changeFont (item)} 
                            type="radio" 
                            id={item.value} 
                            name="font"
                            value={item.value}
                            checked={item.value === font.selected.value}
                            />
                    </div>)}
            </div>
        </div>
    )
}

export default Settings