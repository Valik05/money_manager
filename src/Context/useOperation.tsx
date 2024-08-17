import { useAuth } from "./useAuth";
import { FieldValues } from "react-hook-form";
import { createOperationAPI, getOperationsAPI } from "../Services/OperationService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import ContentLoader from "../Components/UI/ContentLoader/ContentLoader";
import { Operation } from "../Models/Operations";
import { useSystemMsg } from "./useSystemMsg";

type OperationContext = {
    operations: Operation[] | [],
    isAddingOperation: boolean,
    getOperation: () => void,
    createOperation: (dates: FieldValues) => void,
    handleOperation: () => void
}

const OperationsContext = createContext<OperationContext>({} as OperationContext);

type Props = { children: React.ReactNode };

export const OperationProvider = ({ children }: Props) => {
    const { logout, user, getUser } = useAuth();
    const { showSystemMsg } = useSystemMsg();
    const [isAddingOperation, setIsAddingOperation] = useState<boolean>(false);
    const [operations, setOperations] = useState<Operation[] | []>([]);
    const [isReady, setIsReady] = useState<boolean>(false);

    const getOperation = useCallback(async () => {
        await getOperationsAPI()
            .then((res) => {
                if (res) {
                    // console.log(res);
                    setOperations(res);
                    if (user) localStorage.setItem('currency', JSON.stringify(user?.currency))
                }
            })
            .catch((error) => {
                logout()
                // console.log(error);
                if (typeof error === 'string') return showSystemMsg({ type: 'error', text: error })
            })
            .finally(() => {
                setIsReady(true)
            })
    }, [])

    useEffect(() => {
        getOperation()
    }, [getOperation])

    const createOperation = async (dates: FieldValues) => {
        setIsReady(false)
        await createOperationAPI({ ...dates, "currency": user?.currency.id })
            .then((res) => {
                if (res) {
                    handleOperation()
                    showSystemMsg({ type: "success", text: "Operation succesfully created" })
                    setOperations(prevOperations => [...prevOperations, res])
                    getOperation()
                    getUser();
                }
            })
            .catch((error) => {
                // console.log(error);
                if (typeof error === 'string') return showSystemMsg({ type: 'error', text: error })
            })
            .finally(() => {
                setIsReady(true)
            })
    };

    const handleOperation = () => setIsAddingOperation(!isAddingOperation);

    return (
        <OperationsContext.Provider value={{ operations, isAddingOperation, createOperation, handleOperation, getOperation }} >
            {isReady ? children : <ContentLoader />}
        </OperationsContext.Provider>
    )
};

export const useOperation = () => useContext(OperationsContext);

