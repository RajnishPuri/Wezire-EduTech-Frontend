import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../store/slices/courseSlice';
import { Form } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx"
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';
import { useSelector } from 'react-redux';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, [view, edit, modalData, setValue]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
        }
        else {
            return false;
        }

    }
    const handleEditSubSection = async () => {

        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);
        formData.append("courseId", modalData.courseId);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);
        if (result) {
            dispatch(setCourse(result));
            setModalData(null)
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async (data) => {

        if (view)
            return;

        if (edit) {
            if (!isFormUpdated) {
                toast.error("No changes made to the form")
            }
            else {
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);
        setLoading(true);
        const result = await createSubSection(formData, token);

        if (result) {

            const currentCourse = course;

            const updatedCourse = {
                ...currentCourse,
                courseContent: currentCourse.courseContent.map((section) => {
                    if (section.sectionName === result.sectionName) {
                        return {
                            ...section,
                            ...result,
                        };
                    }
                    return section;
                }),
            };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }


    return (
        <div>
            <div className='mt-5 flex flex-col gap-4 bg-richblack-800 p-6 rounded-md text-white'>
                <div className='flex justify-between'>
                    <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button onClick={() => { !loading ? setModalData(null) : {} }
                    }>
                        <RxCross1 />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    <div className='mt-4 gap-1 flex flex-col'>
                        <label>Lecture Title</label>
                        <input
                            id='lectureTitle'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", { required: true })}
                            className='w-full placeholder:text-richblack-500 border p-2 border-richblack-400 rounded text-white'
                        />
                        {errors.lectureTitle && (<span>
                            Lecture Title is required
                        </span>)}
                    </div>
                    <div className='mt-4 gap-1 flex flex-col mb-5'>
                        <label>Lecture Description</label>
                        <textarea
                            id='lectureDesc'
                            placeholder='Enter Lecture Description'
                            {...register("lectureDesc", { required: true })}
                            className='w-full min-h-[130px] placeholder:text-richblack-500 border p-2 border-richblack-400 rounded text-white'
                        />
                        {
                            errors.lectureDesc && (<span>
                                Lecture Description is required
                            </span>)
                        }
                    </div>

                    {
                        !view && (
                            <div>
                                <IconBtn
                                    type="submit"
                                    text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                                />
                            </div>
                        )
                    }
                </form>
            </div>

        </div>
    )
}

export default SubSectionModal
