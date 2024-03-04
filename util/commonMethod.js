const subIndex = (
  str, indexStart, indexEnd = indexStart,
) => {
  return str.substring(indexStart, indexEnd + 1);
};

const indexOfAnyFirst = (
  str, searchArray, indexStart = 0,
) => {
  let result = Infinity;
  let searchIndex = -1;
  searchArray.forEach((search, index) => {
    const findIndex = str.indexOf(search, indexStart);
    if (findIndex !== -1) {
      if (findIndex < result) {
        result = findIndex;
        searchIndex = index;
      }
    }
  });

  if (result === Infinity) {
    return {
      index: -1,
      searchIndex: -1,
    };
  }
  return {
    index: result,
    searchIndex,
  };
};

const replaceAllArray = (str, replaceArray) => {
  const searchArray = replaceArray.map(element => element[0]);
  let start = 0;
  let result = '';
  while (true) {
    const searchResult = indexOfAnyFirst(str, searchArray, start);
    if (searchResult.index === -1) {
      result += str.substring(start);
      break;
    }

    if (start < searchResult.index) {
      result += str.substring(start, searchResult.index);
      start = searchResult.index;
    }
    result += replaceArray[searchResult.searchIndex][1];
    start += searchArray[searchResult.searchIndex].length;
  }
  return result;
};

const dateToString = (format, date) => {
  const padFirstZero = (value) => {
    return ('0' + value).slice(-2);
  }
  const year4     = date.getFullYear();
  const year2     = date.getFullYear().toString().slice(-2);
  const month1    = (date.getMonth() + 1).toString();
  const month2    = padFirstZero(month1);
  const date1     = date.getDate().toString();
  const date2     = padFirstZero(date1);
  const hours1    = date.getHours().toString();
  const hours2    = padFirstZero(hours1);
  const minutes1  = date.getMinutes().toString();
  const minutes2  = padFirstZero(minutes1);
  const seconds1  = date.getSeconds().toString();
  const seconds2  = padFirstZero(seconds1);
  const day3      = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()]

  const replaceTable = [
    ['YYYY'   , year4],
    ['YY'     , year2],
    ['M'      , month1],
    ['MM'     , month2],
    ['D'      , date1],
    ['DD'     , date2],
    ['H'      , hours1],
    ['HH'     , hours2],
    ['m'      , minutes1],
    ['mm'     , minutes2],
    ['S'      , seconds1],
    ['SS'     , seconds2],
    ['DDD'    , day3],
  ]
  replaceTable.sort((a, b) => b[0].length - a[0].length);
  let result = format;
  return replaceAllArray(result, replaceTable);
};

const formatNotificationBody = (text) => {
  // htmlタグを変換 URLは改行して次の行に移動
  const replacedText = text
                .replace(/\<br \/\>/g,'\n')
                .replace(/\<p\>/g,'\n')
                .replace(/\<li\>/g,'\n･')
                .replace(/href\=\"(http[^\"]+)\"(.*)/g,'$2\n$1')
                .replace(/\<[^\>]+\>/g,'')
                ;
  // 不要な改行やスペースの除去
  const textArray = replacedText.split('\n');
  let procText = "";
  for(let i=0;i<textArray.length;i++){
    const tmpText = textArray[i]
                    .replace(/^\s+/g,'')
                    .replace(/^\t+/g,'')
                    .trim()
                    ;
    if(i!==0){
      if(tmpText!==textArray[i-1].replace(/^\s+/g,'').replace(/^\t+/g,'').trim()){
        procText += `${i !== 0?'\n':''}` + tmpText;
      }
    }else{
      if(tmpText!==""){
        procText += tmpText;
      }
    }
  }
  return procText;
}

module.exports = {
  dateToString,
  formatNotificationBody,
}