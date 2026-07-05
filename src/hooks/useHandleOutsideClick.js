import { useEffect } from "react";

export function useHandleOutsideClick(ref, handler) {
    useEffect(() => {
        function listener(event) {
            if (
                !ref.current ||
                ref.current.contains(event.target)
            ) {
                return;
            }

            handler();
        }

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener(
                "mousedown",
                listener
            );
        };
    }, [ref, handler]);
}