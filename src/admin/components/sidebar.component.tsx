import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"

import { auth } from "../../firebase/firebase"

import {
  Home,
  LayoutGrid,
  Briefcase,
  Award,
  LogOut,
  ChevronRight
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >
}

const navItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: Home
  },
  {
    to: "/admin/projects",
    label: "Projects",
    icon: LayoutGrid
  },
  {
    to: "/admin/work",
    label: "Work Experience",
    icon: Briefcase
  },
  {
    to: "/admin/certificates",
    label: "Certificates",
    icon: Award
  },
]

const SidebarComponent = ({
  isOpen,
  setIsOpen
}: SidebarProps) => {

  const navigate = useNavigate()

  const handleLogout = async () => {

    try {

      await signOut(auth)

      navigate("/")

    } catch (error) {

      console.error(error)

    }
  }

  return (
    <>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white z-40
          flex flex-col transition-all duration-300 ease-in-out
          border-r border-gray-100 shadow-sm
          ${isOpen ? "w-56" : "w-16"}
        `}
      >

        {/* TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            flex items-center justify-center
            h-16 w-full
            border-b border-gray-100
            text-gray-400 hover:text-gray-700
            transition
          "
        >
          <ChevronRight
            className={`
              w-5 h-5 transition-transform duration-300
              ${isOpen ? "rotate-180" : "rotate-0"}
            `}
          />
        </button>

        {/* NAV */}
        <nav className="flex-1 flex flex-col gap-1 px-2 py-4">

          {navItems.map(({
            to,
            label,
            icon: Icon
          }) => (

            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className="
                flex items-center gap-3
                px-3 py-2.5
                rounded-xl
                text-sm text-gray-500
                hover:bg-gray-50
                hover:text-gray-900
                transition group
              "
            >

              <Icon className="w-5 h-5 shrink-0" />

              <span
                className={`
                  whitespace-nowrap overflow-hidden
                  transition-all duration-300
                  ${isOpen
                    ? "opacity-100 max-w-xs"
                    : "opacity-0 max-w-0"
                  }
                `}
              >
                {label}
              </span>

            </Link>

          ))}

        </nav>

        {/* LOGOUT */}
        <div className="px-2 py-4 border-t border-gray-100">

          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3
              px-3 py-2.5
              rounded-xl
              text-sm text-red-400
              hover:bg-red-50
              hover:text-red-600
              transition
            "
          >

            <LogOut className="w-5 h-5 shrink-0" />

            <span
              className={`
                whitespace-nowrap overflow-hidden
                transition-all duration-300
                ${isOpen
                  ? "opacity-100 max-w-xs"
                  : "opacity-0 max-w-0"
                }
              `}
            >
              Logout
            </span>

          </button>

        </div>

      </aside>
    </>
  )
}

export default SidebarComponent