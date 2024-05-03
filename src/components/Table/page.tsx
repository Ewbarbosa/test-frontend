import style from './style.module.scss'

import axios from 'axios'

export function Table() {  

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Ewerton</td>
        </tr>
      </tbody>
    </table>
  )
}