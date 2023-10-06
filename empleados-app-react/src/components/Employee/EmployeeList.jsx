import { Table, Row, Col, Button, Tooltip, Popconfirm, Tag } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react'

const EmployeeList = ({
    employees,
    registerPages,
    handleView,
    handleEdit,
    handleDelete,
    loading,
    handleRegistersTable
}) => {

    const columns = [
        {
            title: 'Nombres y Apellidos',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Numero de documento',
            dataIndex: 'document',
            key: 'document',
        },
        {
            title: 'Fecha de ingreso',
            dataIndex: 'dateEntry',
            key: 'dateEntry',
        },
        {
            title: 'Lenguajes',
            dataIndex: 'programmingLanguages',
            key: 'programmingLanguages',
            render: (_, { programmingLanguages }) => (
                programmingLanguages.map(({ name }, index) => (
                    <Tag color="blue" key={index}>
                        {name}
                    </Tag>
                )))
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Acciones',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Row gutter={8}>
                    <Col>
                        <Tooltip title="Ver empleado">
                            <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => handleView(record, true)} />
                        </Tooltip>
                    </Col>
                    <Col>
                        <Tooltip title="Editar empleado">
                            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record, false)} />
                        </Tooltip>
                    </Col>
                    <Col>
                        <Tooltip title="Eliminar empleado">
                            <Popconfirm
                                title="Eliminar Empleado"
                                description="¿Está seguro que desea eliminar este empleado?"
                                onConfirm={() => handleDelete(record)}
                                okText="Si"
                                cancelText="No"
                            >
                                <Button type="default" danger shape="circle" icon={<DeleteOutlined />} />
                            </Popconfirm>

                        </Tooltip>
                    </Col>
                </Row>
            )
        },
    ];

    return (
        <Table
            rowKey="id"
            dataSource={employees || []}
            columns={columns}
            loading={loading}
            onChange={handleRegistersTable}
            pagination={{ ...registerPages, showSizeChanger: true }}
        />
    );
};

export default EmployeeList;