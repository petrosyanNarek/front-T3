import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Col, Row, Table } from 'antd';
import { User } from '../../App';

interface DataTableProps {
    users: User[];
}
const columns: ColumnsType<User> = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: 'Search count',
        key: 'searchCount',
        dataIndex: 'searchCount'
    }
];

const DataTable: React.FC<DataTableProps> = ({ users }) => (
    <Row justify="center" align="middle">
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <Table columns={columns} dataSource={users} pagination={{ pageSize: 2, hideOnSinglePage: true }} />
        </Col>
    </Row>
)

export default DataTable;
