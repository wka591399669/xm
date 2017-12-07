  let DataTime =   {
  getDay : (dayNum) =>  {
    let now = new Date(); 
    now.setDate(now.getDate()+dayNum); 
    let cmonth = now.getMonth() + 1
    let day = now.getDate()
    if (cmonth < 10) cmonth = '0' + cmonth
    if (day < 10) day = '0' + day
    return now.getFullYear() + '-' + cmonth + '-' + day;
  }
};
export default DataTime;
