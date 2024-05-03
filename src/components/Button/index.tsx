import { ButtonHTMLAttributes, ReactNode } from 'react'
import style from './style.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {  
  children: ReactNode
}

export function Button({children, ...rest}: ButtonProps) {
  return (
    <button className={style.button}>{children}</button>
  )
}