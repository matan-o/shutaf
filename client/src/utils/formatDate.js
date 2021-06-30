export function formatDate(date) {
  const d = new Date(date);
  
  const dd = d.getDate();
  const mm = d.getMonth() + 1;
  const yyyy = d.getFullYear();
  const hh = d.getHours();
  const min = d.getMinutes()
  const mmm =  min < 10 ? `0${min}` : `${min}` 

  return <small className="dateDisplay">{`${dd}/${mm}/${yyyy} - ${hh}:${mmm}`}</small>;
}

export function formatBirthday(date) {
  const d = new Date(date);
  
  const dd = d.getDate();
  const mm = d.getMonth() + 1;
  const yyyy = d.getFullYear();


  return <small className="dateDisplay">{`${dd}/${mm}/${yyyy}`}</small>;
}

