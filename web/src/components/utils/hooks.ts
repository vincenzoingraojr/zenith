import { useState } from "react";

export function useNavOptions() {
    const [showOptions, setShowOptions] = useState(false);
    const toggleOptions = () => setShowOptions(!showOptions);
    const closeOptions = () => setShowOptions(false);
  
    return { showOptions, toggleOptions, closeOptions };
}