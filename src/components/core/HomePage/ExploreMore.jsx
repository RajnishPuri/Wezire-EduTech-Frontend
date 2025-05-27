import React, { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';

const tabsName = [
  'Free',
  'New to coding',
  'Most popular',
  'Skill paths',
  'Career paths',
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-full px-4 md:px-0">

      <div className="text-3xl md:text-4xl font-semibold text-center leading-tight">
        Unlock the <HighlightText text={'Power of Code'} />
      </div>


      <p className="text-center text-richblack-300 text-sm md:text-base mt-2">
        Learn to build anything you can imagine
      </p>


      <div className="mt-6 flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-2 md:gap-4 rounded-full bg-richblack-800 mb-5 border border-richblack-100 px-2 py-1 overflow-x-auto">
        {tabsName.map((element, index) => (
          <div
            key={index}
            onClick={() => setMyCards(element)}
            className={`text-sm md:text-base whitespace-nowrap px-5 py-2 rounded-full cursor-pointer transition-all duration-200
              ${currentTab === element
                ? 'bg-richblack-900 text-richblack-5 font-medium'
                : 'text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5'}
            `}
          >
            {element}
          </div>
        ))}
      </div>


      <div className="h-[100px] md:h-[150px]"></div>

      {/* Course cards placeholder */}
      {/* <div className="w-full flex flex-wrap justify-center gap-6">
        {courses.map((element, index) => (
          <CourseCard
            key={index}
            cardData={element}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ExploreMore;
