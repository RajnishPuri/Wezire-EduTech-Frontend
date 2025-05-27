import React from 'react';
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from '../components/core/AboutPage/Stats';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import Footer from '../components/common/Footer';

const About = () => {
  return (
    <div className="text-white bg-[#0f0f0f] mt-5">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold leading-tight">
            Driving Innovation in Online Education for a <HighlightText text="Brighter Future" />
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
          </p>
        </header>
        <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center items-center">
          <img src={BannerImage1} alt="About Us 1" className="w-full md:w-1/3 rounded-lg shadow-lg" />
          <img src={BannerImage2} alt="About Us 2" className="w-full md:w-1/3 rounded-lg shadow-lg" />
          <img src={BannerImage3} alt="About Us 3" className="w-full md:w-1/3 rounded-lg shadow-lg" />
        </div>
      </section>

      <section className="px-4 py-16 bg-[#141414]">
        <Quote />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-semibold">Our Founding Story</h2>
            <p className="text-gray-300">
              Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities.
            </p>
            <p className="text-gray-300">
              We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals to unlock their full potential.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={FoundingStory} alt="Founding Story" className="rounded-lg shadow-xl w-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Our Vision</h2>
            <p className="text-gray-300">
              We set out to create an e-learning platform that revolutionizes learning. Our team worked tirelessly to develop a robust platform that combines cutting-edge technology with engaging content for a dynamic experience.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-gray-300">
              Our mission goes beyond just courses — we aim to foster a vibrant community of learners. Through forums, live sessions, and networking, we encourage collaboration and shared learning.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#141414] py-16">
        <StatsComponent />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-12 items-center">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <section className="px-4 py-16 text-center bg-[#0f0f0f]">
        <h2 className="text-2xl font-semibold mb-4">Reviews from other learners</h2>
      </section>

      <Footer />
    </div>
  );
};

export default About;
