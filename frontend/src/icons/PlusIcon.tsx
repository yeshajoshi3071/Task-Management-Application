import React from 'react'

/**
 * Renders a plus icon.
 * @returns JSX element representing the plus icon.
 */
function PlusIcon() {
  return (
    <div>
        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`mr-4 mt-[0.15rem] fill-mediumGrey group-hover:fill-purple   `}
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <title></title>
                                <g id="Complete">
                                    <g id="add-square">
                                        <g>
                                            <rect
                                                data-name="--Rectangle"
                                                fill="none"
                                                height="20"
                                                id="_--Rectangle"
                                                rx="2"
                                                ry="2"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                width="20"
                                                x="2"
                                                y="2"
                                            ></rect>
                                            <line
                                                fill="none"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                x1="15.5"
                                                x2="8.5"
                                                y1="12"
                                                y2="12"
                                            ></line>
                                            <line
                                                fill="none"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                x1="12"
                                                x2="12"
                                                y1="15.5"
                                                y2="8.5"
                                            ></line>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
    </div>
  )
}

export default PlusIcon