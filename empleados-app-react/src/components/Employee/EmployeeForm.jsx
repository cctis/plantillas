import { Modal, Form, Row, Col, Input, Select } from 'antd';
import React, { useEffect } from 'react'
import { formMultiRowLayout } from '../../config/Constants';

const EmployeeForm = ({
    loading,
    data,
    visible,
    handleCancel,
    employee,
    readonly,
    handleSubmit
}) => {

    const [form] = Form.useForm();

    const { programmingLanguages } = data || {};

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                ...employee,
                programmingLanguages: (employee && employee.programmingLanguages || []).map((item) => (item.id))
            });
        }
    }, [visible]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            console.log("values", values);
            handleSubmit({
                ...values,
                id: employee && employee.id
            });
        });
    };


    return (
        <Modal title={readonly ? "Visualizar Empleado" : employee && employee.id ? "Editar Empleado" : "Crear Empleado"}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ loading }}
        >

            <Form form={form}>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            label="Tipo de documento"
                            name="documentTypeId"
                            rules={[{ required: true, message: 'Tipo de documento Requerido' }]}
                            {...formMultiRowLayout}
                        >
                            <Input disabled={readonly} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Número de documento"
                            name="document"
                            rules={[{ required: true, message: 'Número de documento Requerido' }]}
                            {...formMultiRowLayout}
                        >
                            <Input disabled={readonly} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Fecha de ingreso"
                            name="dateEntry"
                            rules={[{ required: true, message: 'Fecha de ingreso Requerido' }]}
                            {...formMultiRowLayout}
                        >
                            <Input disabled={readonly} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Nombre Empleado"
                            name="name"
                            rules={[{ required: true, message: 'Nombre Requerido' }]}
                            {...formMultiRowLayout}
                        >
                            <Input disabled={readonly} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Apellido Empleado"
                            name="surname"
                            rules={[{ required: true, message: 'Apellido Requerido' }]}
                            {...formMultiRowLayout}
                        >
                            <Input disabled={readonly} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Género Empleado"
                            name="gender"
                            rules={[{ required: true, message: 'Genero Requerido' }]}
                            {...formMultiRowLayout}
                        >
                            <Input disabled={readonly} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Lugar de Nacimiento Empleado"
                            name="birthPlace"
                            rules={[{ required: true, message: 'Lugar de Nacimiento Empleado Requerido' }]}
                            {...formMultiRowLayout}
                        >
                            <Input disabled={readonly} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Fecha de Nacimiento Empleado"
                            name="birthDate"
                            rules={[{ required: true, message: 'Lugar de Nacimiento Empleado Requerido' }]}
                            {...formMultiRowLayout}
                        >
                            <Input disabled={readonly} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Lenguaje de programación"
                            name="programmingLanguages"
                            rules={[{ required: true, message: 'Lenguaje de programación Requerido' }]}
                            {...formMultiRowLayout}
                        >
                            <Select disabled={readonly} mode='multiple'>
                                {(programmingLanguages || []).map((lenguajes) =>
                                (
                                    <Select.Option value={lenguajes.id} key={lenguajes.id}>{lenguajes.name}</Select.Option>
                                )
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </Modal>
    );
};

export default EmployeeForm;