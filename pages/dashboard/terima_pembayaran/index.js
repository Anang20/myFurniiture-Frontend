import NavbarAdmin from "../../components/navbar_admin";
import SidebarAdmin from "../../components/sidebar_admin";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import Head from "next/head";
import { Image } from 'antd';
import axios from "axios";
import appConfig from "../../../config/app";
import { useRouter } from "next/router";

  const App = () => {
    const [id, setId] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [payment, getPayment]= useState('')
    const searchInput = useRef(null);
    const router = useRouter();
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    
    useEffect(()=>{
    const Data = async () =>{
      const res = await axios.get(`${appConfig.apiUrl}/payment`)
      const data = res.data.data
      // console.log(data);
      getPayment(data)
    }
    Data()
    },[])

    const handlerTolak = async () => {
      const endpoint = `${appConfig.apiUrl}/payment/delete/${id}`
      const res = await axios.delete(endpoint)
      console.log(res.data);
      if(res.data.statusCode === 200) {
        router.push('/dashboard')
        message.success("Pembayaran Berhasil Ditolak")
      }else{
        message.error("Ups ada suatu kesalahan")
      }
    }

    const handlerTerima = async () => {     
      const endpoint = `${appConfig.apiUrl}/payment/${id}`
      const res = await axios.put(endpoint)
      console.log(res.data);
      if(res.data.statusCode === 200) {
        router.push('/dashboard')
        message.success("Pembayaran Berhasil Diterima")
      }else{
          message.error("Ups ada suatu kesalahan")
      }
    }
  
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
        title: 'No Order',
        dataIndex: 'NoOrder',
        key: 'NoOrder',
        width: 30,
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
        width: 50,
        fixed: 'right',
        render: (_, record) => (
          <>
          <button className="btn btn-sm btn-primary shadow-sm me-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Detail</button>
          <button className="btn btn-sm btn-danger shadow-sm me-1" onClick={() => setId(record.id)} data-bs-toggle="modal" data-bs-target="#exampleModal2">Tolak</button>
          <button className="btn btn-sm btn-warning shadow-sm" onClick={() => setId(record.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Terima</button>
          </>
        ),
      },
    ];

    return ( 
      <>
      <Head>
        <title>MyFuniture | Terima Pembayaran</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
       <div id="wrapper">
            <SidebarAdmin/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <NavbarAdmin/>
                  <div className="container-fluid" style={{ paddingLeft: 250, marginTop: 90}}>
                      <h4 className="text-gray-600">Terima Pembayaran</h4>
                      <div className="card shadow">
                          <div className="card-body">
                          <Table
                          columns={columns}
                          dataSource={payment}
                          scroll={{
                            x: 1500,
                          }}
                          />
                          </div>
                      </div>  

                      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="staticBackdropLabel">Detail Order</h5>
                              <button type="button" class="btn-close btn-sm shadow-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <p>Nama : Anang</p>
                              <p>Produk Yang Dipesan :</p>
                              <p>Meja 3x</p>
                              <p>Almari 3x</p>
                              <p>total Pesanan : Rp 4000000</p>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Tolak Pembayaran</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              Apakah Anda Yakin Untuk Menolak Pembayaran Dari Customer Ini? 
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn btn-sm shadow-sm btn-secondary" data-bs-dismiss="modal">Batal</button>
                              <button type="button" onClick={handlerTolak} className="btn btn-sm shadow-sm" style={{ color: "#FFF", backgroundColor: "#00B8B0" }}>Tolak</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Terima Pembayaran</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              Apakah Anda Yakin Untuk Menerima Pembayaran Dari Customer Ini? 
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn btn-sm shadow-sm btn-secondary" data-bs-dismiss="modal">Batal</button>
                              <button type="button" onClick={handlerTerima} className="btn btn-sm shadow-sm" style={{ color: "#FFF", backgroundColor: "#00B8B0" }}>Terima</button>
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
  
  export default App ;
