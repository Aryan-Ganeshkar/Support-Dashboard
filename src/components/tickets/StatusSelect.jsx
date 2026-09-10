import { toast } from 'react-toastify'
import { useTicketStore } from '../../store/ticketStore'

export default function StatusSelect({ ticket, className = '' }) {
  const updateTicketStatus = useTicketStore((s) => s.updateTicketStatus)
  const updatingTicketId = useTicketStore((s) => s.updatingTicketId)
  const isUpdating = updatingTicketId === ticket.id

  const handleChange = async (e) => {
    const nextStatus = e.target.value
    if (nextStatus === ticket.status) return

    const result = await updateTicketStatus(ticket.id, nextStatus)
    if (result.ok) {
      toast.success(`Ticket #${ticket.ticketNumber.replace('TCK-', '')} status updated to ${nextStatus}`)
    } else {
      toast.error(result.error || 'Could not update ticket status.')
    }
  }

  return (
    <select
      value={ticket.status}
      disabled={isUpdating}
      onClick={(e) => e.stopPropagation()}
      onChange={handleChange}
      className={`rounded-md border border-line bg-paper px-2 py-1.5 text-xs font-medium text-ink disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-brand/20 ${className}`}
    >
      <option value="Open">Open</option>
      <option value="In Progress">In Progress</option>
      <option value="Resolved">Resolved</option>
    </select>
  )
}
