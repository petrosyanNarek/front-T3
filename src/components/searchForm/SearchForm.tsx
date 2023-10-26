import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { MailOutlined, NumberOutlined, SearchOutlined } from '@ant-design/icons';
import './SearchForm.scss';
import { User } from '../../App';
import { http } from '../../config/axiosInstance';

export interface SearchParams {
    email: string;
    number?: string
}

interface SearchFormProps {
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const searchUser = async (searchParams: SearchParams) => await http.post('/search', searchParams)

const SearchForm: React.FC<SearchFormProps> = ({ setUsers }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const onFinish = (values: SearchParams) => {
        setLoading(true);
        searchUser(values)
            .then((response) => {
                setUsers((prev) => {
                    const user = prev.find(user => user.email === response.data.email);
                    if (user) {
                        return prev.map(item => {
                            if (user.email === item.email) {
                                user.searchCount++
                            }
                            return item
                        })
                    } else {
                        return [...prev, { ...response.data, searchCount: 1, key: Date.now() }]
                    }
                });
                api.success({
                    message: "Success",
                    placement: "topRight",
                });
                form.resetFields();
            })
            .catch(({ response }) => {
                api.error({
                    message: response.data.message || 'Server error',
                    placement: "topRight",
                });
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <Row justify="center" align="middle" className="login-form-container">
            {contextHolder}
            <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                <Form
                    name="loginForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Invalid email format',
                            },
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        name="number"
                        label="Number"
                        extra="ex: XX-XX-XX"
                        rules={[
                            {
                                pattern: /^\d{2}-\d{2}-\d{2}$/,
                                message: 'Invalid number format (should be in XX-XX-XX format)',
                            },
                        ]}
                    >
                        <Input prefix={<NumberOutlined />} placeholder="Number" disabled={loading} />
                    </Form.Item>

                    <Form.Item>
                        <Row justify="center">
                            <Col>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SearchOutlined />}
                                    loading={loading}
                                >
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default SearchForm;
