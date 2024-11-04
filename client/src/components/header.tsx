import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useDarkMode } from "@/context/darkMode"

export default function Header() {

  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="py-4 px-6 md:px-12 flex justify-between items-center border-b">
      <h1 className="text-2xl font-bold">ParentConnect</h1>
      <nav className="hidden md:flex space-x-4">
        <a href="#features" className="hover:underline">Features</a>
        <a href="#testimonials" className="hover:underline">Testimonials</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Contact</a>
      </nav>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
        className={`rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        <span className="sr-only">Toggle dark mode</span>
      </Button>
    </header>
  )
}
