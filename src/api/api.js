// const apiBaseUrl = 'http://192.168.0.109:3000';
const apiBaseUrl = 'http://pba-jp-app.herokuapp.com'
const apiGetTodayAll = '/api/today-all';
const apiGetToday = '/api/today';
const apiGetBatch = '/api/batch';
const apiGetSearch = '/api/search';
const apiGetSelect = '/api/select';

const objGetKey = o => Object.keys(o);
const objGetValue = o => Object.values(o);
export function getTodayMedia() {
  return get(apiGetToday);
}

export function getBatch(model) {
  return get(apiGetBatch, {model: model});
}

export function getTodayAll() {
  return get(apiGetTodayAll);
}

export function getSearch(model, month, year, text) {
  return get(
    apiGetSearch,
    {model: model},
    {month: month},
    {year: year},
    {text: text},
  );
}

export function getSelect(model, id) {
  return get(apiGetSelect, {model: model}, {id: id});
}
async function get(url, ...params) {
  let fullUrl = apiBaseUrl + url;
  params.forEach((obj, index) => {
    if (index === 0) {
      fullUrl += '?';
    } else {
      fullUrl += '&';
    }
    fullUrl += objGetKey(obj) + '=' + objGetValue(obj);
  });
  console.log(fullUrl)
  try {
    const today = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    return await today.json();
  } catch (error) {
    console.log(error);
  }
}
