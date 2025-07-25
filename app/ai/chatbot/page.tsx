"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain, MessageSquare, Settings, Activity, Users, Clock, TrendingUp, Send, Bot, User } from "lucide-react"

export default function ChatbotPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Olá! Sou a Dama.AI, sua assistente virtual. Como posso ajudá-lo hoje?",
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: message,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "bot" as const,
        content:
          "Entendi sua solicitação. Estou processando as informações e em breve fornecerei uma resposta completa com base nos dados da rede DamaFace.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const stats = [
    {
      title: "Conversas Hoje",
      value: "247",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Taxa de Resolução",
      value: "94%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Tempo Médio",
      value: "2.3 min",
      change: "-15%",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      title: "Usuários Ativos",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Brain className="mr-3 h-8 w-8 text-purple-600" />
            Dama.AI - Assistente Virtual
          </h1>
          <p className="text-muted-foreground">Inteligência artificial para atendimento automatizado 24/7</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="w-3 h-3 mr-1" />
            Online
          </Badge>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> nas últimas 24h
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Interface de Teste</CardTitle>
            <CardDescription>Teste e configure as respostas da Dama.AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Messages */}
              <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {msg.type === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        <span className="text-xs opacity-70">{msg.type === "bot" ? "Dama.AI" : "Você"}</span>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações da IA</CardTitle>
            <CardDescription>Personalize o comportamento da Dama.AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Personalidade</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Profissional e Acolhedora</option>
                <option>Formal</option>
                <option>Casual</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Idioma Principal</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>Português (BR)</option>
                <option>Inglês</option>
                <option>Espanhol</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Conhecimento Base</label>
              <Textarea
                placeholder="Informações específicas sobre a DamaFace que a IA deve conhecer..."
                className="mt-1"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Funcionalidades Ativas</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Agendamento de consultas</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Informações sobre tratamentos</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Suporte técnico básico</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span className="text-sm">Análise de imagens</span>
                </label>
              </div>
            </div>

            <Button className="w-full">Salvar Configurações</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Interactions */}
      <Card>
        <CardHeader>
          <CardTitle>Interações Recentes</CardTitle>
          <CardDescription>Últimas conversas e principais tópicos abordados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { topic: "Agendamento de consulta", count: 45, time: "Última hora" },
              { topic: "Informações sobre preços", count: 32, time: "2 horas atrás" },
              { topic: "Localização das clínicas", count: 28, time: "3 horas atrás" },
              { topic: "Dúvidas sobre tratamentos", count: 19, time: "4 horas atrás" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{item.topic}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
                <Badge variant="secondary">{item.count} conversas</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
