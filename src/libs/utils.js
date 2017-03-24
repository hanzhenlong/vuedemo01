/**
 * Created by user on 2017/3/15.
 */
import Timeago from 'timeago.js'
import moment from 'moment'

const MillisecondToDate = (time) => {
  let str = '';
  if (time !== '' && time !== null) {
    let timeagoInstance = new Timeago();
    str = timeagoInstance.format(time, 'zh_CN');
  }
  return str;
};

const getLastTimeStr = (time, isFriendly) => {
  if (isFriendly) {
    return MillisecondToDate(time);
  } else {
    return moment(time).format('YYYY-MM-DD HH:mm');
  }
};


const getTabInfo = (tab, top, good, isClass) => {
  let str = '';
  let className = '';

  if (top) {
    str = '置顶';
    className = 'top';
  } else if (good) {
    str = '精华';
    className = 'good';
  } else {
    switch (tab) {
      case 'share':
        str = '分享';
        className = 'share';
        break;
      case 'ask':
        str = '问答';
        className = 'ask';
        break;
      case 'job':
        str = '招聘';
        className = 'job';
        break;
      default:
        str = '暂无';
        className = 'default';
        break;
    }
  }

  return isClass ? className : str;
};

export { getTabInfo, getLastTimeStr }
