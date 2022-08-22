import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Image, message } from 'antd';
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
import useAuthenticatedPage from "../../../helper/useAuthenticatedPage";

  const Produk = () => {

    const router = useRouter()
    const { id } = router.query

    const [idUser, setIdUser] = useState('');
    const [detailProduk, setDetailProduk] = useState();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const getProduk = async () => {
        const dataProduk = await axios.get(`${appConfig.apiUrl}/produk/get/all`);
        const produk = dataProduk.data.data;
        console.log(produk, 'ini produk');
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

    const handlerOk = async () => {
      const apiDelete = `http://localhost:3222/produk/${idUser}`
              const response = await axios.delete(apiDelete)
              console.log(response)
              // if(response.data.status == 200) {
                message.success('Produk Berhasil Dihapus')
                router.reload('/dashboard/produk')
              // }else{
              //   router.reload('/dashboard/produk')
              // }
    }

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
        value: 'no',
        width: 10,
        // ...getColumnSearchProps('nama_produk'),
      },
      {
        title: 'Nama Produk',
        dataIndex: 'nama_produk',
        value: 'nama_produk',
        width: 36,
        // ...getColumnSearchProps('nama_produk'),  
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
        width: 20,
      },
      {
        title: 'Harga',
        dataIndex: 'harga',
        value: 'harga',
        width: 18,
        // sorter: (a, b) => a.harga.length - b.harga.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Stok',
        dataIndex: 'stok',
        value: 'stok',
        width: 15,
        // sorter: (a, b) => a.stok.length - b.stok.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'deskripsi',
        dataIndex: 'deskripsi',
        value: 'deskripsi',
        width: 55,
        // ...getColumnSearchProps('deskripsi'),
      },
      {
        title: 'Action',
        key: 'operation',
        width: 30,
        fixed: 'right',
        render: (_, record) => (
          <>
          <Link href={`/dashboard/produk/edit_produk/${record.id}`}>
            <button className="btn btn-sm btn-success shadow-sm me-3">Edit</button>
          </Link>
          <button type="button" onClick={() => setIdUser(record.id)} className="btn btn-sm shadow-sm btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Hapus</button>
          </>
        ),
      },
    ];

    useAuthenticatedPage()
    
    return ( 
      <>
      <Head>
        <title>MyFuniture | Produk</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
       <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <NavbarAdmin/>
                  <div className="container-fluid" style={{ paddingLeft: 250, marginTop: 90 }}>
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
                          }}
                          />
                          </div>
                          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">Hapus Produk Ini</h5>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  Apakah Anda Yakin Untuk Menghapus Produk Ini? 
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn btn-sm shadow-sm btn-secondary" data-bs-dismiss="modal">Batal</button>
                                  <button type="button" onClick={handlerOk} className="btn btn-sm shadow-sm" style={{ color: "#FFF", backgroundColor: "#00B8B0" }}>Hapus</button>
                                </div>
                              </div>
                            </div>
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
