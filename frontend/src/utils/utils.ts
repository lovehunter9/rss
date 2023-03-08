import {ref, onMounted, onBeforeUnmount} from 'vue';

export function useWinSize() {
  const size = ref({
    width:
      document.documentElement.clientWidth || document.body.clientWidth,
    height:
      document.documentElement.clientHeight || document.body.clientHeight
  });

  function onResize() {
    size.value = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
  }

  onMounted(() => {
    addEventListener('resize', onResize);
  });

  onBeforeUnmount(() => {
    removeEventListener('resize', onResize);
  });

  return size;
}

export const useIsMobile = () => {
  const isMobile = ref(false);
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    isMobile.value = true;
  }
  if (document.body.clientWidth < 800) {
    isMobile.value = true;
  }

  return isMobile.value;
};

export const utcToStamp = (utc_datetime: string) => {
  const T_pos = utc_datetime.indexOf('T');
  const Z_pos = utc_datetime.indexOf('Z');
  const year_month_day = utc_datetime.substr(0, T_pos);
  const hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
  const new_datetime = year_month_day + ' ' + hour_minute_second;
  return new Date(Date.parse(new_datetime));
}

export const getPastTime = (stamp1: Date, stamp2: Date) => {
  const time = stamp1.getTime() - stamp2.getTime()
  const minute = time / 1000
  if (minute < 1) {
    return 'just now'
  }
  if (minute < 60) {
    return `${minute} minutes ago`
  }

  const hour = minute / 60;
  if (hour < 24) {
    return `${hour.toFixed(0)} hours ago`
  }

  const day = hour / 24;
  if (day < 30) {
    return `${day.toFixed(0)} days ago`
  }

  const month = day / 30;

  if (month < 12) {
    return `${month.toFixed(0)} months ago`
  }

  const year = month / 12
  return `${year.toFixed(0)} years ago`
}


export const formatContentHtml = (htmlContent: string) => {
  let newContent = htmlContent.replace(/<img[^>]*>/gi, function (match) {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi, function (match) {
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
  return newContent;
}
