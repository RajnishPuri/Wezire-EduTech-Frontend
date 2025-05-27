import React from 'react';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimeLineImage from '../../../assets/Images/TimelineImage.png';

const Timeline = [
    {
        logo: Logo1,
        heading: 'Leadership',
        description: 'Fully Committed to the success of our students.',
    },
    {
        logo: Logo2,
        heading: 'Responsibility',
        description: 'Ownership and accountability in every step.',
    },
    {
        logo: Logo3,
        heading: 'Innovation',
        description: 'Constantly evolving our methods and solutions.',
    },
    {
        logo: Logo4,
        heading: 'Excellence',
        description: 'Delivering nothing less than the best.',
    },
];

const TimeLineSection = () => {
    return (
        <div className="px-4 py-10">
            <div className="flex flex-col-reverse lg:flex-row lg:gap-10 gap-40 items-center">
                <div className="w-full lg:w-[50%] flex flex-col gap-6">
                    {Timeline.map((item, index) => (
                        <div key={index} className="flex flex-row gap-4 items-start">
                            <div className="min-w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-md">
                                <img src={item.logo} alt="Logo" className="w-[60%]" />
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-richblack-900">{item.heading}</h1>
                                <p className="text-sm text-richblack-300">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative w-full lg:w-[50%] max-w-[600px]">
                    <img
                        src={TimeLineImage}
                        alt="Timeline"
                        className="w-full h-auto object-contain rounded-lg shadow-lg"
                    />
                    <div className="absolute bg-caribbeangreen-700 flex flex-col md:flex-row text-white uppercase py-6 px-4 md:px-10 items-center gap-6 md:gap-0
            left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-md shadow-md text-center md:text-left">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center border-b md:border-b-0 md:border-r border-caribbeangreen-300 pr-0 md:pr-7">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-caribbeangreen-300 text-sm">Years of Experience</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center pl-0 md:pl-7">
                            <p className="text-3xl font-bold">250</p>
                            <p className="text-caribbeangreen-300 text-sm">Types of Courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeLineSection;
