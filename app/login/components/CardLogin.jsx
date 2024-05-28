import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import React, { useState } from 'react'
import sendPasswordResetEmail from "../api/resetPassword"
import { login } from "../api/login.js"

export default function CardLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    try {
      const user = await login(username, password);
    } catch (error) {
      console.log('432')
      console.error('Erro ao tentar fazer login: ', error.message);
      setErro(error.message);
    }
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === '') {
      console.log('432')
    } else if (password.trim() === '') {
      console.log('432')
    } else {
      handleLogin();
    }
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const acessaCadastro = () => {
    window.location.assign('/cadastro');
  }

  const acessaGerenciarTitulos = () => {
    window.location.assign('/gerenciar-titulos');
  }

  const acessaHome = () => {
    window.location.assign('/');
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Informe suas credenciais abaixo:</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Usuário</Label>
              <Input
                type="email"
                id="username"
                placeholder="Digite o seu e-mail"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              {showPassword ? (
                <Input
                  type="text"
                  id="password"
                  placeholder="Digite a sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <Input
                  type="password"
                  id="password"
                  placeholder="Digite a sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Visualizar senha
                </label>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" style={{ width: '143px' }} onClick={handleSubmit}>Confirmar</Button>
        <Button style={{ width: '143px' }} onClick={acessaCadastro}>Cadastrar</Button>
      </CardFooter>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePasswordReset}>
          <Mail className="mr-2 h-4 w-4" /> Esqueci minha senha
        </Button>
        <Button onClick={acessaHome}>Cancelar</Button>
      </CardFooter>
    </Card>
  )
}