import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from '../../../store/index'
import { setAge } from '../../../store/mainSlice'
import { valuesData } from '../valuesData'
import cl from '../Start.module.scss'


const Age: React.FC = () => {
    const dispatch = useAppDispatch ()
    const age = useSelector ((state: RootState) => state.main.age)

    const userAgeHandler = (value: string) => {
        if (value !== age.userAge) {
            dispatch (setAge ({...age, userAge: value}))
        }
    }
    const opponentAgeHandler = (value: string) => {
        for (let i = 0; i < age.opponentAge.length; i++) {
            if (value === age.opponentAge [i]) {
                dispatch (setAge ({
                    ...age, 
                    opponentAge: age.opponentAge.filter (item => item !== value)
                }))
                return
            }
        }
        dispatch (setAge ({...age, opponentAge: [...age.opponentAge, value]}))
    }

    const opponentClasses = (value: string) => {
        for (let i = 0; i < age.opponentAge.length; i++) {
            if (value === age.opponentAge [i]) {
                return [cl.root__settingsItem, cl.root__settingsItem_active].join (' ')
            }                     
        }
        return cl.root__settingsItem
    }

    return (
        <div className={cl.root__settings_detail}>
            <div>
                <h3>Ваш возраст:</h3>
                {valuesData.age.map (value => 
                    <button 
                        key={value}
                        className={value === age.userAge 
                            ? [cl.root__settingsItem, cl.root__settingsItem_active].join (' ')
                            : cl.root__settingsItem}
                        onClick={() => userAgeHandler (value)}
                    >{value}</button>)}
            </div>
            <div>
                <h3>Возраст собеседника:</h3>
                {valuesData.age.map (value => 
                    <button 
                        key={value}
                        className={opponentClasses (value)}
                        onClick={() => opponentAgeHandler (value)}
                    >{value}</button>)}
            </div>
        </div>
    )
}

export default Age