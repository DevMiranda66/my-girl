'use client';

import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import type { ElementType } from 'react';
import { gsap } from 'gsap';

interface TextTypeProps {
    className?: string;
    showCursor?: boolean;
    hideCursorWhileTyping?: boolean;
    cursorCharacter?: string | React.ReactNode;
    cursorBlinkDuration?: number;
    cursorClassName?: string;
    text: string; 
    as?: ElementType;
    typingSpeed?: number;
    initialDelay?: number;
    pauseDuration?: number;
    deletingSpeed?: number;
    onComplete?: () => void; 
}

const TextType = ({
    text,
    as: Component = 'span', 
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    className = '',
    showCursor = true,
    hideCursorWhileTyping = false,
    cursorCharacter = '|',
    cursorClassName = '',
    cursorBlinkDuration = 0.5,
    onComplete, 
    ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    const fullText = useMemo(() => text, [text]);


    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.set(cursorRef.current, { opacity: 1 });
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        }
        setDisplayedText('');
        setCurrentCharIndex(0);
    }, [showCursor, cursorBlinkDuration, fullText]);


    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const executeTypingAnimation = () => {
            if (currentCharIndex < fullText.length) {
                timeout = setTimeout(
                    () => {
                        setDisplayedText(prev => prev + fullText[currentCharIndex]);
                        setCurrentCharIndex(prev => prev + 1);
                    },
                    typingSpeed 
                );
            } else {
                if (onComplete) {
                    onComplete(); 
                }
            }
        };

        if (currentCharIndex === 0 && displayedText === '') {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }

        return () => clearTimeout(timeout);
    }, [
        currentCharIndex,
        displayedText,
        typingSpeed,
        fullText,
        initialDelay,
        onComplete
    ]);

    const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < fullText.length);

    return createElement(
        Component,
        {
            ref: containerRef,
            className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
            ...props
        },
        <span className="inline">
            {displayedText}
        </span>,
        showCursor && (
            <span
                ref={cursorRef}
                className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
            >
                {cursorCharacter}
            </span>
        )
    );
};

export default TextType;