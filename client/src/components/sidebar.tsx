import { Sidebar, SidebarHeader, SidebarContent } from "./ui/sidebar"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { circle } from "@/pages/dashboard"
import { Button } from "./ui/button"
import { useDarkMode } from '@/context/darkMode'
import { Input } from "./ui/input"
import { Sun, Moon, Search } from "lucide-react"

interface Circleprops {
  circles: circle[] | null;
  selectedCircle: circle | null;
  setSelectedCircle: React.Dispatch<React.SetStateAction<circle | null>>;
}

export default function Circles({ circles, selectedCircle, setSelectedCircle }: Circleprops) {

  const { darkMode, toggleDarkMode } = useDarkMode()
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ParentConnect</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search circles"
              className="pl-8"
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1">
          <div className="px-4 space-y-2">
            {circles && circles.map(circle => (
              <CircleItem key={circle.id} circle={circle} selectedCircle={selectedCircle} setSelectedCircle={setSelectedCircle} />
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}

interface circleItems {
  circle: circle;
  selectedCircle: circle | null;
  setSelectedCircle: React.Dispatch<React.SetStateAction<circle | null>>;
}

function CircleItem({ circle, selectedCircle, setSelectedCircle }: circleItems) {

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
