import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import Head from "next/head";
import { Image } from 'antd';
import axios from "axios";
import appConfig from "../../../config/app";

  const App = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [payment, getPayment]= useState('')
    const searchInput = useRef(null);
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    
    useEffect(()=>{
    const Data = async () =>{
      const res = await axios.get(`${appConfig.apiUrl}/payment`)
      const data = res.data.data
      console.log(data);
      getPayment(data)
    }
    Data()
},[])
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
  
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
  
    const columns = [
      {
        title: 'No',
        dataIndex: 'No',
        key: 'no',
        width: 15,
      },
      {
        title: 'Nama Customer',
        dataIndex: 'NamaCustomer',
        key: 'nama_lengkap',
        width: 50,
        // sorter: (a, b) => a.nama_lengkap.length - b.nama_lengkap.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Nama Bank',
        dataIndex: 'NamaBank',
        key: 'nama_bank',
        width: 40,
        // ...getColumnSearchProps('nama_lengkap'),
      },
      {
        title: 'No Rek',
        dataIndex: 'NoRek',
        key: 'no_rekening',
        width: 50,
        // ...getColumnSearchProps('no_rekening'),
      },
      {
        title: 'Bukti',
        dataIndex: 'Bukti',
        key: 'gambar_bukti',
        width: 50,
        render: () => { 
          return (
           <div>
            <Image 
            width={100} 
            src={`${appConfig.apiUrl}/file/${payment[0].Bukti}`}
            alt={"image not found"}/>
           </div>
          )
        },
      },
      {
        title: 'Status',
        dataIndex: 'Status',
        key: 'status',
        width: 50,
        render: () => {
          return (
            <span className='badge badge-pill badge-primary' style={{ backgroundColor: '#0D6EFD', }}>{payment[0].Status}</span>
          )
        },
      },
      {
        title: 'Aksi',
        key: 'operation',
        width: 40,
        fixed: 'right',
        render: () => (
          <>
          <button className="btn btn-sm btn-danger shadow-sm me-3">Tolak</button>
          <button className="btn btn-sm btn-warning shadow-sm">Terima</button>
          </>
        ),
      },
    ];

    const data = [
      {
        no: 1,
        nama_lengkap: "Anang Syah Amirul Haqim",
        nama_bank: "BCA",
        no_rekening: "9040-030560-49596",
        gambar_bukti: "https://gotra.sgp1.cdn.digitaloceanspaces.com/web-upload/1527432881_27-05-2018_photo6077615961109801020.jpg",
      },
      {
        no: 2,
        nama_lengkap: "Fernanda Iqshal",
        nama_bank: "BCA",
        no_rekening: "9040-030560-49596",
        gambar_bukti: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        no: 3,
        nama_lengkap: "Anang Syah Amirul Haqim",
        nama_bank: "BCA",
        no_rekening: "9040-030560-49596",
        gambar_bukti: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        no: 4,
        nama_lengkap: "Anang Syah Amirul Haqim",
        nama_bank: "BCA",
        no_rekening: "9040-030560-49596",
        gambar_bukti: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        no: 5,
        nama_lengkap: "Anang Syah Amirul Haqim",
        nama_bank: "BCA",
        no_rekening: "9040-030560-49596",
        gambar_bukti: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
    ]

    return ( 
      <>
      <Head>
        <title>MyFuniture | Terima Pembayaran</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
       <div id="wrapper" >
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <NavbarAdmin/>
                  <div className="container-fluid">
                      <h4 className="text-gray-600">Terima Pembayaran</h4>
                      <div className="card shadow">
                          <div className="card-body">
                          <Table
                          columns={columns}
                          dataSource={payment}
                          scroll={{
                            x: 1500,
                            y: 300,
                          }}
                          />
                          </div>
                      </div>  
                  </div>
                </div>
            </div>
        </div>
      </>
    )
  };
  
  export default App ;
