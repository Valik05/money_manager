import React, { useEffect } from "react"

type props = [React.MutableRefObject<HTMLElement | undefined>, () => void, boolean]

const useOutlineClick = (...[ref, fn, isFnNeedToCall]: props) => {
    useEffect(() => {
        if (!isFnNeedToCall) return
        const onClick: (this: Document, ev: MouseEvent) => void = (e) => ref?.current && !ref.current.contains(e.target as HTMLElement) && fn()
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [fn, ref, isFnNeedToCall]);
};

export default useOutlineClick;