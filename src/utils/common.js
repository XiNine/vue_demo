const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result;
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};

/* 时间格式处理 */
const timeFormat = (date,status) => {
  const y = date.getFullYear(); //年
  const m = (date.getMonth() + 1).toString().padStart(2, '0'); //月
  const d = date.getDate().toString().padStart(2, '0'); //日
  if(status) return `${y}-${m}-${d} 00:00:00`;
  return `${y}-${m}-${d} 23:59:59`;
}

/* ------------------------------------------------------ */
/* 本周星期一 */
const getFirstDayOfWeek = (date,status=true) => {
  const weekday = date.getDay() || 7;
  date.setDate(date.getDate() - weekday + 1);
  if(status) return timeFormat(date,status);
  return getWeekLast(date);
}

/* 本周最后一天 */
const getWeekLast = (data)=>{
  const nowTime = data.getTime() ;
  const day = data.getDay();
  const oneDayTime = 24*60*60*1000 ;
  const SundayTime =  nowTime + (7-day)*oneDayTime;
  return timeFormat(new Date(SundayTime));
}

/* ------------------------------------------------------ */
/* 本月第一天 */
const getFirstDayOfMonth = (date,status=true)=>{
    date.setDate(1);
    if(status) return timeFormat(date,status,'月');
    return CurrentMonthLast(date);
}
/* 本月最后一天 */
const CurrentMonthLast = (date)=>{
  let currentMonth=date.getMonth();
  let nextMonth=++currentMonth;
  let nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
  let oneDay=1000*60*60*24;
  return timeFormat(new Date(nextMonthFirstDay-oneDay));
}

/* ------------------------------------------------------ */
/* 本年年初 */
const getFirstDayOfYear = (date,status=true)=>{
  date.setDate(1);
  date.setMonth(0);
  if(status) return timeFormat(date,status,'年');
  return getEndYear(date);
}
/* 本年年尾 */
const getEndYear = (date)=>{
  date.setFullYear(date.getFullYear() + 1); 
  date.setMonth(0);
  date.setDate(0);
  return timeFormat(date);
}

/* ---------废物曲线变化数据---------- */
/* 时间字符串截取 */
const getTimeX = (data)=>{
  const timeRule = /2018-|2019-|2020-|2021-|2022-/g;
  return Object.keys(data).map(item=>item.replace(timeRule,''));
}

export {
  debounce,
  getTimeX,
  getFirstDayOfWeek,
  getFirstDayOfMonth,
  getFirstDayOfYear,
}