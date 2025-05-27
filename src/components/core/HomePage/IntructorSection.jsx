import React from 'react';
import Instructor from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import Button from '../../../pages/Button';


const InstructorSection = () => {
    return (
        <div className="mt-16 px-4 sm:px-6 lg:px-20">
            <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-center max-w-7xl mx-auto">

                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <img
                        src={Instructor}
                        alt="Instructor"
                        className="shadow-white object-contain max-w-full h-auto"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-semibold w-full md:w-3/4 text-center md:text-left">
                        Become an <HighlightText text="Instructor" />
                    </div>
                    <p className="font-medium text-sm sm:text-base md:text-lg text-richblack-300 w-full md:w-4/5 text-center md:text-left">
                        Join our community of expert instructors and share your knowledge with the world. Our platform provides you with the tools and resources you need to create and sell your own online courses, reach a global audience, and earn money doing what you love.
                    </p>
                    <div className="w-fit mx-auto md:mx-0">
                        <Button text="Start Learning" active={true} link="/signup" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorSection;
