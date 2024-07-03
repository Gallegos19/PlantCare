import React from 'react'
import Style from './Button.module.css'

export default function Button(props) {
  return (
    <div className={Style.ContainerButton}>
        <button>
            {props.title}
        </button>
    </div>
  )
}
