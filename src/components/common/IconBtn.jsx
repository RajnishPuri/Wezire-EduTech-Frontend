import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) => {
    return (
        <button
            className={`flex items-center justify-center gap-x-2 rounded-md px-4 py-2 text-richblack-900 ${outline
                    ? "bg-transparent border-[1px] border-richblack-700"
                    : "bg-yellow-50 text-richblack-900"
                } ${customClasses}`}
            disabled={disabled}
            onClick={onclick}
            type={type}>
            {
                children ? (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }
        </button>
    )
}

export default IconBtn
