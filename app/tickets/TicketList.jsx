import Link from 'next/link'
import React from 'react'
async function getTickets(){
    const res = await fetch('http://localhost:4000/tickets', {
        next:{
            revalidate: 0  //data will never be cached
        }
    })

    return res.json()
}

// We use async word for the server components
export default async function TicketList() {
    // We can use await because we have async
    const tickets = await getTickets()

  return (
    <>
    {tickets.map((ticket)=>(
        <div key={ticket.id} className="card my-5">
            <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            {/* To get first 200 characters we use slice(0,200) */}
            <p>{ticket.body.slice(0,200)}...</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
            </div>   
            </Link>

        </div>
    ))}

    {tickets.length ===0 && (
        <p className='text-center'>There are no open tikects, yay!</p>
    )}
    </>
  )
}
