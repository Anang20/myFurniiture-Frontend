import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";
import axios from "axios";
import appConfig from "../../../config/app";
import Link from "next/link";

  const App = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [detailOrder, setDetailOrder] = useState([]);
    const [dataExport, setDataExport] = useState('')
    const searchInput = useRef(null);

    useEffect(() => {
      const getDataOrder = async () => {
        const response = await axios.get(`${appConfig.apiUrl}/order/cari_laporan`);
        const order = response.data.data;
        setDetailOrder(order);
      }
      getDataOrder()
    }, [])
    console.log(detailOrder);
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
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
        dataIndex: 'NomerOrder',
        key: 'NomerOrder',
        width: 20,
        // fixed: 'left',
      },
      {
        title: 'Tanggal',
        dataIndex: 'Tanggal',
        key: 'Tanggal',
        width: 30,
        // sorter: (a, b) => a.tanggal.length - b.tanggal.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Nama',
        dataIndex: 'Nama',
        key: 'Nama',
        width: 30,
        ...getColumnSearchProps('nama_lengkap'),
      },
      {
        title: 'Produk',
        dataIndex: 'Produk',
        key: 'Produk',
        width: 30,
        // ...getColumnSearchProps('nama_produk'),
      },
      {
        title: 'Kuantiti',
        dataIndex: 'Kuantiti',
        key: 'Kuantiti',
        width: 30,
        // sorter: (a, b) => a.quantity.length - b.quantity.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Harga Barang',
        dataIndex: 'HargaBarang',
        key: 'HargaBarang',
        width: 30,
        // sorter: (a, b) => a.harga_barang.length - b.harga_barang.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Harga Kirim',
        dataIndex: 'Alamat',
        key: 'Alamat',
        width: 30,
        // sorter: (a, b) => a.harga_kirim.length - b.harga_kirim.length,
        // sortDirections: ['descend', 'ascend'],
      },
    ];

    useAuthenticatedPage()

    return ( 
      <>
      <Head>
        <title>MyFuniture | Laporan Transaksi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
       <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <NavbarAdmin/>
                  <div className="container-fluid" style={{ paddingLeft: 250, height: 500, marginTop: 90 }}>
                      <h4 className="text-gray-600">Laporan Transaksi</h4>
                      <div className="card shadow">
                          <div className="card-body">
                              <button className="btn btn-sm shadow-sm btn-danger mb-3 me-3" onClick={() => window.print()}><FontAwesomeIcon icon={faFilePdf} className="mr-3"/>Export PDF</button>
                              <Link href={`${appConfig.apiUrl}/order/export/excel-generator`}>
                                <button className="btn btn-sm shadow-sm btn-success mb-3"><FontAwesomeIcon icon={faFilePdf} className="mr-3"/>Export Excel</button>
                              </Link>
                          <Table
                          columns={columns}
                          dataSource={detailOrder}
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