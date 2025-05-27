import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
    const [currChart, setCurrChart] = useState("students");

    const getRandomColors = (numColors) => {
        return Array.from({ length: numColors }, () =>
            `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
        );
    }

    const chartDataForStudents = {
        labels: courses.map(course => course.courseName),
        datasets: [{
            data: courses.map(course => course.totalStudentsEnrolled),
            backgroundColor: getRandomColors(courses.length),
        }]
    };

    const chartDataForIncome = {
        labels: courses.map(course => course.courseName),
        datasets: [{
            data: courses.map(course => course.totalAmountGenerated),
            backgroundColor: getRandomColors(courses.length),
        }]
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: 'white'
                }
            }
        }
    };

    return (
        <div className='bg-gray-800 p-6 rounded-xl shadow-md w-full'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>📈 Visualize</h2>
                <div className='space-x-2'>
                    <button
                        onClick={() => setCurrChart("students")}
                        className={`px-4 py-1 rounded-md text-sm ${currChart === "students" ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}
                    >
                        Students
                    </button>
                    <button
                        onClick={() => setCurrChart("income")}
                        className={`px-4 py-1 rounded-md text-sm ${currChart === "income" ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}
                    >
                        Income
                    </button>
                </div>
            </div>

            <div className='max-w-full'>
                <Pie
                    data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                    options={options}
                />
            </div>
        </div>
    )
}

export default InstructorChart;
