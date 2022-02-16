const initialState = {
  searchOptions: {
    coinType: '',
    wallet: '',
    name: '',
    country: '',
    tokenIdFrom: '',
    tokenIdTo: '',
    yearFrom: '',
    yearTo: '',
    ageFrom: '',
    ageTo: ''
  },
  pointsValue : [],
  metaData: [],
  statsData: [],
  leaderBoardData : [],
  isLoadingMetaData: false,
  isLoadingStatsData: false,
  isLoadingLeaderBoardData: false,
  isfinishLoadStatsData: false,
  isSearching: false,
  walletStatus: false,
};

const commonReducer = (state = initialState, action) => { 
  switch (action.type) { 
    case "SAVE_KEYWORD":
      let searchOptions = Object.assign({}, state.searchOptions);
      searchOptions[action.payload.key] = action.payload.value; 
      return {
        ...state,
        searchOptions
      };
      break;
    case "RESET_KEYWORD":
      
      return {
        ...state,
        searchOptions: {
          coinType: '',
          wallet: '',
          name: '',
          country: '',
          tokenIdFrom: '',
          tokenIdTo: '',
          yearFrom: '',
          yearTo: '',
          ageFrom: '',
          ageTo: ''
        }
      };
      break;
    case "START_LOAD_METADATA":
      return {
        ...state,
        isLoadingMetaData: true
      };
      break;
    case "START_LOAD_STATSDATA":
      return{
        ...state,
        isLoadingStatsData: true,
        isfinishLoadStatsData: false,
      }
      break;
    case "START_LOAD_LEADERBOARDDATA":
      return {
        ...state,
        isLoadingLeaderBoardData: true,
      }
      break;
    case "LOAD_METADATA":
      return {
        ...state,
        metaData: action.payload,
        isLoadingMetaData: false
      };
      break;
    case "LOAD_STATSDATA":
      return {
        ...state,
        statsData: action.payload,
        isLoadingStatsData: false,
        isfinishLoadStatsData: true,
      };
      break;
    case "LOAD_LEADERBOARDDATA":
      return {
        ...state,
        leaderBoardData: action.payload,
        isLoadingLeaderBoardData: false,
      }
      break;
    case "DO_SEARCH":
      let walletStatus = state.searchOptions.wallet == '' ? false : true;
      return {
        ...state,
        isSearching: action.payload,
        walletStatus
      };
      break;
    default:
      return state;
  }
};

export default commonReducer;
