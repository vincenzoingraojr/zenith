import { useState } from "react";

export function useNavOptions() {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const closeOptions = () => {
        setShowOptions(false);
    };
  
    return { showOptions, toggleOptions, closeOptions };
}

export function useMenu() {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        setShowMenu(true);
    }

    const closeMenu = () => {
        setShowMenu(false);
    }

    return { showMenu, openMenu, closeMenu };
}

export function useOptions() {
    const [activeOptions, setActiveOptions] = useState<number | null>(
        null
    );

    const handleOptionsClick = (index: number) => {
        setActiveOptions(activeOptions === index ? null : index);
    };

    return { activeOptions, handleOptionsClick };
}