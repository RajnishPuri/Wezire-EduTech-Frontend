import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div className="my-10 flex flex-col gap-5 rounded-md border border-pink-700 bg-pink-900 p-6 sm:flex-row sm:items-start sm:gap-x-5 sm:p-8 sm:px-12">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-700">
        <FiTrash2 className="text-3xl text-pink-200" />
      </div>
      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>
        <div className="text-pink-25">
          <p className="mb-1">Would you like to delete your account?</p>
          <p className="text-sm">
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all content associated with it.
          </p>
        </div>
        <button
          type="button"
          className="w-fit cursor-pointer italic text-sm text-pink-300"
          onClick={handleDeleteAccount}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  )
}
