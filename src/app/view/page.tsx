'use client'
import style from './style.module.scss';

import axios from 'axios';

import { useState, useEffect } from 'react';

interface ListProps {
  id: string;
  nomecompleto: string;
  cpf: string;
  rg: string;
  nascimento: string;
  email: string;
  telefone: string;
  cep: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cfm: string;
  valor: string;
  regiao: string;
  atendimento: string;
  status: string;
}

export default function View() {

  const [list, setList] = useState<ListProps[]>([]);

  const api = axios.create({
    baseURL: 'http://localhost:3001'
  });

  async function getList(): Promise<ListProps[]> {

    return new Promise<ListProps[]>(async (resolve, reject) => {

      const res = await api.get('/professionals');

      const list = res.data;

      resolve(list);
    })
  }

  useEffect(() => {
    getList()
      .then(list => {
        setList(list);
        console.log(list);
      })
      .catch(err => {
        console.log('Erro');
      });
  }, []);

  const [nomecompleto, setNomecompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cfm, setCfm] = useState('');
  const [valor, setValor] = useState('');
  const [regiao, setRegiao] = useState('');
  const [atendimento, setAtendimento] = useState('');

  return (
    <div className={style.container}>

      <h2>Profissionais Disponíveis</h2>

      <div className={style.content}>
        <table className={style.table}>
          <thead className={style.table}>
            <tr>
              <th>CFM</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Valor Hora</th>
              <th>Atende em</th>
              <th>Atendimento</th>
            </tr>
          </thead>
          <tbody>

            {list.map(item => (
              <tr key={item.id} className={style.tr}>
                <td>{item.cfm}</td>
                <td>{item.nomecompleto}</td>
                <td>{item.email}</td>
                <td>{item.telefone}</td>
                <td>{item.valor}</td>
                <td>{item.regiao}</td>
                <td>{item.atendimento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}