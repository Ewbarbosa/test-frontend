'use client'

import style from './style.module.scss';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { Header } from '@/components/HeaderAdmin';

import { useState, FormEvent, ChangeEvent } from 'react';

import { useRouter } from 'next/router';

import Link from 'next/link';

export default function Edit() {
  const router = useRouter();

  const [nomecompleto, setNomecompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cfm, setCfm] = useState('');
  const [valor, setValor] = useState('');
  const [regiao, setRegiao] = useState('');
  const [atendimento, setAtendimento] = useState('Selecione');
  const [status, setStatus] = useState('');

  const options = [
    { value: 'Selecione', label: 'Selecione' },
    { value: 'Presencial', label: 'Presencial' },
    { value: 'Online', label: 'Online' }
  ]

  const handleSelectChange = (value: string) => {
    setAtendimento(value);
  }

  return (
    <>
      <Header />

      <div className={style.container}>

        <h3>Atualização do Registro</h3>

        <form className={style.form} >

          <Input
            placeholder="Nome Completo"
            value={nomecompleto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNomecompleto(e.target.value)}
          />
          <Input
            placeholder="CPF"
            value={cpf}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)}
          />
          <Input
            placeholder="RG"
            value={rg}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRg(e.target.value)}
          />
          <Input
            placeholder="Data de Nascimento"
            value={nascimento}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNascimento(e.target.value)}
          />
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Telefone"
            value={telefone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTelefone(e.target.value)}
          />
          <Input
            placeholder="CEP"
            value={cep}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCep(e.target.value)}
          />
          <Input
            placeholder="Endereço"
            value={endereco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEndereco(e.target.value)}
          />
          <Input
            placeholder="Bairro"
            value={bairro}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBairro(e.target.value)}
          />
          <Input
            placeholder="Cidade"
            value={cidade}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCidade(e.target.value)}
          />
          <Input
            placeholder="CFM"
            value={cfm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCfm(e.target.value)}
          />

          <Input
            placeholder="Valor por hora"
            value={valor}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValor(e.target.value)}
          />
          <Input
            placeholder="Região de atendimento"
            value={regiao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRegiao(e.target.value)}
          />

          <Select
            options={options}
            value={atendimento}
            onChange={handleSelectChange}
          />

          <Button type="submit">
            Atualizar
          </Button>

        </form>

        <div className={style.back}>
          <Link href="/home">
            <Button>Voltar</Button>
          </Link>
        </div>

      </div>
    </>

  )
}