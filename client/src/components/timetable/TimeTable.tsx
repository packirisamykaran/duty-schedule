import React, { MouseEventHandler, useState } from 'react';
import "../style/TimeTable.css"

// type schedule_row = {
//   trooper:String,
//   "6": String,
//   "7":
// }


export default function TimeTable() {


  const men = ["Karan", "Wei Jie", "Quan Ren"]; 

  const [selector, setselector] = useState<string>("P");

  const [schedule, setSchedule] = useState([...Array(men.length)].map(e => Array(14).fill("")));



  // Header
  let header:any = Array.from({length: 13}, (_, i) => i + 6);
  header.unshift("Trooper");



  const header_row = header.map((col:any, idx:Number)=>{
    if(idx===0){
      return <div className='block name'>{col}</div>
    }
    return <div className='block'>{col}</div>
  })



  const schedule_row = schedule.map((arrayRow, index) =>{

    const row = arrayRow.map((col, colNo)=>{
      if(colNo===0){
        return <div className={'block name '+index} id={index+"-"+colNo} onClick={(e)=> disableRow(e)} >{men[index]}</div>
      }
      else{
        return <div className={'block duty-block '+index} onClick={(e)=> changeBlockDuty(e)} id={index+"-"+colNo}>{schedule[index][colNo]}</div>
      }
    })
    
    return <div key={index} className="row" id={"row"+index} >{row}</div>
  })




  const disableRow = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{

    const target = e.currentTarget;

    const row = target.id.split("-")[0];
    
    const doc = document.getElementById("row"+row);

    if(doc){
      if(doc.style.backgroundColor){
        doc.style.backgroundColor = "";
      }
      else{
        doc.style.backgroundColor = dutyColors.NIL;
      }
    }


  } 


    const changeDutySelector = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setselector(e.target.value)
    }


    type color = {
      [key:string]: string
    }

    const dutyColors:color = {
      "P":"#f72584a0",
      "XM": "#7109b7b0",
      "XG": "#4ccaf0a4",
      "VC":"#4362eec4",
      "VCG": "#22938fc4",
      "NIL": "red"
    }


    const changeBlockDuty = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
      const id = e.currentTarget.id; 
      const [row, col] = id.split("-");
      
     let newState = schedule.slice();
     newState[+row][+col] = selector;

     const target = e.currentTarget;

     target.style.backgroundColor = dutyColors[selector]

     


      
    setSchedule(newState);
    }


    const date = new Date();
    let tdyDate = date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();

  return (
    <div className='timetable'>
      
      <div className="cq">
      <div className="date">{tdyDate}</div>
        <h3>CQ</h3>
        <input type="text" placeholder='Lunch' />
        <input type="text" placeholder='Dinner'/>
      </div>
      <div className="main">
        <div className="header row">
          {header_row}
        </div>
        {schedule_row}
      </div>
      <select name="duty" id="selector" onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> changeDutySelector(e)} >
        <option value="P">P</option>
        <option value="XM">XM</option>
        <option value="XG">XG</option>
        <option value="VC">VC</option>
        <option value="VCG">VCG</option>
      </select>
    </div>
  )
}
