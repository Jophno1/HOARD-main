import axios from "axios";
import { 
  forEach, 
  camelCase,
  shuffle
} from "lodash";

export const saveKeyword = (payload) => {
  return {
    type: "SAVE_KEYWORD",
    payload: payload,
  };
};

export const resetSearchOptions = () => {
  return {
    type: "RESET_KEYWORD"
  };
}

export const resetCoinIdData = () => {
  return {
    type: "RESET_COINIDDATA"
  };
}

export const loadMetaData = () => {
  return async dispatch => {
    dispatch({ type: 'START_LOAD_METADATA' });
    
    function onSuccess(success) {
      let rawData = success.data.values;
      let keys = rawData[1].slice(1, rawData[1].length);
      let metaData = [];
      rawData.forEach((o, idx) => {
        if (idx > 1) {
          let item = {};
          keys.forEach((key, kIdx) => {
            item[camelCase(key)] =  kIdx < o.length ? o[kIdx + 1] : '';
          });
          metaData.push(item);
        }
      });
      metaData = shuffle(metaData);
      dispatch({ type: 'LOAD_METADATA', payload: metaData });
      return metaData;
    }
    function onError(error) {
      return error;
    }
    try {
      const success = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1zKw_NntxvRGbqqibPrrSzc4okLuF_i3gqyOxef381T8/values/HOARD_WEBSITE?alt=json&key=AIzaSyDk8yYgkTfh32Id-t0n2C_HzN21EhoPU7U');
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  }
};

export const loadStatsData = () => {
  return async dispatch => {
    dispatch({ type: 'START_LOAD_STATSDATA' });
    
    async function onSuccess(success) {
      let rawData = success.data.values;
      let statsData = [];
      const sheetDataPromises = [];
      rawData.forEach(async (o, idx) => {
        if (idx > 0 && o.length !== 0 && o[0] !== "") {
          const sheetname = ((o[2].split(':')[1]).split('/')[0]).replace(/\s/g, '');
          sheetDataPromises.push(axios.get(`https://sheets.googleapis.com/v4/spreadsheets/1toE1liv0LdL7Y_SDDWA_aKFFhC9NrB4vWsfYhxCfr-Y/values/${sheetname}!A${o[3].slice(1)}:B${o[4].slice(1)}?alt=json&key=AIzaSyDk8yYgkTfh32Id-t0n2C_HzN21EhoPU7U`));
        }
      });
      const response = await Promise.all(sheetDataPromises);
      response.forEach((resItem, idx) => {
        let item = {
          name: "",
          type: false,
          value: [],
        };
        const o = rawData[idx + 1];
        item.name = o[1];
        item.type = (o[5] === "" || o.length < 6 ? false : true);

        resItem.data.values.forEach((da, indx) => {
          item.value.push({
            name: da[0],
            point: parseInt(da[1]),
          })
        });
        statsData.push(item);
      })
      dispatch({ type: 'LOAD_STATSDATA', payload: statsData });
      return statsData;
    }
    function onError(error) {
      return error;
    }
    try {
      const success = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1toE1liv0LdL7Y_SDDWA_aKFFhC9NrB4vWsfYhxCfr-Y/values/CoinLayerRef?alt=json&key=AIzaSyDk8yYgkTfh32Id-t0n2C_HzN21EhoPU7U');
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  }
};

export const doSearch = (payload) => {
  return {
    type: "DO_SEARCH",
    payload: payload,
  };
};