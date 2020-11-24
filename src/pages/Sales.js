import React, {Component, useEffect, useState} from 'react';
import Chart from '../components/Chart';
import CardUI from './Pages.css';
import firebase from "firebase/app";
import "firebase/firestore";
 





function Sales (){
  const[labelData,setLabelData] = useState([])
  const[totalData,setTotalData] = useState([])
  const [chartData, setChartData] = useState()


 async function getChartData(){
  let load = await getLabelData()
  let load1 = await getTotalData()
    const data = {
      labels: load,
      datasets: [
        {
          label: 'Sales',
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
          data: load1
        }
      ]
    };

    return data
  }

  async function initChart(){
   const ac =  await getLabelData();
   setLabelData(ac)
    const c = await getChartData();
    setChartData(c)
  }

useEffect(()=>{
  initChart()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

async function getLabelData(){
  const orderRef = await firebase.firestore().collection('orders').get()
  let l = []
  orderRef.forEach(doc=> {
    let d = doc.data();
    let dateS = d.time.seconds
    let date = new Date(dateS * 1000).toLocaleDateString()
    l.push(date)
  });
  setLabelData(l);
  return l;
}
async function getTotalData(){
  const orderRef = await firebase.firestore().collection('orders').get()
  let l = []
  orderRef.forEach(doc=> {
    
    l.push(doc.data().total)
  });
  setTotalData(l);
  return l;
}



  

      return (
          <div style={styles.container}>
          {chartData&&<Chart  chartData={chartData} location="Massachusetts" legendPosition="bottom"/>}
          </div>
      );
    }
  

  const styles = {
    container: {
      flex: 1,
      flexGrow: 1,
      position: "absolute",
      left: 300,
      width: "70%"
  
    }
  }

export default Sales;