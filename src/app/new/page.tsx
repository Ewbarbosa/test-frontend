'use client'

import style from './style.module.scss'

import axios from 'axios';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Header } from '@/components/HeaderAdmin';

import { useState, ChangeEvent, FormEvent } from 'react';

import { useRouter } from 'next/navigation'

import Link from 'next/link';

interface ProfessionalsProps {
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

export default function New() {

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
  const [status, setStatus] = useState('Ativo');

  const options = [
    { value: 'Selecione', label: 'Selecione' },
    { value: 'Presencial', label: 'Presencial' },
    { value: 'Online', label: 'Online' }
  ]

  const api = axios.create({
    baseURL: 'http://localhost:3001'
  });

  const apiCep = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
  })

  const handleCep = async (event: ChangeEvent<HTMLInputElement>) => {
    const novoCep = event.target.value;
    setCep(novoCep);

    if (novoCep.length === 8) {
      const res = await apiCep.get(novoCep + '/json/');

      const data = res.data;

      setCep(data.cep);
      setEndereco(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
    }
  }

  async function primaryKey(): Promise<boolean> {
    try {
      const res = await api.get('/professionals');

      const professionals = res.data;

      const foundProfessionals = professionals.find((professional: ProfessionalsProps) => professional.cpf === cpf);

      if (foundProfessionals) {
        return true;
      } else {
        return false;
      }
    } catch {
      return true;
    }
  }

  async function newResgister(event: FormEvent) {
    event.preventDefault();

    if (nomecompleto === '' || cpf === '' || rg === '' || nascimento === ''
      || email === '' || telefone === '' || cep === '' || endereco === ''
      || bairro === '' || cidade === '' || cfm === '' || valor === ''
      || regiao === '' || atendimento === 'Selecione') {
      alert('Preencha os campos obrigatórios!');
      return
    }

    const validador = await primaryKey();

    if (validador) {
      alert('Já existe um registro com este CPF.')
      throw new Error('Erro!');
    }

    try {
      const res = await api.post('/professionals', {
        nomecompleto,
        cpf,
        rg,
        nascimento,
        email,
        telefone,
        cep,
        endereco,
        bairro,
        cidade,
        cfm,
        valor,
        regiao,
        atendimento,
        status
      })

      alert('Salvo com sucesso!');
      setNomecompleto('');
      setCpf('');
      setRg('');
      setNascimento('');
      setEmail('');
      setTelefone('');
      setCep('');
      setEndereco('');
      setBairro('');
      setCidade('');
      setCfm('');
      setValor('');
      setRegiao('');
      setAtendimento('Selecione');

      //console.log('Salvo com sucesso!');
    } catch {
      alert('Erro ao salvar o registro.')
    }
  }

  const handleSelectChange = (value: string) => {
    setAtendimento(value);
  }

  return (
    <>
      <Header />
      <div className={style.container}>

        <h3>Novo Registro</h3>

        <form className={style.form} onSubmit={newResgister}>

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
            onChange={handleCep}
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

          <Button
            type='submit'
          >
            Salvar
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