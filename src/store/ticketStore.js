import { create } from 'zustand'
import { fetchTickets, updateTicketStatusApi } from '../api/ticketsApi'

export const useTicketStore = create((set, get) => ({
  // data
  tickets: [],
  loading: false,
  error: null,

  // ui state
  search: '',
  statusFilter: 'All',
  priorityFilter: 'All',
  selectedTicketId: null,
  updatingTicketId: null,

  fetchAllTickets: async () => {
    set({ loading: true, error: null })
    try {
      const tickets = await fetchTickets()
      set({ tickets, loading: false })
    } catch (err) {
      set({ error: err.message || 'Something went wrong while loading tickets.', loading: false })
    }
  },

  setSearch: (search) => set({ search }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
  clearFilters: () => set({ search: '', statusFilter: 'All', priorityFilter: 'All' }),

  openTicket: (id) => set({ selectedTicketId: id }),
  closeTicket: () => set({ selectedTicketId: null }),

  updateTicketStatus: async (ticketId, status) => {
    set({ updatingTicketId: ticketId })
    try {
      await updateTicketStatusApi(ticketId, status)
      set((state) => ({
        tickets: state.tickets.map((t) => (t.id === ticketId ? { ...t, status } : t)),
        updatingTicketId: null,
      }))
      return { ok: true }
    } catch (err) {
      set({ updatingTicketId: null })
      return { ok: false, error: err.message || 'Could not update ticket status.' }
    }
  },

  // derived getters
  getFilteredTickets: () => {
    const { tickets, search, statusFilter, priorityFilter } = get()
    const q = search.trim().toLowerCase()

    return tickets.filter((t) => {
      const matchesSearch =
        q === '' ||
        t.customerName.toLowerCase().includes(q) ||
        t.customerEmail.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.ticketNumber.toLowerCase().includes(q)

      const matchesStatus = statusFilter === 'All' || t.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  },

  getStats: () => {
    const { tickets } = get()
    return {
      total: tickets.length,
      open: tickets.filter((t) => t.status === 'Open').length,
      inProgress: tickets.filter((t) => t.status === 'In Progress').length,
      resolved: tickets.filter((t) => t.status === 'Resolved').length,
    }
  },
}))
