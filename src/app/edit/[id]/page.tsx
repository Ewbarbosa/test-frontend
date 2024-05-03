'use client'

import style from '../style.module.scss';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Header } from '@/components/HeaderAdmin';

import axios from 'axios';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { Select } from '@/components/Select';

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

export default function Edite({ params }: {
  params: { id: string }
}) {

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

  const router = useRouter();

  const api = axios.create({
    baseURL: 'http://localhost:3001'
  })

  useEffect(() => {

    const handle = async () => {

      const response = await api.get('/professionals');

      const professionals = response.data;

      const foundProfessional = professionals.find((professional: ProfessionalsProps) => professional.id === params.id);

      if (foundProfessional) {
        setNomecompleto(foundProfessional.nomecompleto);
        setCpf(foundProfessional.cpf);
        setRg(foundProfessional.rg);
        setNascimento(foundProfessional.nascimento);
        setEmail(foundProfessional.email);
        setTelefone(foundProfessional.telefone);
        setCep(foundProfessional.cep);
        setEndereco(foundProfessional.endereco);
        setBairro(foundProfessional.bairro);
        setCidade(foundProfessional.cidade);
        setCfm(foundProfessional.cfm);
        setValor(foundProfessional.valor);
        setRegiao(foundProfessional.regiao);
        setAtendimento(foundProfessional.atendimento);
        setStatus(foundProfessional.status);
      }
      //console.log(response.data);
    }

    handle();
  }, [])

  async function Update(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.put('/professionals/' + params.id, {
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
      });

      alert('Registro atualizado!');
      router.push('/home');
    } catch {
      throw new Error('Erro ao atulizar o registro.');
    }
  }

  async function deleteprofessional() {
    try {
      const response = await api.delete('/professionals/' + params.id);

      alert('Registro excluído');
      router.push('/home');
    } catch {
      throw new Error('Erro ao apagar.');
    }
  }

  const handleSelectChange = (value: string) => {
    setStatus(value);
  }

  const handleSelectChange2 = (value: string) => {
    setAtendimento(value);
  }

  const options = [
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Inativo', label: 'Inativo' }
  ]

  const options2 = [
    { value: 'Presencial', label: 'Presencial' },
    { value: 'Online', label: 'Online' }
  ]

  return (
    <>
      <Header />

      <div className={style.container}>

        <h3>Atualização do Registro {params.id}</h3>

        <form className={style.form} onSubmit={Update} >

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
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCfm(e.target.value)}
          />

          <Input
            placeholder="Região de Atendimento"
            value={regiao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCfm(e.target.value)}
          />

          <Select
            options={options2}
            value={atendimento}
            onChange={handleSelectChange2}
          />

          <Select
            options={options}
            value={status}
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

          <button className={style.btDelete} onClick={deleteprofessional}>Apagar</button>

        </div>

      </div>
    </>

  )
}