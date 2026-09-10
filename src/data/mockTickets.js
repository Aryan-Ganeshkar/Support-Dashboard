// Fallback dataset — only used if the live API request fails.
// Shape matches the normalized ticket structure produced by src/api/ticketsApi.js
export const FALLBACK_TICKETS = [
  {
    id: 1,
    ticketNumber: 'TCK-1001',
    customerName: 'Meera Kulkarni',
    customerEmail: 'meera.kulkarni@example.com',
    customerPhone: '+91 98765 43210',
    subject: 'Unable to reset my account password',
    description:
      'I have tried the "forgot password" link three times but the reset email never arrives. Checked spam folder as well, nothing there.',
    priority: 'High',
    status: 'Open',
    createdAt: '2025-08-02T09:14:00.000Z',
    messages: [
      {
        id: 1,
        author: 'customer',
        name: 'Meera Kulkarni',
        text: 'I have tried the "forgot password" link three times but the reset email never arrives.',
        time: '2025-08-02T09:14:00.000Z',
      },
      {
        id: 2,
        author: 'support',
        name: 'Support Team',
        text: 'Thanks for flagging this, Meera. Could you confirm the email address on your account?',
        time: '2025-08-02T09:40:00.000Z',
      },
    ],
  },
  {
    id: 2,
    ticketNumber: 'TCK-1002',
    customerName: 'Rahul Deshmukh',
    customerEmail: 'rahul.deshmukh@example.com',
    customerPhone: '+91 91234 56789',
    subject: 'Invoice amount does not match plan pricing',
    description:
      'My last invoice charged me for the annual plan but I am on the monthly plan. Please correct this and refund the difference.',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2025-08-04T13:02:00.000Z',
    messages: [
      {
        id: 1,
        author: 'customer',
        name: 'Rahul Deshmukh',
        text: 'My last invoice charged me for the annual plan but I am on the monthly plan.',
        time: '2025-08-04T13:02:00.000Z',
      },
    ],
  },
  {
    id: 3,
    ticketNumber: 'TCK-1003',
    customerName: 'Ananya Iyer',
    customerEmail: 'ananya.iyer@example.com',
    customerPhone: '+91 90000 11122',
    subject: 'Feature request: dark mode for mobile app',
    description: 'Would love a dark mode option in the mobile app, the white screen is harsh at night.',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2025-07-28T18:47:00.000Z',
    messages: [
      {
        id: 1,
        author: 'customer',
        name: 'Ananya Iyer',
        text: 'Would love a dark mode option in the mobile app.',
        time: '2025-07-28T18:47:00.000Z',
      },
      {
        id: 2,
        author: 'support',
        name: 'Support Team',
        text: "Thanks for the suggestion! We've logged this with our product team.",
        time: '2025-07-29T10:05:00.000Z',
      },
    ],
  },
]
