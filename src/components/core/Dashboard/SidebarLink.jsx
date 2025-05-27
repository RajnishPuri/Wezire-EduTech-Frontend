import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"
import { resetCourseState } from "../../../store/slices/courseSlice"

export default function SidebarLink({ link, iconName, iconOnly = false }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`relative flex flex-col items-center justify-center px-4 py-1.5 md:flex-row md:items-start md:justify-start md:px-8 md:py-2 text-sm font-medium ${matchRoute(link.path)
        ? "text-yellow-50 md:bg-yellow-800"
        : "text-richblack-300"
        } transition-all duration-200`}
    >
      {/* Active bar for desktop */}
      {!iconOnly && (
        <span
          className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"
            }`}
        ></span>
      )}

      <div className="flex flex-col items-center gap-x-2 md:flex-row md:items-center">
        <Icon className="text-2xl" />
        {!iconOnly && <span>{link.name}</span>}
      </div>
    </NavLink>
  )
}
