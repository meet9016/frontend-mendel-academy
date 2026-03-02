import React from 'react'

const FooterButton = ({ children, onClick, className = '', mutedTextClass, ...props }) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex flex-col items-center justify-center px-2 py-1 rounded hover:bg-black/10 dark:hover:bg-black/10 transition-all text-xs font-medium cursor-pointer ${mutedTextClass} ${className}`}
        {...props}
    >
        {children}
    </button>
);

function TestFooter({
    headerBgClass, settings, elapsedSeconds, mutedTextClass, handleEndTest, formatTime
}: any) {

    const footerLinks = [
        {
            text: 'Medical Library',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square">
                <path d="M16.2627 10.5H7.73725C5.15571 10.5 3.86494 10.5 3.27143 11.3526C2.67793 12.2052 3.11904 13.4258 4.00126 15.867L5.08545 18.867C5.54545 20.1398 5.77545 20.7763 6.2889 21.1381C6.80235 21.5 7.47538 21.5 8.82143 21.5H15.1786C16.5246 21.5 17.1976 21.5 17.7111 21.1381C18.2245 20.7763 18.4545 20.1398 18.9146 18.867L19.9987 15.867C20.881 13.4258 21.3221 12.2052 20.7286 11.3526C20.1351 10.5 18.8443 10.5 16.2627 10.5Z" />
                <path d="M19 8C19 7.53406 19 7.30109 18.9239 7.11732C18.8224 6.87229 18.6277 6.67761 18.3827 6.57612C18.1989 6.5 17.9659 6.5 17.5 6.5H6.5C6.03406 6.5 5.80109 6.5 5.61732 6.57612C5.37229 6.67761 5.17761 6.87229 5.07612 7.11732C5 7.30109 5 7.53406 5 8" />
                <path d="M16.5 4C16.5 3.53406 16.5 3.30109 16.4239 3.11732C16.3224 2.87229 16.1277 2.67761 15.8827 2.57612C15.6989 2.5 15.4659 2.5 15 2.5H9C8.53406 2.5 8.30109 2.5 8.11732 2.57612C7.87229 2.67761 7.67761 2.87229 7.57612 3.11732C7.5 3.30109 7.5 3.53406 7.5 4" />
            </svg>,
            onClick: () => console.log('Medical Library clicked'),
            className: 'library-button',
        },
        {
            text: 'My Notebook',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15.5 7H8.5M12.499 11H8.49902" />
                <path d="M20 22H6C4.89543 22 4 21.1046 4 20M4 20C4 18.8954 4.89543 18 6 18H20V6C20 4.11438 20 3.17157 19.4142 2.58579C18.8284 2 17.8856 2 16 2H10C7.17157 2 5.75736 2 4.87868 2.87868C4 3.75736 4 5.17157 4 8V20Z" />
                <path d="M19.5 18C19.5 18 18.5 18.7628 18.5 20C18.5 21.2372 19.5 22 19.5 22" />
            </svg>,
            onClick: () => console.log('My Notebook clicked'),
            className: 'note-add-button',
        },
        {
            text: 'Flashcards',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z" />
            </svg>,
            onClick: () => console.log('Flashcards clicked'),
            className: 'flashcard-button',
        },
        {
            text: 'Feedback',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 13.5H16M8 8.5H12" />
                <path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" />
            </svg>,
            onClick: () => console.log('Feedback clicked'),
            className: 'feedback-button',
        },
        {
            text: 'Suspend',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.5 9L9.5 15M14.5 9V15" />
            </svg>,
            onClick: () => console.log('Suspend clicked'),
            className: 'suspend-button',
        },
        {
            text: 'End Block',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="red" fill="none" stroke="red" stroke-width="1.5">
                <path d="M7.84308 3.80211C9.8718 2.6007 10.8862 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C4.11384 6.01057 5.1282 5.40987 7.15692 4.20846L7.84308 3.80211Z" />
            </svg>,
            onClick: () => handleEndTest(),
            className: 'end-button',
        },
    ];

    return (
        <footer className={`footer h-14 ${headerBgClass} ${settings.theme === 'dark' ? 'border-t border-gray-600' : ''} flex items-center justify-between px-4 text-xs`}>
            {settings.showTimer && (
                <div className="block-time flex items-center gap-1 font-semibold text-base text-gray-800 dark:text-gray-200">
                    Block Time Elapsed: {formatTime(elapsedSeconds)}
                </div>
            )}

            <div className={`flex items-center gap-2 ${settings.showTimer ? '' : 'ml-auto'}`}>
                {footerLinks.map((link, index) => (
                    <FooterButton key={index} onClick={link.onClick} mutedTextClass={mutedTextClass} className={link.className}>
                        {link.icon}
                        <span>{link.text}</span>
                    </FooterButton>
                ))}
            </div>
        </footer>
    )
}

export default TestFooter