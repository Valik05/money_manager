import React, { createContext, TouchEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type NavigationContextType = {
    showNavigation: boolean,
    setShowNavigation: (dates: boolean) => void,
    handleTouchStart: (e: TouchEvent) => void,
    handleTouchMove: (e: TouchEvent) => void,
    handleTouchEnd: (nav_items: string[]) => void,
};

type Props = { children: React.ReactNode };

const NavigationContext = createContext<NavigationContextType>({} as NavigationContextType);

export const NavigationProvider = ({ children }: Props) => {
    const [showNavigation, setShowNavigation] = useState(false);
    const navigate = useNavigate();
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndX = useRef(0);
    const touchEndY = useRef(0);
    const { nav } = useParams();
    const handleTouchStart = (e: TouchEvent) => {
        touchStartX.current = 0;
        touchStartY.current = 0;
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    }
    const handleTouchMove = (e: TouchEvent) => {
        touchEndX.current = 0;
        touchEndY.current = 0;
        touchEndX.current = e.touches[0].clientX;
        touchEndY.current = e.touches[0].clientY;
    }
    const handleTouchEnd = (nav_items: string[]) => {
        if (touchEndX.current === 0 || touchStartX.current === 0 || touchEndY.current === 0 || touchStartY.current === 0) {
            return
        } else if (touchStartY.current - touchEndY.current < -100) {
            // console.log('top', touchStartY.current, touchEndY.current, touchStartY.current - touchEndY.current);
            if (nav_items.findIndex(item => item === nav) > 0) {
                navigate(new URL(".", window.origin + location.pathname).pathname + nav_items[nav_items.findIndex(item => item === nav) - 1])
            }
        } else if (touchStartY.current - touchEndY.current > 100) {
            // console.log('down', touchStartY.current, touchEndY.current, touchStartY.current - touchEndY.current);
            if (nav_items.findIndex(item => item === nav) < nav_items.length - 1) {
                navigate(new URL(".", window.origin + location.pathname).pathname + nav_items[nav_items.findIndex(item => item === nav) + 1])
            }
        } else if (window.innerWidth < 905) {
            if (touchStartX.current - touchEndX.current < -100) {
                // console.log('right', touchStartX.current, touchEndX.current, touchStartX.current - touchEndX.current);
                if (!showNavigation) setShowNavigation(true);
            } else if (touchStartX.current - touchEndX.current > 100) {
                // console.log('left', touchStartX.current, touchEndX.current, touchStartX.current - touchEndX.current);
                if (showNavigation) setShowNavigation(false);
            }
        }
        touchStartX.current = 0;
        touchStartY.current = 0;
        touchEndX.current = 0;
        touchEndY.current = 0;
    }
    return (
        <NavigationContext.Provider
            value={{ showNavigation, setShowNavigation, handleTouchStart, handleTouchMove, handleTouchEnd }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => React.useContext(NavigationContext);