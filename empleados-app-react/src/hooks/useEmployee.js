import { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { message } from 'antd';
import useLoading from './useLoading';
import {
    CREATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    GET_EMPLOYEE,
    GET_EMPLOYEES,
    PROGRAMMING_LANGUAGES
} from '../gragphql/Employees';
import { paginator } from '../config/Constants'

const useEmployee = () => {

    const client = useApolloClient();

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const [registerPages, setRegisterPages] = useState(paginator);
    const [meta, setMeta] = useState({ employees: [], employee: {}, readonly: false });

    const handleData = (param) => setData((_data) => ({ ..._data, ...param }));
    const handleMeta = (param) => setMeta((_data) => ({ ..._data, ...param }));

    const handleCancel = () => {
        setVisible(false);
        handleMeta({ employee: undefined });
    };

    const { loading, onStart, onEnd } = useLoading({ defaultValue: false });

    const handleRegisters = ({ employees }) => {
        const { data: dataEmployees, paginatorInfo } = employees || {};

        setRegisterPages({ ...registerPages, total: paginatorInfo.total });
        handleMeta({ employees: dataEmployees });
        onEnd();
    }

    const { loading: loadingEmployee , refetch } = useQuery(GET_EMPLOYEES,
        {
            variables:
                { name: "%%", first: registerPages.pageSize, page: registerPages.current },
            fetchPolicy: "network-only",
            onCompleted: handleRegisters,
            notifyOnNetworkStatusChange:true
        })

    const { loading: loadingLanguaje } = useQuery(PROGRAMMING_LANGUAGES, {
        fetchPolicy: "network-only",
        onCompleted: ({ programmingLanguages }) => handleData({ programmingLanguages })
    });

    const handleRegistersTable = (pagination) => {
        onStart();
        setRegisterPages(pagination);
    };

    const handleForm = ({ ...rest }, readonly) => {
        setVisible(true);
        console.log("rest", rest);
        handleMeta({ employee: rest, readonly });
    };
    const handleEdit = async (values) => {
        try {
            onStart();
            const { updateEmployee } = (await client.mutate({
                mutation: UPDATE_EMPLOYEE,
                variables: {
                    id: values.id,
                    input: {
                        ...values,
                        id: undefined
                    }
                }
            })).data;
            if(updateEmployee && updateEmployee.id) {
                message.success("Empleado Actualizado con éxito");
                setVisible(false);
                refetch();
            }
        } catch (error) {
            message.error("error al editar el empleado");
        } finally {
            onEnd();
        }
    };
    const handleCreate = async (values) => {
        try {
            onStart();
        } catch (error) {
            message.error("error al crear el empleado");
        } finally {
            onEnd();
        }
    };
    const handleDelete = async (values) => {
        message.success('Click on Yes');
        try {
            onStart();
        } catch (error) {
            message.error("error al eliminar el empleado");
        } finally {
            onEnd();
        }
    };
    const handleSubmit = (values) => {
        if (!meta.readonly)
            if (values.id) {
                handleEdit(values);
            } else {
                handleCreate(values);
            } else {
            setVisible(false)
            return;
        }
    };


    return {
        visible,
        data,
        meta,
        loading: loading || loadingEmployee || loadingLanguaje,
        onStart,
        onEnd,
        registerPages,
        handleData,
        handleForm,
        handleEdit,
        handleCreate,
        handleDelete,
        handleSubmit,
        handleRegistersTable,
        handleCancel
    };
};

export default useEmployee;