'use client'
import style from './style.module.scss';

import axios from 'axios';

import { Button } from '@/components/Button';
import { Header } from '@/components/HeaderAdmin';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'
import Link from 'next/link';

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

export default function Home() {

  const [list, setList] = useState<ListProps[]>([]);

  const api = axios.create({
    baseURL: 'http://localhost:3001'
  });

  const router = useRouter();

  async function handleList() {
    const response = await api.get('/professionals');

    const listArray = response.data;

    setList(listArray);
  }

  useEffect(() => {

    const username = localStorage.getItem('Username');

    if (username) {
      handleList();
    } else {
      router.push('/');
    }
  }, [])

  return (

    <>
      <Header />

      <div className={style.container}>

        <Button>
          <Link href="/new">
            Novo Registro
          </Link>
        </Button>

        <div className={style.content}>
          <table className={style.table}>
            <thead className={style.thead}>
              <tr>
                <th>ID</th>
                <th>Nome Completo</th>
                <th>CPF</th>
                <th>RG</th>
                <th>Nascimento</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>CEP</th>
                <th>CFM</th>
                <th>Valor Hora</th>
                <th>Região</th>
                <th>Atendimento</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>

              {list.map(item => (
                <tr key={item.id} className={style.tr}>
                  <td>{item.id}</td>
                  <td>{item.nomecompleto}</td>
                  <td>{item.cpf}</td>
                  <td>{item.rg}</td>
                  <td>{item.nascimento}</td>
                  <td>{item.email}</td>
                  <td>{item.telefone}</td>
                  <td>{item.endereco}</td>
                  <td>{item.cep}</td>
                  <td>{item.cfm}</td>
                  <td>{item.valor}</td>
                  <td>{item.regiao}</td>
                  <td>{item.atendimento}</td>
                  <td>{item.status}</td>
                  <td className={style.td}><Link href={'/edit/' + item.id}><button className={style.btEditar}>Editar</button></Link></td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </>


  )
}

