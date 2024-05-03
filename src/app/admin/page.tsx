
'use client'
import style from "./style.module.scss";

import axios from 'axios'

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { FormEvent, ChangeEvent, useState, useEffect } from 'react';

import { useRouter } from 'next/navigation'

interface UserProps {
  username: string;
  password: string;
}

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const usernameLocalStorage = localStorage.getItem('Username');

    if(usernameLocalStorage) {
      alert('Já existe uma sessão aberta, você será redirecionado.')
      router.push('/home');
    }
  }, [])  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:3001'
  })

  async function Sign(event: FormEvent) {
    event.preventDefault();

    const response = await api.get('/users');

    const users = response.data;

    const foundUser = users.find((user: UserProps) => user.username === username && user.password === password);

    if (foundUser) {
      localStorage.setItem('Username', foundUser.username);
      router.push('/home');
    } else {
      alert('Usuário/Senha inválido.')
    }
  }

  return (
    <div className={style.container}>

      <form className={style.form} onSubmit={Sign}>
        <h1>Login</h1>

        <Input
          type='text'
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          onClick={Sign}
        >Entrar</Button>
      </form>

    </div>
  );
}
