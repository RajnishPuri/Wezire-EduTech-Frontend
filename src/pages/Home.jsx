import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Banner from '../assets/Images/screen_logo.webp'
import Footer from '../components/common/Footer';
import HighlightText from '../components/core/HomePage/HighlightText';
import CodeAnimation from '../components/core/HomePage/CodeAnimation';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import InstructorSection from '../components/core/HomePage/IntructorSection';

import t1 from '../assets/Images/t1.png';
import t2 from '../assets/Images/t2.png'
import Button from '../Components/core/homepage/Button';


const Home = () => {
    return (
        <div className='overflow-x-hidden mt-2'>
            <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                    <Link to="/signup">
                        <div className='flex flex-row items-center gap-2 rounded-full px-6 py-[5px] group-hover:bg-richblack-900 text-sm sm:text-base'>
                            Become an Instructor
                            <FaArrowRight />
                        </div>
                    </Link>
                </div>

                <h1 className='text-center text-2xl sm:text-4xl font-semibold mt-5 px-4'>
                    Unlocking India’s Potential—One <span className='text-blue-100'>Civil Servant</span> at a Time.
                </h1>

                <div className='w-full sm:w-[80%] md:w-[60%] text-center text-sm sm:text-lg font-bold text-richblack-300 mt-5 px-4'>
                    <p className='leading-relaxed'>
                        Maheshan IAS is your trusted partner on the journey to cracking the Civil Services Examination. Founded with the vision of guiding aspirants towards a purposeful and successful career in public service, we offer a structured, mentorship-driven approach tailored for UPSC, BPSC, and UPPSC aspirants. With a foundation rooted in academic excellence, resilience, and innovation, Maheshan IAS is committed to helping you not only clear the exam but also emerge as a leader with vision and purpose.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 sm:gap-7 mt-8'>
                    <Button text="Book a Demo" active={true} link="/book-demo" />
                    <Button text="Learn More" active={false} link="learnn-more" />
                </div>

                <div className='my-12 w-full sm:w-3/4 px-4'>
                    {/* <video className='w-full rounded-md shadow-lg' muted autoPlay loop>
                        <source src={Banner} type="video/mp4" />
                    </video> */}
                    <img src={Banner} alt="Banner" className='w-full rounded-md shadow-lg' />
                </div>

                <div className='flex flex-col lg:flex-row w-full max-w-6xl mx-auto mb-10 items-center justify-between gap-10 px-4 '>
                    {/* Left side - content */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 text-white">Dear Aspirants,</h2>
                        <p className="text-white leading-relaxed mb-4">
                            The Civil Services exam is not just a test—it’s a journey to become the change makers our nation needs.
                            At <span className="font-semibold">Maheshan</span>, we are here to guide and support you every step of the way.
                            This path will challenge you, but it will also shape you into a leader with purpose and vision.
                        </p>
                        <p className="text-white leading-relaxed mb-4">
                            Stay focused, stay resilient, and remember: the hard work you put in today will shape the future you dream of.
                            Believe in yourself, and keep moving forward with determination.
                        </p>
                        <p className="text-white font-medium mt-6">
                            We are with you, every step of the way.
                        </p>
                        <p className="mt-4 font-semibold text-white">
                            With best wishes,<br />
                            <span className="block mt-1">Shantnu Raj</span>
                            <span className="text-sm text-white">Founder & CEO, Maheshan IAS</span>
                        </p>
                    </div>

                    {/* Right side - image */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src={t1}
                            alt="Shantnu Raj - Founder & CEO"
                            className="w-72 h-72 object-contain rounded-xl shadow-lg"
                        />
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row w-full max-w-6xl mx-auto mb-10 items-center justify-between gap-10 px-4'>
                    {/* Left side - image */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src={t2}
                            alt="Mahesh Rajput - Co-Founder & CMD"
                            className="w-72 h-72 object-contain rounded-xl shadow-lg"
                        />
                    </div>

                    {/* Right side - content */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 text-white">Dear Civil Services Aspirants,</h2>
                        <p className="text-white leading-relaxed mb-4">
                            I want to take a moment to acknowledge that preparing for the Civil Services exams is not just about mastering books and materials;
                            it’s about nurturing resilience, building an analytical mindset, and cultivating a passion for serving the nation.
                        </p>
                        <p className="text-white leading-relaxed mb-4">
                            This journey will test you in countless ways—mentally, emotionally, and physically. There will be moments of doubt and frustration.
                            Stay focused, stay disciplined, and keep the bigger picture in mind.
                        </p>
                        <p className="text-white font-medium mt-6">
                            With utmost respect and belief in your potential,
                        </p>
                        <p className="mt-4 font-semibold text-white">
                            Mahesh Rajput<br />
                            <span className="text-sm text-white">Co-Founder & CMD, Maheshan IAS</span>
                        </p>
                    </div>
                </div>


            </div>

            <div className='bg-pure-greys-5 text-richblack-700'>
                {/* <div className='homepage_bg h-auto sm:h-[310px] py-10 sm:py-0'>
                    <div className='w-11/12 max-w-screen-xl flex flex-col items-center justify-center mx-auto gap-5'>
                        <div className='min-h-[150px]'>
                            <ExploreMore />
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4 text-white'>
                            <Button text={"Explore Full Catalog"} active={true} link="/signup" />
                            <Button text={"Learn More"} active={false} link="/signup" />
                        </div>
                    </div>
                </div> */}

                <div className='mx-auto w-11/12 max-w-screen-xl flex flex-col items-center justify-between gap-7 px-4 mt-10'>
                    <div className='flex flex-col md:flex-row gap-6 mb-10 mt-16 justify-center'>
                        <div className='text-2xl sm:text-3xl font-semibold w-full md:w-1/2 text-center md:text-left'>
                            Build the Foundation for a <HighlightText text={"Future in Civil Services."} />
                        </div>
                        <div className='flex flex-col gap-5 w-full md:w-1/2 text-sm sm:text-base'>
                            <p>
                                The demand for dedicated and well-prepared civil servants is greater than ever. Our courses are thoughtfully designed to equip you with the knowledge, discipline, and strategy needed to excel in the UPSC journey and serve the nation with integrity.
                            </p>

                            <Button text={"Learn More"} active={true} link="/signup" />
                        </div>
                    </div>

                    {/* <TimeLineSection />
                    <LearningLanguageSection /> */}
                </div>
            </div>

            {/* <div className='w-11/12 mx-auto max-w-screen-xl flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white px-4 py-12'>
                <InstructorSection />
                <h2 className='text-center text-2xl sm:text-4xl font-semibold mt-10'>Reviews From Other Learners</h2>
            </div> */}

            <div className='w-full'>
                <Footer />
            </div>
        </div>
    )
}

export default Home
