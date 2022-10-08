import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from '../../../store/index'
import { setGender } from '../../../store/mainSlice'
import { valuesData } from '../valuesData'
import cl from '../Start.module.scss'


const Gender: React.FC = () => {
    const dispatch = useAppDispatch ()
    const gender = useSelector ((state: RootState) => state.main.gender)
    
    const userGenderHandler = (value: string) => {
        if (value !== gender.userGender) {
            dispatch (setGender ({...gender, userGender: value}))
        }
    }
    const opponentGenderHandler = (value: string) => {
        if (value !== gender.opponentGender) {
            dispatch (setGender ({...gender, opponentGender: value}))
        }
    }

    return (
        <div className={cl.root__settings_detail}>
            <div>
                <h3>Ваш пол:</h3>
                {valuesData.user.map ((value, i) => 
                    <button 
                        key={value}
                        className={value === gender.userGender 
                            ? [cl.root__settingsItem, cl.root__settingsItem_active].join (' ')
                            : cl.root__settingsItem}
                        onClick={() => userGenderHandler (value)}
                    >{value}</button>)}
            </div>
            <div>
                <h3>Пол собеседника:</h3>
                {valuesData.opponent.map (value => 
                    <button 
                        key={value}
                        className={value === gender.opponentGender
                            ? [cl.root__settingsItem, cl.root__settingsItem_active].join (' ')
                            : cl.root__settingsItem}
                        onClick={() => opponentGenderHandler (value)}
                    >{value}</button>)}
            </div>
        </div>
    )
}

export default Gender