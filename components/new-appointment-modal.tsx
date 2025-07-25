"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin, X } from "lucide-react"

interface Agendamento {
  id: string
  paciente: string
  profissional: {
    nome: string
    cor: string
  }
  sala: {
    nome: string
    cor: string
  }
  procedimentos: string[]
  telefone: string
  financeiroOk: boolean
  inicio: Date
  fim: Date
  status: "Agendado" | "Cancelado" | "Realizado"
  prontuario?: string
}

interface NewAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (appointment: Agendamento) => void
}

const profissionais = [
  { nome: "Dra. Karoline", cor: "#FF69B4" },
  { nome: "Dra. Lia", cor: "#3B82F6" },
  { nome: "Dr. Roberto", cor: "#10B981" },
  { nome: "Dra. Fernanda", cor: "#F59E0B" },
  { nome: "Dr. Carlos", cor: "#8B5CF6" },
]

const salas = [
  { nome: "VINHEDO", cor: "#DC2626" },
  { nome: "JAGUARIÚNA", cor: "#EAB308" },
  { nome: "CAMPINAS", cor: "#8B5CF6" },
  { nome: "SÃO PAULO", cor: "#059669" },
  { nome: "SANTOS", cor: "#DC2626" },
]

const procedimentosDisponiveis = [
  "Limpeza de Pele",
  "Hidratação Facial",
  "Botox",
  "Preenchimento",
  "Peeling Químico",
  "Microagulhamento",
  "Laser",
  "Radiofrequência",
  "Criolipólise",
  "Massagem Modeladora",
]

export function NewAppointmentModal({ isOpen, onClose, onSave }: NewAppointmentModalProps) {
  const [formData, setFormData] = useState({
    paciente: "",
    profissional: "",
    sala: "",
    telefone: "",
    data: "",
    horaInicio: "",
    horaFim: "",
    observacoes: "",
  })
  const [selectedProcedimentos, setSelectedProcedimentos] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const addProcedimento = (procedimento: string) => {
    if (!selectedProcedimentos.includes(procedimento)) {
      setSelectedProcedimentos([...selectedProcedimentos, procedimento])
    }
  }

  const removeProcedimento = (procedimento: string) => {
    setSelectedProcedimentos(selectedProcedimentos.filter((p) => p !== procedimento))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.paciente.trim()) newErrors.paciente = "Nome do paciente é obrigatório"
    if (!formData.profissional) newErrors.profissional = "Selecione um profissional"
    if (!formData.sala) newErrors.sala = "Selecione uma sala"
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório"
    if (!formData.data) newErrors.data = "Data é obrigatória"
    if (!formData.horaInicio) newErrors.horaInicio = "Hora de início é obrigatória"
    if (!formData.horaFim) newErrors.horaFim = "Hora de fim é obrigatória"
    if (selectedProcedimentos.length === 0) newErrors.procedimentos = "Selecione pelo menos um procedimento"

    // Validar se hora de fim é posterior à hora de início
    if (formData.horaInicio && formData.horaFim && formData.horaInicio >= formData.horaFim) {
      newErrors.horaFim = "Hora de fim deve ser posterior à hora de início"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return

    const selectedProfissional = profissionais.find((p) => p.nome === formData.profissional)
    const selectedSala = salas.find((s) => s.nome === formData.sala)

    if (!selectedProfissional || !selectedSala) return

    const [year, month, day] = formData.data.split("-").map(Number)
    const [startHour, startMinute] = formData.horaInicio.split(":").map(Number)
    const [endHour, endMinute] = formData.horaFim.split(":").map(Number)

    const newAppointment: Agendamento = {
      id: Date.now().toString(),
      paciente: formData.paciente.trim(),
      profissional: selectedProfissional,
      sala: selectedSala,
      procedimentos: selectedProcedimentos,
      telefone: formData.telefone.trim(),
      financeiroOk: false,
      inicio: new Date(year, month - 1, day, startHour, startMinute),
      fim: new Date(year, month - 1, day, endHour, endMinute),
      status: "Agendado",
      prontuario: `prontuario-${Date.now()}`,
    }

    onSave(newAppointment)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      paciente: "",
      profissional: "",
      sala: "",
      telefone: "",
      data: "",
      horaInicio: "",
      horaFim: "",
      observacoes: "",
    })
    setSelectedProcedimentos([])
    setErrors({})
    onClose()
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Novo Agendamento</span>
          </DialogTitle>
          <DialogDescription>Preencha os dados para criar um novo agendamento</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Paciente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <User className="h-4 w-4 mr-2" />
              Dados do Paciente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paciente">Nome do Paciente *</Label>
                <Input
                  id="paciente"
                  value={formData.paciente}
                  onChange={(e) => handleInputChange("paciente", e.target.value)}
                  placeholder="Digite o nome completo"
                  className={errors.paciente ? "border-red-500" : ""}
                />
                {errors.paciente && <p className="text-sm text-red-500 mt-1">{errors.paciente}</p>}
              </div>

              <div>
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", formatPhoneNumber(e.target.value))}
                  placeholder="(11) 99999-9999"
                  className={errors.telefone ? "border-red-500" : ""}
                />
                {errors.telefone && <p className="text-sm text-red-500 mt-1">{errors.telefone}</p>}
              </div>
            </div>
          </div>

          {/* Agendamento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Data e Horário
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => handleInputChange("data", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className={errors.data ? "border-red-500" : ""}
                />
                {errors.data && <p className="text-sm text-red-500 mt-1">{errors.data}</p>}
              </div>

              <div>
                <Label htmlFor="horaInicio">Hora de Início *</Label>
                <Input
                  id="horaInicio"
                  type="time"
                  value={formData.horaInicio}
                  onChange={(e) => handleInputChange("horaInicio", e.target.value)}
                  className={errors.horaInicio ? "border-red-500" : ""}
                />
                {errors.horaInicio && <p className="text-sm text-red-500 mt-1">{errors.horaInicio}</p>}
              </div>

              <div>
                <Label htmlFor="horaFim">Hora de Fim *</Label>
                <Input
                  id="horaFim"
                  type="time"
                  value={formData.horaFim}
                  onChange={(e) => handleInputChange("horaFim", e.target.value)}
                  className={errors.horaFim ? "border-red-500" : ""}
                />
                {errors.horaFim && <p className="text-sm text-red-500 mt-1">{errors.horaFim}</p>}
              </div>
            </div>
          </div>

          {/* Profissional e Sala */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Profissional e Local
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="profissional">Profissional *</Label>
                <Select
                  value={formData.profissional}
                  onValueChange={(value) => handleInputChange("profissional", value)}
                >
                  <SelectTrigger className={errors.profissional ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione o profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {profissionais.map((prof) => (
                      <SelectItem key={prof.nome} value={prof.nome}>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: prof.cor }} />
                          <span>{prof.nome}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.profissional && <p className="text-sm text-red-500 mt-1">{errors.profissional}</p>}
              </div>

              <div>
                <Label htmlFor="sala">Sala/Unidade *</Label>
                <Select value={formData.sala} onValueChange={(value) => handleInputChange("sala", value)}>
                  <SelectTrigger className={errors.sala ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione a sala" />
                  </SelectTrigger>
                  <SelectContent>
                    {salas.map((sala) => (
                      <SelectItem key={sala.nome} value={sala.nome}>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sala.cor }} />
                          <span>{sala.nome}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sala && <p className="text-sm text-red-500 mt-1">{errors.sala}</p>}
              </div>
            </div>
          </div>

          {/* Procedimentos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Procedimentos *</h3>

            <div>
              <Label>Selecionar Procedimentos</Label>
              <Select onValueChange={addProcedimento}>
                <SelectTrigger className={errors.procedimentos ? "border-red-500" : ""}>
                  <SelectValue placeholder="Adicionar procedimento" />
                </SelectTrigger>
                <SelectContent>
                  {procedimentosDisponiveis
                    .filter((proc) => !selectedProcedimentos.includes(proc))
                    .map((proc) => (
                      <SelectItem key={proc} value={proc}>
                        {proc}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.procedimentos && <p className="text-sm text-red-500 mt-1">{errors.procedimentos}</p>}
            </div>

            {selectedProcedimentos.length > 0 && (
              <div>
                <Label>Procedimentos Selecionados</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProcedimentos.map((proc) => (
                    <Badge key={proc} variant="secondary" className="flex items-center space-x-1">
                      <span>{proc}</span>
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeProcedimento(proc)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Observações adicionais sobre o agendamento..."
              rows={3}
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Agendamento</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
