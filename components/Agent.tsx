import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'
enum CallStatus{
    INACTIVE='INACTIVE',
    CONNECTING='CONNECTING',
    ACTIVE='ACTIVE',
    FINISHED='FINISHED'
}
const Agent = ({userName}:AgentProps) => {
    const callStatus=CallStatus.ACTIVE;
    const isSpeaking = true;
    const messages=[
        'Whats your name?',
        'What is your experience with React?',
        'What is your experience with Node.js?',
        'What is your experience with Next.js?',
        'What is your experience with TypeScript?',
        'What is your experience with JavaScript?',
        'What is your experience with HTML?',
        'What is your experience with CSS?',
        'What is your experience with Tailwind CSS?',
        'What is your experience with Redux?',
        'What is your experience with GraphQL?',
        'What is your experience with REST APIs?',
        'What is your experience with SQL?',
        'What is your experience with NoSQL?',
        'What is your experience with MongoDB?',
        'What is your experience with PostgreSQL?',
    ]
    const lastMessage=messages[messages.length-1];
  return (
    <>
     <div className="call-view">
    <div className="card-interviewer">
        <div className="avatar">
            <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className="object-cover" />
            {isSpeaking && <span className="animate-speak"></span>}

        </div>
        <h3>AI Interviewer</h3>

    </div>
    <div className="card-border">
        <div className="card-content">
            <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className="rounded-full object-cover size-[120px]"/>
            <h3>{userName}</h3>

        </div>

    </div>

 </div>
 {messages.length>0 && (
    <div className="transcript-border">
        <div className="transcript">
            <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')}>

            </p>

        </div>

    </div>
 )}
 <div className="w-full flex justify-center">
    {callStatus!=='ACTIVE'?(
        <button className="relative btn-call">
            <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus!=='CONNECTING' && 'hidden')}
                
         />
            <span>
            {callStatus==='INACTIVE' || callStatus==='FINISHED'?'Call':'. . .'}

            </span>
        </button>
    ):(
        <button className="btn-disconnect">
            End

        </button>
    )}

 </div>
 
    
    
    </>


  )
}

export default Agent
