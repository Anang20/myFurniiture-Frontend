import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
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

  const Permintaan = () => {

    const [permintaan, setPermintaan] = useState([{
      tanggal : '',
      nama_lengkap : '',
      nama_produk: '',
      kuantiti: 0,
    }]);

    const getPermintaan = async () => {
        const res = await axios.get(`${appConfig.apiUrl}/request`);
        const result = res.data.data;
        console.log(result);
        setPermintaan(result);
    }
    useEffect(() => {
        getPermintaan()
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
        width: 5,
        // ...getColumnSearchProps('nama_produk'),
      },
      {
        title: 'Tanggal',
        dataIndex: 'tanggal',
        value: 'tanggal',
        width: 30,
        // ...getColumnSearchProps('tanggal'),
        // sorter: (a, b) => a.tanggal.length - b.tanggal.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Nama',
        dataIndex: 'nama_lengkap',
        value: 'nama_lengkap',
        width: 50,
        // ...getColumnSearchProps('nama_lengkap'),
      },
      {
        title: 'Produk',
        dataIndex: 'nama_produk',
        value: 'nama_produk',
        width: 50,
        // ...getColumnSearchProps('nama_produk'),
      },
      {
        title: 'kuantiti',
        dataIndex: 'kuantiti',
        value: 'kuantiti',
        width: 20,
        // sorter: (a, b) => a.kuantiti.length - b.kuantiti.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Action',
        key: 'operation',
        width: 30,
        render: () => (
          <>
          <button className="btn btn-sm btn-success shadow-sm me-3">Sudah Jadi</button>
          </>
        ),
      },
    ];

    useAuthenticatedPage()
    
    return ( 
      <>
      <Head>
        <title>MyFuniture | Permintaan</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
       <div id="wrapper" style={{ width: 1140 }}>
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <NavbarAdmin/>
                  <div className="container-fluid">
                      <h4 className="text-gray-600">Daftar Permintaan</h4>
                      <div className="card shadow">
                          <div className="card-body">
                            <Link href="/dashboard/permintaan/tambah_permintaan">
                              <button className="btn btn-sm shadow-sm btn-success mb-3"><FontAwesomeIcon icon={faPlus}/>Tambah Permintaan</button>
                            </Link>
                          <Table
                          columns={columns}
                          dataSource={permintaan}
                          scroll={{
                            x: 1500,
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
  
  export default Permintaan;
