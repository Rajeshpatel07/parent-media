
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, Users, Send, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react'
import { circle, message } from "@/pages/dashboard"

interface chatArea {
  messages: Array<message> | null;
  selectedCircle: circle;
  expandedMessages: Set<unknown>;
  toggleMessageExpansion: (message: string) => void;
  handleVote: (messageId: string, voteType: string, replyId?: null) => void
  handleReply: (messageId: string, replyToId?: null) => void;
}

export default function Chat({ selectedCircle, messages, expandedMessages, toggleMessageExpansion, handleVote, handleReply }: chatArea) {

  return (
    <>
      <div className="h-16 border-b flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarFallback>{selectedCircle.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{selectedCircle.name}</h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        {messages && messages.map(message => (
          <Message
            key={message.id}
            message={message}
            expanded={expandedMessages.has(message.id)}
            onToggleExpand={() => toggleMessageExpansion(String(message.id))}
            onVote={handleVote}
            onReply={handleReply}
          />
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">

          {/* //NOTE: add create post functionality */}

          <Input placeholder="Type a message..." className="flex-1" />
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </>
  )
}

interface messageProps {
  message: message
  expanded: boolean;
  onToggleExpand: (message: string) => void;
  onVote: (messageId: string, voteType: string, replyId?: null) => void
  onReply: (messageId: string, replyToId?: null) => void;
}


function Message({ message, expanded, onToggleExpand, onVote, onReply }: messageProps) {

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start space-x-2">
          <Avatar>
            <AvatarFallback>{message.user[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">{message.user}</p>
            <p className="text-sm text-muted-foreground">{message.content}</p>
            <div className="flex items-center mt-2 space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleExpand(message.id)}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {message.replies?.length || 0} {message.replies?.length === 1 ? 'Reply' : 'Replies'}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onReply(message.id)}>
                Reply
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onVote(message.id, 'up')}>
                <ThumbsUp className="h-4 w-4 mr-1" />
                {message.upvotes || 0}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onVote(message.id, 'down')}>
                <ThumbsDown className="h-4 w-4 mr-1" />
                {message.downvotes || 0}
              </Button>
            </div>
          </div>
        </div>
        {expanded && message.replies && message.replies.length > 0 && (
          <div className="mt-4 space-y-4 pl-12 border-l-2 border-accent">
            {message.replies.map(reply => (
              <Message
                key={reply.id}
                message={reply}
                expanded={false}
                onToggleExpand={() => { }}
                onVote={onVote}
                onReply={() => onReply(message.id, reply.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
