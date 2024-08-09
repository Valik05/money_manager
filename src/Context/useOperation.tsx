import { createContext, useContext, useEffect, useState } from "react";
import ContentLoader from "../Components/UI/ContentLoader/ContentLoader";
import { createOperationAPI, getOperationsAPI } from "../Services/OperationService";
import { useAuth } from "./useAuth";
import { FieldValues } from "react-hook-form";

type OperationContext = {
    operations: [] | null,
    isAddingOperation: boolean,
    createOperation: (dates: FieldValues) => void,
    handleOperation: () => void
}

const OperationsContext = createContext<OperationContext>({} as OperationContext);

type Props = { children: React.ReactNode };

export const OperationProvider = ({ children }: Props) => {
    const { logout } = useAuth();
    const [isAddingOperation, setIsAddingOperation] = useState<boolean>(false);
    const [operations, setOperations] = useState<[]>([]);
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        getOperationsAPI()
            .then((res) => {
                if (res) {
                    console.log(res);
                    setIsReady(true)
                }
            })
            .catch((error) => {
                logout()
                console.log(error);
            })
    }, [])

    const createOperation = async (dates: FieldValues) => {
        await createOperationAPI(dates)
            .then((res) => {
                if (res) {
                    console.log(res);
                    setOperations(prevOperations => [...prevOperations, res])
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleOperation = () => setIsAddingOperation(!isAddingOperation);

    return (
        <OperationsContext.Provider value={{ operations, isAddingOperation, createOperation, handleOperation }} >
            {isReady ? children : <ContentLoader />}
        </OperationsContext.Provider>
    )
};

export const useOperation = () => useContext(OperationsContext);

