import { Users, MessageCircle, Calendar } from 'lucide-react'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'

const points = [
  { icon: MessageCircle, text: "Real-time messaging with teachers and other parents" },
  { icon: Calendar, text: "School calendar integration and event reminders" },
  { icon: Users, text: "Create and join parent groups based on interests or classes" },
]

export function List() {
  return (
    <>
      {points.map((item, index) => (
        <li key={index} className="flex items-center text-gray-700 dark:text-gray-200">
          <item.icon className="h-6 w-6 mr-2 text-blue-500" />
          <span>{item.text}</span>
        </li>
      ))}
    </>
  )
}

export function CircleList({ circle, setSelectedCircle }) {
  return (
    <div
      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${selectedCircle?.id === circle.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
        }`}
      onClick={() => setSelectedCircle(circle)}
    >
      <Avatar>
        <AvatarFallback>{circle.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-medium">{circle.name}</p>
      </div>
      {circle.unread > 0 && (
        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
          {circle.unread}
        </span>
      )}
    </div>
  )
}
