import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Image } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import appConfig from "../../../config/app";
import { Router, useRouter } from "next/router";

  const Produk = () => {

    const router = useRouter()
    const { id } = router.query
    
    const [detailProduk, setDetailProduk] = useState();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const getProduk = async () => {
        const dataProduk = await axios.get(`${appConfig.apiUrl}/produk`);
        const produk = dataProduk.data.items;
        setDetailProduk(produk);
    }
    useEffect(() => {
        getProduk()
    }, []);

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
        title: 'no',
        dataIndex: 'nomor',
        value: 'no',
        width: 10,
      },
      {
        title: 'Nama Produk',
        dataIndex: 'nama_produk',
        value: 'nama_produk',
        width: 50,
        ...getColumnSearchProps('nama_produk'),
      },
      {
        title: 'Gambar',
        render : (index, record) => {
          return (
            <div>
              <Image src={`${appConfig.apiUrl}/file/${record.gambar}`} alt="image not found" width={84} height={84}/>
            </div>
          )
        },
        width: 30,
      },
      {
        title: 'Harga',
        dataIndex: 'harga',
        value: 'harga',
        width: 20,
        sorter: (a, b) => a.harga.length - b.harga.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'deskripsi',
        dataIndex: 'deskripsi',
        value: 'deskripsi',
        width: 50,
        ...getColumnSearchProps('deskripsi'),
      },
      {
        title: 'Stok',
        dataIndex: 'stok',
        value: 'stok',
        width: 20,
        sorter: (a, b) => a.stok.length - b.stok.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Action',
        key: 'operation',
        width: 30,
        fixed: 'right',
        render: (_, record) => (
          <>
          <Link href={`/dashboard/produk/edit_produk/${record.id_produk}`}>
            <button className="btn btn-sm btn-success shadow-sm me-3">Edit</button>
          </Link>
            <button onClick={
              async () => {
                const endDelete = `http://localhost:3222/produk/${record.id_produk}`
                const response = await axios.delete(endDelete)
                router.reload()
                if(response.data.statusCode === 200) {
                  alert(record.nama_produk + " dihapus")
                } else {
                  alert("ada kesalahan")
                }
              }
            } className="btn btn-sm btn-danger shadow-sm">Hapus</button>
          </>
        ),
      },
    ];
    
    return ( 
      <>
      <Head>
        <title>MyFuniture | Produk</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
       <div id="wrapper" style={{ maxWidth: 1125 }}>
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <NavbarAdmin/>
                  <div className="container-fluid">
                      <h4 className="text-gray-600">Data Produk</h4>
                      <div className="card shadow">
                          <div className="card-body">
                            <Link href="/dashboard/produk/tambah_produk">
                              <button className="btn btn-sm shadow-sm btn-success mb-3"><FontAwesomeIcon icon={faPlus}/>Tambah Produk</button>
                            </Link>
                          <Table
                          columns={columns}
                          dataSource={detailProduk}
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
  
  export default Produk ;
