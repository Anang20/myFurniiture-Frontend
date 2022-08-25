import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";
import appConfig from "../../../config/app";
import { useRouter } from "next/router";

  const Order = () => {

    const [detailProduk, setDetailProduk] = useState([{
      No : 1,
      Tanggal: "",
      Nama: "",
      Produk: "",
      Kuantiti: 1,
      HargaBarang: 0,
      totalHarga: 0,
      Alamat: "",
      status:''
  }]);
  const router = useRouter();

    const getProduk = async () => {
        const dataProduk = await axios.get("http://localhost:3222/order");
        const produk = dataProduk.data.data;
        console.log(produk);
        setDetailProduk(produk);
    }
    useEffect(() => {
        getProduk()
    }, []);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
  
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
        dataIndex: 'No',
        value: 'No',
        width: 8,
        // fixed: 'left',
        // sorter: (a, b) => a.no.length - b.no.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Tanggal',
        dataIndex: 'Tanggal',
        value: 'created_at',
        width: 20,
        // fixed: 'left',
        // ...getColumnSearchProps('tanggal'),
      },
      {
        title: 'No Order',
        dataIndex: 'NomerOrder',
        value: 'total_order',
        width: 20,
        ...getColumnSearchProps('NomerOrder'),
      },
      {
        title: 'No Telp',
        dataIndex: 'noTelp',
        value: 'noTelp',
        width: 25,
        // fixed: 'left'
        // ...getColumnSearchProps('nama'),
      },
      {
        title: 'Nama',
        dataIndex: 'Nama',
        value: 'nama_lengkap',
        width: 25,
        // fixed: 'left'
        // ...getColumnSearchProps('nama'),
      },
      {
        title: 'Produk',
        dataIndex: 'Produk',
        value: 'nama_produk',
        width: 20,
        // sorter: (a, b) => a.nama_produk.length - b.nama_produk.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Kuantiti',
        dataIndex: 'Kuantiti',
        value: 'quantity',
        width: 15,
        fixed: 'center'
        // ...getColumnSearchProps('quantity'),
      },
      {
        title: 'Harga Barang',
        dataIndex: 'HargaBarang',
        value: 'harga_barang',
        width: 20,
      },
      
      {
        title: 'Alamat',
        dataIndex: 'Alamat',
        value: 'alamat',
        width: 30,
        // sorter: (a, b) => a.alamat.length - b.alamat.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Status',
        dataIndex: 'status',
        // value: 'Status',
        width: 18,
        // render: () => (
        //     <>
        //     <span className='badge badge-pill badge-primary' style={{ backgroundColor: '#0D6EFD', }}>Sudah Bayar</span>
        //     </>
        // ),
        sorter: (a, b) => a.status.length - b.status.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Action',
        key: 'operation',
        width: 20,
        render: (_, record) => (
          <>
          <button className="btn btn-sm btn-success shadow-sm me-3" onClick={
            async () => {
              const endpoint = `${appConfig.apiUrl}/order/terima/${record.id}`
              const res = await axios.put(endpoint)
              console.log(res.data);
              if (res.data.statusCode === 200) {
                message.success("Barang Berhasil Dikirim")
                router.reload('/dashboard/order')
              } else {
                router.reload('/dashboard/order')
                message.success("Barang Berhasil Dikirim")
              }
            }
          }>Kirim Barang</button>
          </>
        ),
      },
    ];

    useAuthenticatedPage()
    
    return ( 
      <>
      <Head>
        <title>MyFuniture | Order</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
       <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <NavbarAdmin/>
                  <div className="container-fluid" style={{ paddingLeft: 250, marginTop: 90 }}>
                      <h4 className="text-gray-600">Order</h4>
                      <div className="card shadow">
                          <div className="card-body">
                          <Table
                          columns={columns}
                          dataSource={detailProduk}
                          scroll={{
                            x: 1500,
                            // y: 300,
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
  
  export default Order ;
