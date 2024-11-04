
import { useState } from 'react'
import { Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Chat, Circles } from '@/components'
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


export interface circle {
  id: string;
  name: string;
  unread: number;
}

export interface message {
  id: string;
  user: string;
  content: string;
  upvotes: number;
  downvotes: number;
  replies?: Array<message>;
}

export default function Dashboard() {


  const [selectedCircle, setSelectedCircle] = useState<circle | null>(null);
  const [expandedMessages, setExpandedMessages] = useState(new Set())
  const [circles, setCircles] = useState<Array<circle> | null>([
    { id: "1", name: "5th Grade Parents", unread: 3 },
    { id: "2", name: "School Events", unread: 0 },
    { id: "3", name: "PTA Meeting", unread: 1 },
    { id: "4", name: "Sports Team", unread: 5 },
  ])
  const [messages, setMessages] = useState<message[] | null>([
    {
      id: "1", user: "Alice", content: "Has anyone received the homework assignment for tomorrow?", upvotes: 5, downvotes: 1, replies: [
        { id: "2", user: "Bob", content: "Yes, it's on page 42 of the textbook.", upvotes: 2, downvotes: 0 },
        { id: "3", user: "Charlie", content: "Thanks for the info!", upvotes: 1, downvotes: 0 },
      ]
    },
    {
      id: "4", user: "David", content: "Don't forget about the bake sale this Friday!", upvotes: 8, downvotes: 0, replies: [
        { id: "5", user: "Eve", content: "What time does it start?", upvotes: 1, downvotes: 0 },
        { id: "6", user: "Frank", content: "I can help set up the tables.", upvotes: 3, downvotes: 0 },
      ]
    },
    { id: "7", user: "Grace", content: "Any volunteers for the field trip next week?", upvotes: 3, downvotes: 0, replies: [] },
  ])

  const toggleMessageExpansion = (messageId: string) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }
      return newSet
    })
  }


  const handleVote = (messageId: string, voteType: string, replyId = null) => {
    setMessages(prevMessages => {
      return prevMessages.map(message => {
        if (replyId && message.replies) {
          if (message.id === messageId) {
            return {
              ...message,
              replies: message.replies.map(reply =>
                reply.id === replyId
                  ? { ...reply, [voteType === 'up' ? 'upvotes' : 'downvotes']: (reply[voteType === 'up' ? 'upvotes' : 'downvotes'] || 0) + 1 }
                  : reply
              )
            }
          }
          return message
        } else if (message.id === messageId) {
          return { ...message, [voteType === 'up' ? 'upvotes' : 'downvotes']: (message[voteType === 'up' ? 'upvotes' : 'downvotes'] || 0) + 1 }
        }
        return message
      })
    })
  }

  const handleReply = (messageId: string, replyToId = null) => {
    // In a real application, you would open a reply input field here
    console.log(`Replying to message ${messageId}${replyToId ? `, reply ${replyToId}` : ''}`)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <Circles
          circles={circles}
          selectedCircle={selectedCircle}
          setSelectedCircle={setSelectedCircle}
        />
        <div className="flex-1 flex flex-col">
          <SidebarTrigger className="">
            <Button variant="ghost" size="icon">
              <Users className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
          {selectedCircle ? (
            <Chat
              selectedCircle={selectedCircle}
              messages={messages}
              expandedMessages={expandedMessages}
              toggleMessageExpansion={toggleMessageExpansion}
              handleVote={handleVote}
              handleReply={handleReply}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select a circle to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  )
}
