import React from 'react';
import HighlightText from './HighlightText';
import Know_your_progress from '../../../assets/Images/Know_your_progress.png';
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png';
import Compare_With_others from '../../../assets/Images/Compare_With_others.png';
import Button from '../../../pages/Button';


const LearningLanguageSection = () => {
    return (
        <div className="mt-[130px] mb-10 px-4 sm:px-6 lg:px-20">
            <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto">
                <div className="text-3xl sm:text-4xl font-semibold text-center">
                    Your Swiss Knife for{' '}
                    <HighlightText text="Learning any Languages" />
                </div>
                <p className="text-center text-richblack-600 text-base sm:text-lg font-medium max-w-[700px]">
                    Our platform offers a wide range of courses in various languages, catering to learners of all levels. Whether you're a beginner or looking to enhance your skills, we have the right course for you.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full max-w-[900px]">
                    <img
                        src={Know_your_progress}
                        alt="Know your progress"
                        className="w-44 sm:w-40 md:w-48 object-contain sm:-mr-10"
                    />
                    <img
                        src={Compare_With_others}
                        alt="Compare with others"
                        className="w-44 sm:w-40 md:w-48 object-contain"
                    />
                    <img
                        src={Plan_your_lessons}
                        alt="Plan your lessons"
                        className="w-44 sm:w-40 md:w-48 object-contain sm:-ml-10"
                    />
                </div>

                <div className="mt-8 w-fit">
                    <Button text="Learn More" active={true} link="/signup" />
                </div>
            </div>
        </div>
    );
};

export default LearningLanguageSection;
