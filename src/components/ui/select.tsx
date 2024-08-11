"use client"

import { ReactNode, useCallback, useState } from "react"

interface SelectProps<T> {
    value: T | null | any
    setValue: (value: T) => void
    children: { node: React.ReactElement, value: T }[]
    label: string | ReactNode
}

export default function SelectMenu<T>({ value, setValue, children, label }: SelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false)

    const handleButtonClick = useCallback(() => {
        setIsOpen((prevOpen) => !prevOpen);
    }, [])
    const selectHandler = useCallback((value: T) => {
        setValue(value);
        setIsOpen(false);
    }, [])

    return (
        <div className="relative z-50 w-full min-w-32">
            <button onClick={handleButtonClick} className="py-1 px-5 rounded-lg border-2 border-white transition-all border-opacity-30 h-10 w-full bg-slate-500 bg-opacity-20 backdrop-blur-sm hover:border-sky-600 ">
                {value === null ? label : children.filter(g => g.value === value)[0].node}
            </button>
            {isOpen && (
                <div className="fade-in-10 absolute top-11 w-full rounded-md flex flex-col border-2 border-white border-opacity-20 bg-slate-500 bg-opacity-20 backdrop-blur-sm p-[1px]">
                    {children.map((child, index) => (
                        <button key={`sl-m-${index}`} className="w-full rounded-sm hover:bg-black hover:bg-opacity-40 p-2" onClick={() => selectHandler(child.value)}>{child.node}</button>
                    ))}
                </div>
            )}
        </div>
    )
}