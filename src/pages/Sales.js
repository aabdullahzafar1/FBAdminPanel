import React, {Component, useEffect, useState} from 'react';
import Chart from '../components/Chart';
import CardUI from './Pages.css';
import firebase from "firebase/app";
import "firebase/firestore";
import { Bar, Line } from 'react-chartjs-2';
 




function Sales (props){
  const id = props.location.state.id
  const[barData,setBarData] = useState(null)
    const[lineData,setLineData] = useState(null)
    const[lineDataLabels,setLineDataLabels] = useState(null)
    const[barDataLabels,setBarDataLabels] = useState(null)
    const[yt,setYt] = useState(0)
    const[mt,setMt] = useState(0)
    const[chartData,setChartData] = useState()

async function getChartData(){
  await loadYearData()
  await loadMonthlyData()
  let load = barDataLabels
  let load1 = barData
  alert(barData)
  alert(barDataLabels)
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


    useEffect(()=>{
        
          const c = getChartData()
          setChartData(c)
        
        
    },[])

    function getMonthString(time) {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return month[time]
    }

    let yearTotal=0
    let monthTotal=0

    async function loadYearData() {
        const orders = await firebase.firestore().collection('orders').where("restaurant",'==', id).get()
        let data= []
        orders.forEach((doc)=>{
            if(doc.data().dispatched === true){
                if(new Date(doc.data().time.seconds * 1000).getFullYear() === new Date(Date.now()).getFullYear())
                data.push({id: doc.id, total: doc.data().total, time: new Date(doc.data().time.seconds * 1000).getMonth()})
            }
        })
        const groups = data.reduce((groups, orders) => {
            const date = getMonthString(orders.time);
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(orders);
            return groups;
          }, {});
          
          // Edit: to add it in the array format instead
          const groupArrays = Object.keys(groups).map((date) => {
            return {
              date,
              orders: groups[date]
            };
          });
          let finalOrder= []
          groupArrays.forEach((doc)=>{
              let array =[]
              array = doc.orders
              Array.isArray(array)
              let t = 0
              array.forEach((e)=>{
                t= t+ e.total
              })

              finalOrder.push({month: doc.date, total: t})
              
          })
          let months = ['January','Feburay','March', 'April','May','June','July','August','September','October','November','December']
          const sorter = (a, b) => {
            if(a.year !== b.year){
               return a.year - b.year;
            }else{
               return months.indexOf(a.month) - months.indexOf(b.month);
            };
         };
         finalOrder.sort(sorter);

        setBarDataLabels(finalOrder.map((doc)=>doc.month))
        setBarData(finalOrder.map((doc)=>doc.total))
        finalOrder.forEach((doc)=>{
            yearTotal = yearTotal + doc.total
        })
        setYt(yearTotal)
      
        
     
    }
    async function loadMonthlyData() {
        const orders = await firebase.firestore().collection('orders').where("restaurant",'==',id).get()
        let data= []
        orders.forEach((doc)=>{
            if(doc.data().dispatched === true){
                if(new Date(doc.data().time.seconds * 1000).getFullYear() === new Date(Date.now()).getFullYear())
                    if(new Date(doc.data().time.seconds * 1000).getMonth() === new Date(Date.now()).getMonth()){
                        data.push({id: doc.id, total: doc.data().total, time: new Date(doc.data().time.seconds * 1000).getDate()})
                    }
            }
        })
        const groups = data.reduce((groups, orders) => {
            const date = orders.time;
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(orders);
            return groups;
          }, {});
          
          // Edit: to add it in the array format instead
          const groupArrays = Object.keys(groups).map((date) => {
            return {
              date,
              orders: groups[date]
            };
          });
          let finalOrder= []
          groupArrays.forEach((doc)=>{
              let array =[]
              array = doc.orders
              Array.isArray(array)
              let t = 0
              array.forEach((e)=>{
                t= t+ e.total
              })

              finalOrder.push({day: doc.date, total: t})
              
          })


        setLineDataLabels(finalOrder.map((doc)=>doc.day))
        setLineData(finalOrder.map((doc)=>doc.total))
        
        finalOrder.forEach((doc)=>{
            monthTotal = monthTotal + doc.total
        })
        setMt(monthTotal)
     
    }

      return (
          <div style={styles.container}>
          {barData&&<Bar
            redraw
              data = {{
                labels: barDataLabels,
                datasets: [
                  {
                    label: 'Sales',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(0,0,51,0.7)',
                    borderColor: 'rgba(0,0,102,0.2)',
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
                    data: barData
                  }
                ]
              }}
              options={{
                title:{
                  display: true,
                  text:'Sales of The Year',
                  fontSize:25
                },
                legend:{
                  display: true,
                  position: 'bottom'
                }
              }}
            />}
          {lineData&&<Line
            redraw
              data = {{
                labels: lineDataLabels,
                datasets: [
                  {
                    label: 'Sales',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(192,192,192,0.3)',
                    borderColor: 'rgba(255, 0, 0, 0.8)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(192,0,0,0.3)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(192,0,0,0.3)',
                    pointHoverBorderColor: '(255,0,0,0.3)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: lineData
                  }
                ]
              }}
              options={{
                title:{
                  display: true,
                  text:'Sales of The Month',
                  fontSize:25
                },
                legend:{
                  display: true,
                  position: 'bottom'
                }
              }}
            />}
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