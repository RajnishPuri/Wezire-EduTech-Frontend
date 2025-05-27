import { useState } from "react"
import { VscSettingsGear } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-richblack-700 bg-richblack-800 md:grid">
        <div className="spinner"></div>
      </div>
    )
  }

  const filteredLinks = sidebarLinks.filter(
    (link) => !link.type || user?.accountType === link.type
  )

  return (
    <>
      <div className="hidden md:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r border-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {filteredLinks.map((link) => (
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
          ))}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSettingsGear className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-richblack-800 border-t border-richblack-700 px-3 py-3 md:hidden">
        {[...filteredLinks, { name: "Settings", path: "/dashboard/settings", icon: "VscSettingsGear" }].map((link, idx) => (
          <SidebarLink key={idx} link={link} iconName={link.icon} iconOnly />
        ))}
      </div>

      {confirmationModal && (
        <ConfirmationModal
          modalData={confirmationModal}
          setConfirmationModal={setConfirmationModal}
        />
      )}
    </>
  )
}
