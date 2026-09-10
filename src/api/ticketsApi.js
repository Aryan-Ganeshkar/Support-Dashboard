// API/service layer — kept separate from UI and Zustand store.
// Source data comes from JSONPlaceholder (a free public REST API). It has no
// concept of "support tickets", so we normalize/map its users + posts into
// the ticket structure this dashboard needs.

import { FALLBACK_TICKETS } from '../data/mockTickets'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const PRIORITIES = ['Low', 'Medium', 'High']
const STATUSES = ['Open', 'In Progress', 'Resolved']

// Simple deterministic pseudo-random generator so the mocked ticket
// metadata (priority/status/date) stays stable across reloads for a given id.
function seededValue(seed, max) {
  const x = Math.sin(seed * 999) * 10000
  return Math.floor((x - Math.floor(x)) * max)
}

function buildConversation(post, user, priority, status) {
  const base = new Date(post.createdAt)
  const messages = [
    {
      id: 1,
      author: 'customer',
      name: user.name,
      text: post.body.replace(/\n/g, ' ').slice(0, 220),
      time: base.toISOString(),
    },
  ]

  if (status !== 'Open') {
    const replyTime = new Date(base.getTime() + 1000 * 60 * 45)
    messages.push({
      id: 2,
      author: 'support',
      name: 'Support Team',
      text:
        priority === 'High'
          ? "Thanks for reporting this — we've escalated it and are actively looking into it."
          : "Thanks for reaching out. We're looking into this and will update you shortly.",
      time: replyTime.toISOString(),
    })
  }

  if (status === 'Resolved') {
    const closeTime = new Date(base.getTime() + 1000 * 60 * 60 * 5)
    messages.push({
      id: 3,
      author: 'support',
      name: 'Support Team',
      text: 'This issue has been resolved. Please let us know if it happens again.',
      time: closeTime.toISOString(),
    })
  }

  return messages
}

function normalize(users, posts) {
  const usersById = new Map(users.map((u) => [u.id, u]))
  const daySpanMs = 1000 * 60 * 60 * 24 * 30 // spread created dates across ~30 days
  const now = Date.now()

  return posts.map((post, index) => {
    const user = usersById.get(((post.userId - 1) % users.length) + 1) || users[0]
    const priority = PRIORITIES[seededValue(post.id, PRIORITIES.length)]
    const status = STATUSES[seededValue(post.id * 7, STATUSES.length)]
    const createdAt = new Date(now - seededValue(post.id * 13, 30) * (daySpanMs / 30)).toISOString()

    const postWithDate = { ...post, createdAt }

    return {
      id: post.id,
      ticketNumber: `TCK-${1000 + post.id}`,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone ? user.phone.split(' x')[0] : null,
      subject: post.title.charAt(0).toUpperCase() + post.title.slice(1),
      description: post.body.charAt(0).toUpperCase() + post.body.slice(1),
      priority,
      status,
      createdAt,
      messages: buildConversation(postWithDate, user, priority, status),
    }
  })
}

export async function fetchTickets({ limit = 40 } = {}) {
  try {
    const [usersRes, postsRes] = await Promise.all([fetch(USERS_URL), fetch(POSTS_URL)])

    if (!usersRes.ok || !postsRes.ok) {
      throw new Error('Support API returned an unexpected response.')
    }

    const users = await usersRes.json()
    const posts = await postsRes.json()

    if (!Array.isArray(users) || !Array.isArray(posts) || users.length === 0 || posts.length === 0) {
      throw new Error('Support API returned no data.')
    }

    return normalize(users, posts.slice(0, limit))
  } catch (err) {
    // Network/API failure — fall back to local mock data so the UI still works.
    console.warn('Falling back to local mock tickets:', err.message)
    return FALLBACK_TICKETS
  }
}

export async function updateTicketStatusApi(ticketId, status) {
  // JSONPlaceholder accepts writes but doesn't persist them — this call
  // simulates a real PATCH request/latency for the status-update flow.
  const res = await fetch(`${POSTS_URL}/${ticketId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })

  if (!res.ok) {
    throw new Error('Failed to update ticket status.')
  }

  return { ticketId, status }
}
