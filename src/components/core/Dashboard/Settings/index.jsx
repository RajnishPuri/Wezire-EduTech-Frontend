import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="w-full px-4 py-8 lg:px-8">
      <h1 className="mb-10 text-2xl font-semibold text-richblack-5 sm:text-3xl">
        Edit Profile
      </h1>

      <div className="flex flex-col gap-8">
        <ChangeProfilePicture />
        <EditProfile />
        <UpdatePassword />
        <DeleteAccount />
      </div>
    </div>
  )
}
