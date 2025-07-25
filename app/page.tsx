import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, DollarSign, Activity, Building2, Brain, FileText, BarChart3 } from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Pacientes Ativos",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Consultas Hoje",
      value: "156",
      change: "+8%",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Receita Mensal",
      value: "R$ 485.2K",
      change: "+23%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Franquias Ativas",
      value: "24",
      change: "+2",
      icon: Building2,
      color: "text-orange-600",
    },
  ]

  const recentActivities = [
    { type: "appointment", message: "Nova consulta agendada - Dr. Silva", time: "2 min atrás" },
    { type: "payment", message: "Pagamento recebido - Franquia SP Centro", time: "5 min atrás" },
    { type: "ai", message: "Dama.AI atendeu 15 pacientes automaticamente", time: "10 min atrás" },
    { type: "training", message: "Novo treinamento disponível - Protocolos 2024", time: "15 min atrás" },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da rede DamaFace</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="w-3 h-3 mr-1" />
            Sistema Online
          </Badge>
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
                <span className="text-green-600">{stat.change}</span> em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Nova Consulta
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Cadastrar Paciente
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Relatório Financeiro
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Brain className="mr-2 h-4 w-4" />
              Configurar Dama.AI
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas atividades da rede</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance da Rede</CardTitle>
            <CardDescription>Métricas de desempenho das franquias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Gráfico de Performance</p>
                <p className="text-xs">Integração com biblioteca de gráficos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dama.AI Analytics</CardTitle>
            <CardDescription>Estatísticas do assistente virtual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Atendimentos Hoje</span>
                <span className="font-bold">247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Taxa de Resolução</span>
                <span className="font-bold text-green-600">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tempo Médio</span>
                <span className="font-bold">2.3 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Satisfação</span>
                <span className="font-bold text-blue-600">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
