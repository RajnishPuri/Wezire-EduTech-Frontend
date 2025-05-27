import React from 'react';
import ContactUsForm from '../../ContactPage/ContactUsForm';

const ContactFormSection = () => {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-20 text-gray-800">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-4">
          Get in Touch
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          We'd love to hear from you. Please fill out this form and we'll get back to you soon.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <ContactUsForm />
      </div>
    </section>
  );
};

export default ContactFormSection;
