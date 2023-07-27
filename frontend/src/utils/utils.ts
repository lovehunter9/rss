import { EventBus } from 'quasar';
import {ref, onMounted, onBeforeUnmount} from 'vue';
import { Dark } from 'quasar'

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
  const second = time / 1000
  const minute = second / 60;
  if (minute < 1) {
    return 'just now'
  }
  if (minute < 60) {
    return `${minute.toFixed(0)} minutes ago`
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
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;"');
  return newContent;
}


/**
 * news message list
 *
 */

export enum newsBusMessage {
  pre = 'PRE_MESSAGE',
  next = 'NEXT_MESSAGE',
  feedRefresh = 'FEED_REFRESH',
  rightMenuType = 'RIGHT_MENU_TYPE'
}

export const newsBus = new EventBus();


export function getRequireImage(path: string): string {
  if (!path) {
    return '';
  }
  if (path.startsWith('http')) {
    return path;
  }
  return require(`../assets/${path}`);
}

/// path传 assets的相对路径'/开头' 可不传 默认为assets根路径下图片  hover效果图片原名称 + '_hover' dark图片以_dark结尾
export const formatLocalImage = (name: string, path = '/',imageType = 'svg', isHover = false, useDark = true) => {
  let formatName = name;
  if (isHover) {
    formatName = formatName + '_hover';
  } else if (Dark.isActive && useDark) {
    formatName = formatName + '_dark';
  }

  return require(`../assets${path}/${formatName}.${imageType}`);
}

// export function getShowRecommendReason() : boolean{
//   const data = localStorage.getItem('showRecommendReason')
//   if (data){
//     return Boolean(data);
//   }
//   return false;
// }
//
// export function setShowRecommendReason(show : boolean){
//   localStorage.setItem('showRecommendReason',show ? '1' : '0')
// }
