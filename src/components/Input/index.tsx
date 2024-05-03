import { InputHTMLAttributes, ReactNode } from 'react'
import style from './style.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode
}

export function Input({...rest}) {
    return (
        <input className={style.input} {...rest}/>
    )
}