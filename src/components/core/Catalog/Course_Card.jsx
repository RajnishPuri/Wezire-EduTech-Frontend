import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({ course, Height }) => {


  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);

    setAvgReviewCount(count);
  }, [course])



  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-richblack-800 h-full">
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`${Height} w-full object-contain`}
          />
          <div className="flex flex-col gap-2 px-3 py-4">
            <p className="text-base md:text-lg lg:text-xl text-richblack-5 font-semibold line-clamp-2">
              {course?.courseName}
            </p>
            <p className="text-xs md:text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-5 font-medium">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
            </div>
            <p className="text-base md:text-lg text-richblack-5 font-bold">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>

    </>
  )
}

export default Course_Card
