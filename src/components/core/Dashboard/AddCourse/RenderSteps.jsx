import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <>
      {/* Step Circles with connectors */}
      <div className="relative mb-2 flex w-full justify-center px-4 sm:px-0">
        {steps.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-center flex-1 last:flex-initial"
          >
            {/* Step Circle */}
            <button
              className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] 
                ${step === item.id
                  ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                  : "border-richblack-700 bg-richblack-800 text-richblack-300"}
                ${step > item.id ? "bg-yellow-50 text-yellow-50" : ""}
              `}
            >
              {step > item.id ? (
                <FaCheck className="font-bold text-richblack-900" />
              ) : (
                item.id
              )}
            </button>

            {/* Connector line except after last step */}
            {idx !== steps.length - 1 && (
              <div
                className={`h-[17px] flex-grow border-dashed border-b-2
                  ${step > item.id ? "border-yellow-50" : "border-richblack-500"}`}
                style={{ marginLeft: 8, marginRight: 8 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step titles */}
      <div className="relative mb-16 flex w-full select-none justify-between px-4 sm:px-0">
        {steps.map((item) => (
          <div
            key={item.id}
            className="flex min-w-[90px] flex-col items-center gap-y-2 text-center"
          >
            <p
              className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render step components */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}
