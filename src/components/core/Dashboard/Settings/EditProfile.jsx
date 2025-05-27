import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 md:px-12 text-white">
          <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>

          {/* Row 1 - First & Last Name */}
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="flex flex-col gap-2 sm:w-1/2">
              <label htmlFor="firstName" className="lable-style">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-style border p-2 rounded"
                placeholder="Enter first name"
                defaultValue={user?.firstName}
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="-mt-1 text-xs text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:w-1/2">
              <label htmlFor="lastName" className="lable-style">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-style border p-2 rounded"
                placeholder="Enter last name"
                defaultValue={user?.lastName}
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className="-mt-1 text-xs text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          {/* Row 2 - DOB & Gender */}
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="flex flex-col gap-2 sm:w-1/2">
              <label htmlFor="dateOfBirth" className="lable-style">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                className="form-style border p-2 rounded"
                defaultValue={user?.additionalDetails?.dateOfBirth}
                {...register("dateOfBirth", {
                  required: "Please enter your Date of Birth.",
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-xs text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:w-1/2">
              <label htmlFor="gender" className="lable-style ">Gender</label>
              <select
                id="gender"
                className="form-style text-white border p-2 rounded border-white "
                defaultValue={user?.additionalDetails?.gender}
                {...register("gender", { required: true })}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele} className="text-black">{ele}</option>
                ))}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-xs text-yellow-100">
                  Please select your gender.
                </span>
              )}
            </div>
          </div>

          {/* Row 3 - Contact & About */}
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="flex flex-col gap-2 sm:w-1/2">
              <label htmlFor="contactNumber" className="lable-style">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter contact number"
                className="form-style border p-2 rounded"
                defaultValue={user?.additionalDetails?.contactNumber}
                {...register("contactNumber", {
                  required: "Please enter your Contact Number.",
                  minLength: { value: 10, message: "Invalid Contact Number" },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                })}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-xs text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 sm:w-1/2">
              <label htmlFor="about" className="lable-style">About</label>
              <input
                type="text"
                id="about"
                placeholder="Enter bio details"
                className="form-style border p-2 rounded"
                defaultValue={user?.additionalDetails?.about}
                {...register("about", { required: true })}
              />
              {errors.about && (
                <span className="-mt-1 text-xs text-yellow-100">
                  Please enter your bio.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>

    </>
  )
}