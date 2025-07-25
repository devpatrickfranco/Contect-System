"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Building2,
  GraduationCap,
  Brain,
  Settings,
  BarChart3,
  Stethoscope,
  UserCheck,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Gestão Clínica",
    icon: Stethoscope,
    items: [
      { title: "Prontuários", url: "/clinical/records" },
      { title: "Agenda", url: "/clinical/schedule" },
      { title: "Protocolos", url: "/clinical/protocols" },
      { title: "Estoque", url: "/clinical/inventory" },
    ],
  },
  {
    title: "Pacientes",
    url: "/patients",
    icon: Users,
  },
  {
    title: "Rede & Franquias",
    icon: Building2,
    items: [
      { title: "Franquias", url: "/network/franchises" },
      { title: "Auditorias", url: "/network/audits" },
      { title: "Campanhas", url: "/network/campaigns" },
      { title: "Biblioteca", url: "/network/library" },
    ],
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    items: [
      { title: "Contas a Receber", url: "/financial/receivables" },
      { title: "Contas a Pagar", url: "/financial/payables" },
      { title: "Comissões", url: "/financial/commissions" },
      { title: "Relatórios", url: "/financial/reports" },
    ],
  },
  {
    title: "CRM & Marketing",
    icon: TrendingUp,
    items: [
      { title: "Leads", url: "/crm/leads" },
      { title: "Campanhas", url: "/crm/campaigns" },
      { title: "Redes Sociais", url: "/crm/social" },
      { title: "Analytics", url: "/crm/analytics" },
    ],
  },
  {
    title: "RH & Treinamento",
    icon: GraduationCap,
    items: [
      { title: "Colaboradores", url: "/hr/employees" },
      { title: "Treinamentos", url: "/hr/training" },
      { title: "Escalas", url: "/hr/schedules" },
      { title: "Avaliações", url: "/hr/evaluations" },
    ],
  },
  {
    title: "Dama.AI",
    icon: Brain,
    badge: "IA",
    items: [
      { title: "Chatbot", url: "/ai/chatbot" },
      { title: "Análises", url: "/ai/analytics" },
      { title: "Configurações", url: "/ai/settings" },
      { title: "Treinamento", url: "/ai/training" },
    ],
  },
  {
    title: "Relatórios",
    url: "/reports",
    icon: BarChart3,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">DamaFace</h2>
            <p className="text-xs text-muted-foreground">Conect System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <details className="group">
                      <summary className="flex items-center justify-between p-2 hover:bg-sidebar-accent rounded-md cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      </summary>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </details>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url || "#"}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <UserCheck className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">Franqueadora</p>
          </div>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
