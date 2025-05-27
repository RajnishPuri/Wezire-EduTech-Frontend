import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import ReactStars from "react-rating-stars-component";

const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, [])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience,
            },
            token
        );
        setReviewModal(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="w-11/12 max-w-lg bg-richblack-800 text-richwhite rounded-2xl shadow-xl overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b border-richblack-700">
                    <h3 className="text-xl font-semibold">Add Review</h3>
                    <button
                        onClick={() => setReviewModal(false)}
                        className="text-gray-400 hover:text-richwhite"
                    >
                        ✕
                    </button>
                </div>

                <div className="px-6 py-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={user?.image}
                            alt="user avatar"
                            className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500"
                        />
                        <div>
                            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                            <p className="text-sm text-gray-400">Posting Publicly</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={28}
                            activeColor="#ffd700"
                        />

                        <div>
                            <label htmlFor="courseExperience" className="block mb-1 text-sm">
                                Add Your Experience*
                            </label>
                            <textarea
                                id="courseExperience"
                                placeholder="Share your thoughts..."
                                {...register("courseExperience", { required: true })}
                                className="w-full min-h-[140px] p-3 bg-richblack-700 border border-richblack-600 rounded-md focus:outline-none focus:border-yellow-500"
                            />
                            {errors.courseExperience && (
                                <p className="mt-1 text-sm text-red-500">
                                    Please add your experience
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setReviewModal(false)}
                                className="px-4 py-2 bg-richblack-700 hover:bg-richblack-600 rounded-md transition"
                            >
                                Cancel
                            </button>
                            <IconBtn
                                text="Save"
                                customClasses="px-6 py-2 bg-yellow-600 hover:bg-yellow-500"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default CourseReviewModal
