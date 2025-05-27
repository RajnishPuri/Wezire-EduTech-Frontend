import React from 'react';
import Button from './Button';

const CodeDetailsContent = ({ heading, description, buttonDetails }) => {
    return (
        <div className="text-start p-5 lg:w-1/2 gap-7 flex flex-col w-full">
            <div className='w-4/5'>
                <h2 className="text-2xl font-bold">{heading}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>

            <div className="mt-4 flex justify-start gap-4">
                {buttonDetails?.map((button, index) => (
                    button.active ? <Button key={index} text={button.text} link={button.link} active={true} /> : <Button key={index} text={button.text} link={button.link} active={false} />
                ))}
            </div>
        </div>
    );
};

export default CodeDetailsContent;
