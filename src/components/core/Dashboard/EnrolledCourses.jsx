import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { Link } from "react-router-dom"

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div className="text-white w-11/12 mx-auto py-6">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Enrolled Courses</h2>

            {!enrolledCourses ? (
                <div className="text-center text-gray-400">Loading...</div>
            ) : !enrolledCourses.length ? (
                <p className="text-gray-400">You have not enrolled in any course yet.</p>
            ) : (
                <>
                    <div className="hidden md:block space-y-6">
                        <div className="grid grid-cols-12 text-gray-400 font-semibold text-sm pb-2 border-b border-gray-600">
                            <p className="col-span-5">Course Name</p>
                            <p className="col-span-2">Duration</p>
                            <p className="col-span-3">Progress</p>
                            <p className="col-span-2">Action</p>
                        </div>

                        {enrolledCourses.map((course, index) => {
                            const sectionId = course?.courseContent?.[0] || "default-section";
                            const subSectionId = "default-subsection";

                            return (
                                <div
                                    key={index}
                                    className="grid grid-cols-12 items-center bg-[#1f1f1f] p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="col-span-5 flex gap-4 items-start">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseName}
                                            className="w-24 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <p className="font-semibold text-lg">{course.courseName}</p>
                                            <p className="text-sm text-gray-400 line-clamp-2">{course.courseDescription}</p>
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-sm text-gray-300">
                                        {course.totalDuration || "N/A"}
                                    </div>

                                    <div className="col-span-3">
                                        <p className="text-sm mb-1">Progress: {course.progressPercentage || 0}%</p>
                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height="8px"
                                            isLabelVisible={false}
                                            baseBgColor="#2d2d2d"
                                            bgColor="#22c55e"
                                            borderRadius="5px"
                                        />
                                    </div>

                                    <div className="col-span-2 text-right">
                                        <Link
                                            to={`/view-course/${course._id}/section/${sectionId}/sub-section/${subSectionId}`}
                                        >
                                            <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                                                Go to Course
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="md:hidden flex flex-col space-y-6">
                        {enrolledCourses.map((course, index) => {
                            const sectionId = course?.courseContent?.[0] || "default-section";
                            const subSectionId = "default-subsection";

                            return (
                                <div
                                    key={index}
                                    className="bg-[#1f1f1f] p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <img
                                        src={course.thumbnail}
                                        alt={course.courseName}
                                        className="w-full h-40 object-cover rounded-lg mb-3"
                                    />
                                    <p className="font-semibold text-xl mb-1">{course.courseName}</p>
                                    <p className="text-sm text-gray-400 mb-2 line-clamp-3">{course.courseDescription}</p>
                                    <p className="text-sm text-gray-300 mb-2">Duration: {course.totalDuration || "N/A"}</p>

                                    <div className="mb-3">
                                        <p className="text-sm mb-1">Progress: {course.progressPercentage || 0}%</p>
                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height="8px"
                                            isLabelVisible={false}
                                            baseBgColor="#2d2d2d"
                                            bgColor="#22c55e"
                                            borderRadius="5px"
                                        />
                                    </div>

                                    <Link
                                        to={`/view-course/${course._id}/section/${sectionId}/sub-section/${subSectionId}`}
                                    >
                                        <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
                                            Go to Course
                                        </button>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

export default EnrolledCourses;
