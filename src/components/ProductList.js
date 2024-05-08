import React from "react";
import { Table} from 'antd';

function ProductList({ data }) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ]

  console.log("Data",data)
  
 
  return (
    <Table columns={columns} dataSource={data} />
  );
}

export default ProductList;
