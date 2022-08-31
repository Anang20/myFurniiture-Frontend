import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarController,
    BarElement,
    Title,
    ToolTip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    // ToolTip,
    Legend
);
import {Line, Bar} from 'react-chartjs-2';
import axios from 'axios';
import appConfig from '../../config/app';

const Chart = ({payment}) => {

  const [transaksi, setTransaksi] = useState([])
  const [customer, setCustomer] = useState([])
  const [month, setMonth] = useState([])

    useEffect(() => {
      const getTransaksi = async () => {
        const response = await axios.get(`${appConfig.apiUrl}/dashboard/data/transaksi`);
        const result = response.data
        const arr = [result]
        const tempArr = []
        arr.map(value => {
          tempArr.push(value.Now)
        });
        const values = Object.values(tempArr[0])
        setTransaksi(values);
      }
      getTransaksi()
    }, [])

    useEffect(() => {
      const getAllCustomer = async () => {
        const response = await axios.get(`${appConfig.apiUrl}/dashboard/data/registrasi`);
        const result = response.data
        const arr = [result]
        const array = []
        arr.map(value => {
          array.push(value.Now)
        })
        console.log(array[0]);
        const keys = Object.keys(array[0])
        const values = Object.values(array[0])
        setCustomer(values)
        setMonth(keys)
      }
      getAllCustomer()
    }, [])

    // const randomColor = Math.floor(Math.random()*16777215).toString(16);
    //   document.body.style.backgroundColor = "#" + randomColor;
    //   color.innerHTML = "#" + randomColor;
    // }
    
    const data = {
      labels: month,
      datasets: [
        {
          label: 'Statistik Transaksi Perbulan',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: transaksi,
        },
      ],
    };

    const data2 = {
      labels: month,
      datasets: [{
        label: 'Statistik Total Customer',
        data: customer,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
    
    return (
        <div className='row'>
          <div className='col-6'>
            <div className='card shadow'>
                <Line
                data={data}
                width={10}
                height={10}
                />
            </div>
          </div>
          <div className='col-6'>
            <div className='card shadow'>
                <Bar
                data={data2}
                width={10}
                height={10}
                options={{
                  maintainAspectRatio: false
                }}
                />
            </div>
          </div>
        </div>
    )
}
export default Chart