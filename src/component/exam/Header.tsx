import { BiMenu } from 'react-icons/bi';

function TestHeader({
    headerBgClass,
    borderColorClass,
    textColorClass,
    isSidebarVisible,
    setIsSidebarVisible,
    test,
    currentIndex,
    handlePrevious,
    handleNext,
    isCurrentMarked,
    toggleMarkCurrent,
    handleOpenNote,
    toggleFullScreen,
    isFullScreen,
    setRunTutorial,
    setShowTutorialMenu,
    showTutorialMenu,
    setShowKeyboardShortcuts,
    setShowLabValues,
    setShowCalculator,
    setShowSettings,
    optionBgClass,
    currentState,
    settings,
    onSettingsChange
}: any) {
    return (
        <header className={`${headerBgClass} px-4 py-0 border-b ${borderColorClass}`}>
            <div className="flex items-center">
                <div className="flex items-center gap-4 flex-1">
                    {/* Menu Toggle Button */}
                    <button
                        type="button"
                        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                        className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer mr-2 ${textColorClass}`}
                        title={isSidebarVisible ? "Hide Questions Index" : "Show Questions Index"}
                    >
                        <BiMenu className="text-3xl" />
                    </button>

                    {/* Left Section */}
                    <div className="question-number text-sm font-medium">
                        Question {currentIndex + 1} of {test.questions.length}
                    </div>

                    <button
                        type="button"
                        onClick={toggleMarkCurrent}
                        className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                    >
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 22 30"
                        >
                            <g stroke="#FCFCFC" strokeWidth="2.2" fill="#B70808">
                                <g>
                                    <line x1="10" y1="35" x2="1.5" y2="4" />
                                    <path
                                        d="M20,8c-2,3-4,7-7,8c-2,1-5,2-7,3C5,14,4,9,1,5C8,1,13,10,20,8z"
                                    />
                                </g>
                            </g>
                        </svg>

                        {isCurrentMarked ? "Marked" : "Mark"}
                    </button>
                </div>

                {/* Center Section - Navigation Buttons */}
                <div className="nav-buttons flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color={textColorClass} fill="none" stroke="currentColor" stroke-width="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M13.5 16C13.5 16 10.5 13.054 10.5 12C10.5 10.9459 13.5 8 13.5 8" />
                        </svg>
                        Previous
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentIndex === test.questions.length - 1}
                        className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color={textColorClass} fill="none" stroke="currentColor" stroke-width="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" />
                        </svg>
                        Next
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3 flex-1 justify-end">

                    <button
                        type="button"
                        onClick={toggleFullScreen}
                        className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                    >
                        {isFullScreen ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6.50232 13.2635C7.34673 13.2515 10.1432 12.6706 10.7361 13.2635C11.329 13.8564 10.7481 16.6529 10.7361 17.4973M13.2685 6.49733C13.2565 7.34173 12.6756 10.1382 13.2685 10.7311C13.8614 11.324 16.6579 10.7431 17.5023 10.7311M20.9991 2.99902L13.6103 10.3812M10.3691 13.6237L3 21.001" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color={textColorClass} fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8.00001 3.09779C8.00001 3.09779 4.03375 2.74194 3.38784 3.38785C2.74192 4.03375 3.09784 8 3.09784 8" />
                            <path d="M8.00001 20.9022C8.00001 20.9022 4.03375 21.2581 3.38784 20.6122C2.74192 19.9662 3.09784 16 3.09784 16" />
                            <path d="M16 3.09779C16 3.09779 19.9663 2.74194 20.6122 3.38785C21.2581 4.03375 20.9022 8 20.9022 8" />
                            <path d="M16 20.9022C16 20.9022 19.9663 21.2581 20.6122 20.6122C21.2581 19.9662 20.9022 16 20.9022 16" />
                            <path d="M14.0107 9.99847L20.0625 3.94678" />
                            <path d="M9.99696 14.0024L3.63966 20.3807" />
                            <path d="M9.99732 10.0024L3.84571 3.85889" />
                            <path d="M13.9795 14.0024L20.5279 20.4983" />
                        </svg>}
                        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                    </button>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowTutorialMenu(!showTutorialMenu)}
                            className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color={textColorClass} fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5" />
                                <path d="M12.0001 17H12.009" />
                            </svg>
                            Tutorial
                        </button>

                        {/* Tutorial Menu */}
                        {showTutorialMenu && (
                            <div className={`absolute right-0 mt-2 w-48 ${optionBgClass} rounded-md shadow-lg z-50 border ${borderColorClass}`}>
                                <button
                                    onClick={() => {
                                        setRunTutorial(true);
                                        setShowTutorialMenu(false);
                                    }}
                                    className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                                >
                                    Interface Tutorial
                                </button>
                                <button
                                    onClick={() => {
                                        setShowKeyboardShortcuts(true);
                                        setShowTutorialMenu(false);
                                    }}
                                    className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                                >
                                    Keyboard Shortcuts
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setShowLabValues(true);
                            setShowCalculator(false);
                            setShowSettings(false);
                        }}
                        className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color={textColorClass} fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 5V9" />
                            <path d="M8 2H10C11.1046 2 12 2.89543 12 4V5H10C8.89543 5 8 4.10457 8 3V2Z" />
                            <path d="M16.8148 22H7.18524C6.53065 22 6 21.4693 6 20.8148C6 20.6085 6.05383 20.4058 6.15616 20.2267L10 13.5V9H14V13.5L17.8438 20.2267C17.9462 20.4058 18 20.6085 18 20.8148C18 21.4693 17.4693 22 16.8148 22Z" />
                            <path d="M9 9H15" />
                            <path d="M16 3H14C12.8954 3 12 3.89543 12 5V6H14C15.1046 6 16 5.10457 16 4V3Z" />
                        </svg>
                        Lab Values
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setShowCalculator(true);
                            setShowLabValues(false);
                            setShowSettings(false);
                        }}
                        className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color={textColorClass} fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M21.5 12.95V11.05C21.5 7.01949 21.5 5.00424 20.1088 3.75212C18.7175 2.5 16.4783 2.5 12 2.5C7.52166 2.5 5.28249 2.5 3.89124 3.75212C2.5 5.00424 2.5 7.01949 2.5 11.05V12.95C2.5 16.9805 2.5 18.9958 3.89124 20.2479C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.2479C21.5 18.9958 21.5 16.9805 21.5 12.95Z" />
                            <path d="M18 8H14M16 6L16 10" />
                            <path d="M18 17.5H14" />
                            <path d="M18 14.5H14" />
                            <path d="M10 17.5L8.25 15.75M8.25 15.75L6.5 14M8.25 15.75L10 14M8.25 15.75L6.5 17.5" />
                            <path d="M10 8H6" />
                        </svg>

                        Calculator
                    </button>

                    <button
                        type="button"
                        onClick={handleOpenNote} // Add click handler
                        className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer relative ${textColorClass}`}
                    >
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 160 160"
                        >
                            <rect x="0" y="20" width="130" height="80" fill="#FCFCFC" />

                            <text
                                x="20"
                                y="70"
                                style={{
                                    fontFamily: '"Chalkboard SE", "Segoe Print", cursive',
                                    fontSize: 40
                                }}
                            >
                                ABC
                            </text>

                            <g transform="rotate(25) translate(100,-20)">
                                <g>
                                    <rect
                                        transform="rotate(-60,90,48)"
                                        width="90"
                                        height="30"
                                        fill="#F7971D"
                                    />
                                    <polyline points="3,102 5,127 30,117" fill="#FFF" />
                                    <polyline points="4.5,117 5,127 14.5,123" />
                                    <rect
                                        transform="rotate(-60,45,-30)"
                                        width="25"
                                        height="30"
                                        fill="#F06567"
                                    />
                                </g>
                            </g>
                        </svg>
                        Note
                        {currentState?.note && (
                            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                    </button>



                    <button
                        type="button"
                        onClick={() => {
                            setShowSettings(true);
                            setShowLabValues(false);
                            setShowCalculator(false);
                        }}
                        className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color={textColorClass} fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 19L11.1069 10.7479C9.76348 6.91597 9.09177 5 8 5C6.90823 5 6.23652 6.91597 4.89309 10.7479L2 19M4.5 12H11.5" />
                            <path d="M21.9692 13.9392V18.4392M21.9692 13.9392C22.0164 13.1161 22.0182 12.4891 21.9194 11.9773C21.6864 10.7709 20.4258 10.0439 19.206 9.89599C18.0385 9.75447 17.1015 10.055 16.1535 11.4363M21.9692 13.9392L19.1256 13.9392C18.6887 13.9392 18.2481 13.9603 17.8272 14.0773C15.2545 14.7925 15.4431 18.4003 18.0233 18.845C18.3099 18.8944 18.6025 18.9156 18.8927 18.9026C19.5703 18.8724 20.1955 18.545 20.7321 18.1301C21.3605 17.644 21.9692 16.9655 21.9692 15.9392V13.9392Z" />
                        </svg>
                        Text Zoom
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setShowSettings(true);
                            setShowLabValues(false);
                            setShowCalculator(false);
                        }}
                        className={`flex flex-col items-center justify-center px-4 py-2 bg-transparent transition-colors text-sm font-medium text-black cursor-pointer ${textColorClass}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color={textColorClass} fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" />
                            <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" />
                        </svg>
                        <span>Settings</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default TestHeader