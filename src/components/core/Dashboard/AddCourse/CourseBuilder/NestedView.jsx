import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../store/slices/courseSlice';

const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [confirmationModal, setConfirmationModal] = useState(null);

    const [subSectionModal, setSubSectionModal] = useState({
        type: null,
        data: null,
    });

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection(
            { sectionId, courseId: course._id },
            token
        );
        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    };

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            courseId: course._id,
            token,
        });
        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    };

    return (
        <div className="mt-5">
            <div className="rounded-lg bg-richblack-700 p-6 px-8">
                {course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        <summary className="flex items-center justify-between gap-x-3 border-b-2 p-4">
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <button
                                    onClick={() =>
                                        handleChangeEditSectionName(section._id, section.sectionName)
                                    }
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    onClick={() => {
                                        setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        });
                                    }}
                                >
                                    <RiDeleteBin6Line />
                                </button>
                                <span>|</span>
                                <BiDownArrow className="text-xl text-richblack-300" />
                            </div>
                        </summary>

                        <div>
                            {section?.subSection?.map((data) => (
                                <div
                                    key={data?._id}
                                    onClick={() => {
                                        setSubSectionModal({ type: 'view', data });
                                    }}
                                    className="flex items-center justify-between gap-x-3 border-b-2 cursor-pointer p-2 ml-3 mr-3"
                                >
                                    <div className="flex items-center gap-x-3 p-3">
                                        <RxDropdownMenu />
                                        <p className='text-sm'>{data.title}</p>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering view
                                                setSubSectionModal({
                                                    type: 'edit',
                                                    data: {
                                                        ...data,
                                                        sectionId: section._id,
                                                        courseId: course._id,
                                                        subSectionId: data._id,
                                                    },
                                                });
                                            }}
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering view
                                                setConfirmationModal({
                                                    text1: "Delete this Sub Section",
                                                    text2: "Selected lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () =>
                                                        handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                });
                                            }}
                                        >
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() =>
                                    setSubSectionModal({ type: 'add', data: section._id })
                                }
                                className="mt-4 flex items-center gap-x-2 text-yellow-50"
                            >
                                <AiOutlinePlus />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {/* Unified Modal Rendering */}
            {subSectionModal.type && (
                <SubSectionModal
                    modalData={subSectionModal.data}
                    setModalData={() => setSubSectionModal({ type: null, data: null })}
                    add={subSectionModal.type === 'add'}
                    edit={subSectionModal.type === 'edit'}
                    view={subSectionModal.type === 'view'}
                />
            )}

            {/* Confirmation Modal */}
            {confirmationModal && (
                <ConfirmationModal
                    modalData={confirmationModal}
                    setConfirmationModal={setConfirmationModal}
                />
            )}

        </div>
    );
};

export default NestedView;
