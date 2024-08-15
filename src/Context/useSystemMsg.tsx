import { createContext, useContext, useEffect, useState } from "react";
import { SystemMsgObj, SystemMsgObjWithOutId } from "../Models/SystemMsg";

type SystemContextType = {
    messages: SystemMsgObj[] | [],
    showSystemMsg: (msg: SystemMsgObjWithOutId) => void,
    removeMsg: (id: number) => void,
    clearMsg: () => void
}

const SystemMsgContext = createContext<SystemContextType>({} as SystemContextType);

type Props = { children: React.ReactNode };

export const SystemMsgProvider = ({ children }: Props) => {
    const [messages, setMessages] = useState<SystemMsgObj[] | []>([]);
    const [queue, setQueue] = useState<SystemMsgObj[] | []>([]);
    const showSystemMsg = (msg: SystemMsgObjWithOutId) => {
        const msgWithId = { ...msg, id: Math.floor(Math.random() * 10000) }
        if (messages.length === 4) {
            setQueue(prevQueue => [...prevQueue, msgWithId])
        } else {
            setMessages(prevMessages => [...prevMessages, msgWithId].slice(0, 4))
        }
    }
    useEffect(() => {
        if (messages.length === 0 && queue.length !== 0) {
            setMessages(prevMsg => [...prevMsg, ...queue.slice(0, 4)])
            setQueue(prevQueue => [...prevQueue.slice(4)])
        }
    }, [messages, queue])

    const removeMsg = (id: number) => { setMessages(prevMessages => prevMessages.filter(item => item.id !== id)) }

    const clearMsg = () => { setMessages([]) }
    return (
        <SystemMsgContext.Provider value={{ messages, showSystemMsg, removeMsg, clearMsg }} >
            {children}
        </SystemMsgContext.Provider>
    )
};

export const useSystemMsg = () => useContext(SystemMsgContext);

