import React from 'react';
const ConfirmationModal = ({ modalData, setConfirmationModal }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-md p-6 w-[90%] max-w-md shadow-lg">
                <p className="text-lg font-semibold text-gray-800">{modalData.text1}</p>
                <p className="mt-2 text-sm text-gray-600">{modalData.text2}</p>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={() => {
                            modalData.btn1Handler();
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        {modalData?.btn1Text}
                    </button>
                    <button
                        onClick={() => {
                            setConfirmationModal(null);
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ConfirmationModal
