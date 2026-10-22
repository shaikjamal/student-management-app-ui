export const students = [
  { firstName: 'Asha', lastName: 'Perera', email: 'asha@example.com', grade: '10-A', id: '0826fce2-c321-4c78-8695-e3bea5686a33' },
  { firstName: 'Nimal', lastName: 'Silva', email: 'nimal@example.com', grade: '10-A', id: '0826fce2-c321-4c78-8695-e3bea5686a34' },
  { firstName: 'Anika', lastName: 'Fernando', email: 'anika@example.com', grade: '9-B', id: '0826fce2-c321-4c78-8695-e3bea5686a35' },
  { firstName: 'Kavindu', lastName: 'Jayasinghe', email: 'kavindu@example.com', grade: '9-B', id: '0826fce2-c321-4c78-8695-e3bea5686a36' },
  { firstName: 'Maya', lastName: 'Wickramasinghe', email: 'maya@example.com', grade: '11-A', id: '0826fce2-c321-4c78-8695-e3bea5686a37' },
  { firstName: 'Ravi', lastName: 'Perera', email: 'ravi@example.com', grade: '11-A', id: '0826fce2-c321-4c78-8695-e3bea5686a38' },
  { firstName: 'Dinithi', lastName: 'Gunawardena', email: 'dinithi@example.com', grade: '10-A', id: '0826fce2-c321-4c78-8695-e3bea5686a39' },
  { firstName: 'Oshan', lastName: 'Abeysekara', email: 'oshan@example.com', grade: '9-B', id: '0826fce2-c321-4c78-8695-e3bea5686a40' },
]

export const formatDate = (value) => {
  if (!value || Number.isNaN(new Date(value).getTime())) return '—'
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Colombo',
  }).format(new Date(value))
}
