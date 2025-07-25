export interface Professional {
  id: string
  name: string
  color: string
}

export interface Room {
  id: string
  name: string
  color: string
}

export interface Appointment {
  id: string
  title: string
  patient: string
  professional: Professional
  room: Room
  startTime: string
  endTime: string
  procedure: string
  date: string
}

export interface TimeSlot {
  time: string
  hour: number
  minute: number
}
