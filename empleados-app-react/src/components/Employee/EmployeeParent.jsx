import React from 'react';
import { useEmployee } from '../../hooks';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';

const EmployeeParent = () => {

    const {
        data,
        meta,
        loading,
        registerPages,
        visible,
        handleForm,
        handleDelete,
        handleSubmit,
        handleRegistersTable,
        handleCancel
    } = useEmployee();

    const {employee,employees,readonly}= meta || {};

    return (
        <div>
            <EmployeeList
                employees={employees}
                registerPages={registerPages}
                loading={loading}
                handleView={handleForm}
                handleEdit={handleForm}
                handleDelete={handleDelete}
                handleRegistersTable={handleRegistersTable}
            />

            <EmployeeForm
                data={data}
                visible={visible}
                handleCancel={handleCancel}
                employee={employee}
                readonly={readonly}
                handleSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    )

};

export default EmployeeParent;