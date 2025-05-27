import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const VideoDetailsSidebar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { sectionId, subSectionId } = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        const setActiveFlags = () => {
            if (!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname])

    const handleAddReview = () => {
        console.log("I am inside Add handleAddReview")
        setReviewModal(true);
    }

    return (
        <div className="w-11/12 mx-auto py-6 text-richwhite mt-14">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate("/dashboard/enrolled-courses")}
                    className="text-sm font-medium px-3 py-1 bg-richblack-700 rounded-md hover:bg-richblack-600 transition text-white"
                >
                    ← Back
                </button>
                <IconBtn
                    text="Add Review"
                    onclick={handleAddReview}
                    customClasses="bg-yellow-600 hover:bg-yellow-500 text-sm text-white"
                />
            </div>
            <div className="mb-6 text-white">
                <h3 className="text-2xl font-semibold">{courseEntireData?.courseName}</h3>
                <p className="text-sm text-gray-400">
                    {completedLectures.length} of {totalNoOfLectures} lectures completed
                </p>
            </div>

            <div className="space-y-4">
                {courseSectionData.map((section) => (
                    <div key={section._id}>
                        <div
                            onClick={() => setActiveStatus(section._id)}
                            className="flex justify-between items-center px-4 py-2 bg-richblack-700 rounded-md cursor-pointer text-white"
                        >
                            <span className="font-medium">{section.sectionName}</span>
                            <span
                                className={`transform transition ${activeStatus === section._id ? "rotate-180" : ""
                                    }`}
                            >
                                ▼
                            </span>
                        </div>

                        {activeStatus === section._id && (
                            <div className="mt-2 space-y-2 text-white">
                                {section.subSection.map((topic) => (
                                    <div
                                        key={topic._id}
                                        onClick={() => {
                                            navigate(
                                                `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${topic._id}`
                                            );
                                            setVideoBarActive(topic._id);
                                        }}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition ${videoBarActive === topic._id
                                            ? "bg-yellow-600 text-richblack-900"
                                            : "bg-richblack-800 hover:bg-richblack-700"
                                            } `}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={completedLectures.includes(topic._id)}
                                            readOnly
                                            className="accent-yellow-500"
                                        />
                                        <span className="text-sm text-white">{topic.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

    )
}

export default VideoDetailsSidebar
