import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            try {
                setLoading(true);
                const instructorApiData = await getInstructorData(token);
                const result = await fetchInstructorCourses(token);

                if (Array.isArray(instructorApiData) && instructorApiData.length > 0) {
                    setInstructorData(instructorApiData);
                }

                if (Array.isArray(result)) {
                    setCourses(result);
                }

            } catch (error) {
                console.error("Error fetching instructor data:", error);
            } finally {
                setLoading(false);
            }
        };

        getCourseDataWithStats();
    }, [token]);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0) || 0;
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0) || 0;

    return (
        <div className='text-white p-6 md:p-10 space-y-10'>
            <div>
                <h1 className='text-3xl font-bold'>Hi {user?.firstName} 👋</h1>
                <p className='text-lg text-gray-400'>Let's start something new</p>
            </div>

            {loading ? (
                <div className='flex justify-center items-center min-h-[200px]'>
                    <div className='loader'></div>
                </div>
            ) : courses.length > 0 ? (
                <div className='grid gap-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <InstructorChart courses={instructorData} />
                        <div className='bg-gray-800 p-6 rounded-xl shadow-md'>
                            <h2 className='text-xl font-semibold mb-4'>📊 Statistics</h2>
                            <div className='space-y-4'>
                                <div className='flex justify-between'>
                                    <p>Total Courses</p>
                                    <p>{courses.length}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Total Students</p>
                                    <p>{totalStudents}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Total Income</p>
                                    <p>₹ {totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-2xl font-semibold'>Your Courses</h3>
                            <Link to="/dashboard/my-courses" className='text-blue-500 hover:underline'>View all</Link>
                        </div>
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {courses.slice(0, 3).map((course) => (
                                <div key={course._id} className='bg-gray-800 rounded-lg shadow-md overflow-hidden'>
                                    <img src={course.thumbnail} alt="course thumbnail" className='w-full h-40 object-cover' />
                                    <div className='p-4'>
                                        <h4 className='font-semibold text-lg'>{course.courseName}</h4>
                                        <div className='flex justify-between text-sm text-gray-400 mt-2'>
                                            <span>{course.studentsEnrolled.length} students</span>
                                            <span>₹ {course.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='text-center py-20'>
                    <p className='text-xl mb-4'>You have not created any courses yet</p>
                    <Link
                        to={"/dashboard/addCourse"}
                        className='bg-yellow-500 text-black px-6 py-2 rounded-md hover:bg-yellow-400 transition'
                    >
                        Create a Course
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Instructor;
