"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Calendar, dateFnsLocalizer, type View, Views } from "react-big-calendar"
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
} from "date-fns"
import { ptBR } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { mockAppointments, professionals, rooms } from "../data/mockData"
import type { Appointment } from "../types/calendar"
import { ChevronLeft, ChevronRight, Users, MapPin } from "lucide-react"
import AppointmentModal from "./AppointmentModal"
import { NewAppointmentModal } from "@/components/new-appointment-modal"
import "./CalendarScheduler.css"

const locales = {
  "pt-BR": ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarEvent extends Appointment {
  start: Date
  end: Date
}

const CalendarScheduler: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState<View>(Views.WEEK)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [selectedProfessionals, setSelectedProfessionals] = useState<string[]>(professionals.map((p) => p.id))
  const [selectedRooms, setSelectedRooms] = useState<string[]>(rooms.map((r) => r.id))
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)

  const events: CalendarEvent[] = useMemo(() => {
    return mockAppointments
      .filter(
        (appointment) =>
          selectedProfessionals.includes(appointment.professional.id) && selectedRooms.includes(appointment.room.id),
      )
      .map((appointment) => {
        const [year, month, day] = appointment.date.split("-").map(Number)
        const [startHour, startMinute] = appointment.startTime.split(":").map(Number)
        const [endHour, endMinute] = appointment.endTime.split(":").map(Number)

        const start = new Date(year, month - 1, day, startHour, startMinute)
        const end = new Date(year, month - 1, day, endHour, endMinute)

        return {
          ...appointment,
          start,
          end,
        }
      })
  }, [selectedProfessionals, selectedRooms])

  const EventComponent = ({ event }: { event: CalendarEvent }) => (
    <div
      className="custom-event"
      style={{
        backgroundColor: event.room.color,
        borderLeft: `4px solid ${event.professional.color}`,
        height: "100%",
        padding: "4px 8px",
        fontSize: "12px",
        fontWeight: "500",
        color: "#000",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "2px",
      }}
    >
      <div className="event-title">{event.title}</div>
      <div className="event-details" style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>
        {event.professional.name.split(" ")[0]}
      </div>
      <div className="event-details" style={{ fontSize: "10px", color: "#666" }}>
        {event.room.name}
      </div>
      <div className="event-details" style={{ fontSize: "10px", color: "#666" }}>
        {event.procedure}
      </div>
    </div>
  )

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedAppointment(event)
  }

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate)
  }

  const handleViewChange = (view: View) => {
    setCurrentView(view)
  }

  const getNavigationUnit = () => {
    switch (currentView) {
      case Views.MONTH:
        return "month"
      case Views.WEEK:
        return "week"
      case Views.DAY:
        return "day"
      default:
        return "week"
    }
  }

  const getViewTitle = () => {
    switch (currentView) {
      case Views.MONTH:
        return (
          format(currentDate, "MMMM yyyy", { locale: ptBR }).charAt(0).toUpperCase() +
          format(currentDate, "MMMM yyyy", { locale: ptBR }).slice(1)
        )
      case Views.WEEK:
        const startWeek = startOfWeek(currentDate, { locale: ptBR })
        const endWeek = endOfWeek(currentDate, { locale: ptBR })
        return `${format(startWeek, "dd")} - ${format(endWeek, "dd 'de' MMMM yyyy", { locale: ptBR })}`
      case Views.DAY:
        return format(currentDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })
      default:
        return format(currentDate, "MMMM yyyy", { locale: ptBR })
    }
  }

  const toggleProfessional = (professionalId: string) => {
    setSelectedProfessionals((prev) =>
      prev.includes(professionalId) ? prev.filter((id) => id !== professionalId) : [...prev, professionalId],
    )
  }

  const toggleRoom = (roomId: string) => {
    setSelectedRooms((prev) => (prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]))
  }

  const handleNewAppointment = (appointment: any) => {
    // Aqui você pode adicionar a lógica para salvar o novo agendamento
    console.log('Novo agendamento:', appointment)
    // Por enquanto, apenas fechamos o modal
    setShowNewAppointmentModal(false)
  }

  const generateMiniCalendar = () => {
    const today = new Date()
    const currentMonth = new Date(currentDate)
    const startOfMonthDate = startOfMonth(currentMonth)
    const endOfMonthDate = endOfMonth(currentMonth)
    const startCalendar = startOfWeek(startOfMonthDate, { locale: ptBR })
    const endCalendar = endOfWeek(endOfMonthDate, { locale: ptBR })

    const days = []
    let day = new Date(startCalendar)

    while (day <= endCalendar) {
      days.push(new Date(day))
      day = addDays(day, 1)
    }

    return (
      <div className="mini-calendar">
        <div className="mini-calendar-header">
          <button onClick={() => handleNavigate(subMonths(currentMonth, 1))} className="nav-button">
            <ChevronLeft size={16} />
          </button>
          <h1 className="current-period">{getViewTitle()}</h1>
          <button onClick={() => handleNavigate(addMonths(currentMonth, 1))} className="nav-button">
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="mini-calendar-grid">
          <div className="weekdays">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day) => (
              <div key={day} className="weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="days">
            {days.map((day) => (
              <div
                key={format(day, "yyyy-MM-dd")}
                className={`day ${day.getMonth() !== currentMonth.getMonth() ? "other-month" : ""} ${format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd") ? "today" : ""} ${format(day, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd") ? "selected" : ""}`}
                onClick={() => handleNavigate(day)}
              >
                {day.getDate()}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="calendar-container">
      <div className="sidebar">
        {generateMiniCalendar()}

        <div className="filters">
          <div className="filter-section">
            <div className="filter-header">
              <Users size={16} />
              <span>Profissional</span>
            </div>
            {professionals.map((professional) => (
              <label key={professional.id} className="filter-item">
                <input
                  type="checkbox"
                  checked={selectedProfessionals.includes(professional.id)}
                  onChange={() => toggleProfessional(professional.id)}
                />
                <div className="color-indicator" style={{ backgroundColor: professional.color }} />
                <span>{professional.name}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <div className="filter-header">
              <MapPin size={16} />
              <span>Sala</span>
            </div>
            {rooms.map((room) => (
              <label key={room.id} className="filter-item">
                <input type="checkbox" checked={selectedRooms.includes(room.id)} onChange={() => toggleRoom(room.id)} />
                <div className="color-indicator" style={{ backgroundColor: room.color }} />
                <span>{room.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="calendar-main">
        <div className="calendar-header">
          <div className="header-controls">
            <button onClick={() => handleNavigate(subWeeks(currentDate, 1))} className="nav-button">
              <ChevronLeft size={20} />
            </button>
            <h1 className="current-week">
              {format(startOfWeek(currentDate), "dd")} -{" "}
              {format(endOfWeek(currentDate), "dd 'de' MMMM yyyy", { locale: ptBR })}
            </h1>
            <button onClick={() => handleNavigate(addWeeks(currentDate, 1))} className="nav-button">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="view-controls">
            <button 
              className="today-button" 
              onClick={() => setShowNewAppointmentModal(true)}
              style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}
            >
              + Novo Agendamento
            </button>
          </div>
        </div>

        <div className="calendar-wrapper">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(100vh - 120px)" }}
            view={Views.WEEK}
            views={[Views.WEEK]}
            date={currentDate}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            onSelectEvent={handleSelectEvent}
            components={{
              event: EventComponent,
            }}
            step={15}
            timeslots={1}
            min={new Date(2025, 0, 1, 7, 0, 0)}
            max={new Date(2025, 0, 1, 19, 0, 0)}
            formats={{
              timeGutterFormat: "HH:mm",
              dayHeaderFormat: "dd ddd",
              weekdayFormat: "ddd",
            }}
            messages={{
              week: "Semana",
              day: "Dia",
              month: "Mês",
              previous: "Anterior",
              next: "Próximo",
              today: "Hoje",
              agenda: "Agenda",
              date: "Data",
              time: "Hora",
              event: "Evento",
              noEventsInRange: "Não há eventos neste período",
            }}
          />
        </div>
      </div>

      {selectedAppointment && (
        <AppointmentModal appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
      )}

      <NewAppointmentModal
        isOpen={showNewAppointmentModal}
        onClose={() => setShowNewAppointmentModal(false)}
        onSave={handleNewAppointment}
      />
    </div>
  )
}

export default CalendarScheduler
