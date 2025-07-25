"use client"

import type React from "react"
import type { Appointment } from "../types/calendar"
import { X, Calendar, Clock, User, MapPin, FileText } from "lucide-react"
import { format } from "date-fns"

interface AppointmentModalProps {
  appointment: Appointment
  onClose: () => void
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ appointment, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalhes do Agendamento</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="appointment-info">
            <div className="info-item">
              <User className="info-icon" size={20} />
              <div>
                <label>Paciente</label>
                <span>{appointment.patient}</span>
              </div>
            </div>

            <div className="info-item">
              <User className="info-icon" size={20} />
              <div>
                <label>Profissional</label>
                <span>{appointment.professional.name}</span>
              </div>
            </div>

            <div className="info-item">
              <MapPin className="info-icon" size={20} />
              <div>
                <label>Sala</label>
                <span>{appointment.room.name}</span>
              </div>
            </div>

            <div className="info-item">
              <Calendar className="info-icon" size={20} />
              <div>
                <label>Data</label>
                <span>{format(new Date(appointment.date), "dd/MM/yyyy")}</span>
              </div>
            </div>

            <div className="info-item">
              <Clock className="info-icon" size={20} />
              <div>
                <label>Horário</label>
                <span>
                  {appointment.startTime} - {appointment.endTime}
                </span>
              </div>
            </div>

            <div className="info-item">
              <FileText className="info-icon" size={20} />
              <div>
                <label>Procedimento</label>
                <span>{appointment.procedure}</span>
              </div>
            </div>
          </div>

          <div className="color-indicators">
            <div className="color-item">
              <div className="color-square" style={{ backgroundColor: appointment.room.color }} />
              <span>Cor da Sala</span>
            </div>
            <div className="color-item">
              <div className="color-square" style={{ backgroundColor: appointment.professional.color }} />
              <span>Cor do Profissional</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="close-modal-button">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppointmentModal
