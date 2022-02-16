import React, { useEffect, useState } from "react";
import { Link } from 'react-router';
import * as s from "../styles/globalStyles";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { BsDownload } from 'react-icons/bs';
import { 
  saveKeyword, 
  doSearch,
  resetSearchOptions,
  loadStatsData,
  loadLeaderBoardData
} from '../redux/common/commonActions';
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import country from "../utils/country.json"
import PropertyDropdown from "../component/propertyDropdown";
import commonReducer from "../redux/common/commonReducer";
import { Button } from "reactstrap";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledLogo = styled.img`
  position: relative;
  width: 25%;
  transition: width 0.5s;
  cursor: pointer;
  @media (min-width: 1024px) {
    width: 17%;
  }
`;

export const StyledHeader = styled.div`
  position: fixed;
  padding: 10px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #000;
  z-index: 99999;
  width: 100%
`;

export const StyledButtonGroup = styled.div`
  position: relative;  
  display: none;
  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const StyledIntroLink = styled.div`
  color: var(--secondary-text);
  text-decoration: none;
  width: 48%;
`;

export const StyledRoundButton = styled.button`
  border: 1px solid white;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 13px;
  color: var(--primary-text);
  height: 38px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 5px 2px 0px rgb(250 250 250);
  -webkit-box-shadow: 4px 5px 2px 0px rgb(250 250 250);
  -moz-box-shadow: 4px 5px 2px 0px rgb(250 250 250);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledIconGroup = styled.div`
  position: relative;  
  justify-content: space-between;
  align-items: center;
  display: none;
  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const StyledLink = styled.a`
  color: var(--secondary-text);
  font-size: 30px;
  text-decoration: none;
`;

export const StyledScanInput = styled.input`
  width: 65%;
  color: black;
  margin-left: 10px;
  padding: 1px;
  @media (max-width: 450px) {
    width: 50%;
  }
`;

export const StyledScanSelect = styled.select`
  width: 65%;
  color: black;
  margin-left: 10px;
  padding: 1px;
  cursor: pointer;
  @media (max-width: 450px) {
    width: 50%;
  }
`;

export const StyledMenuIcon = styled.div`
  position: relative;
  display: block;
  width: 7%;
  line-height: 0.5;
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const StyledMenuImg = styled.img`
  position: relative;
  width: 100%;
  transition: width 0.5s;
`;

export const StyledMyNavSide = styled.div`
  position: absolute;
  z-index: 3000000;
  height: 100%;
  width: 100vw;
  opacity: 1;
  top: -200%;
  left: auto;
  right: 0;
  background: rgba(0,0,0,0.8);
  overflow-x: hidden;
  transition: 0.3s;
  @media (min-width: 1024px) {
    top: -0.15%;
  }
`;

export const StyledMyNavSideDiv = styled.div`
  position: fixed;  
  left: 0px;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledMobileButtonGroup = styled.div`
  position: relative;  
  width: 80%;
  display: flex;
  @media (min-width: 1024px) {
    display: none
  }
`;

export const StyledMobileIconGroup = styled.div`
  position: relative;  
  justify-content: space-around;
  align-items: center;
  display: flex;
  width: 80%;
  margin-top: 2%;
  @media (min-width: 1024px) {
    display: none;
    margin-top: 0%;
  }
`;

export const StyledMobileClose = styled.p`
  color: white;
  font-size: 50px
`;

export const StyledTokenImgSection = styled.div`
  position: relative;
  margin-top: 13%;
  display: flex;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  @media (min-width: 1024px) {
    margin-top: 7%;
  }
`;

export const StyledTokenImg  = styled.img`
  position: relative;
  -ms-flex: 0 0 14%;
  flex: 0 0 14%;
  max-width: 14%;
  cursor: pointer
`;

export const StyledWalletButton = styled.div`
  border: 1px solid white;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 13px;
  color: var(--primary-text);
  width: 76%;
  height: 38px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 5px 2px 0px rgb(250 250 250);
  -webkit-box-shadow: 4px 5px 2px 0px rgb(250 250 250);
  -moz-box-shadow: 4px 5px 2px 0px rgb(250 250 250);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  @media (min-width:1024px) and (max-width: 1068px) {
    width: 65%;
  }
  @media (max-width: 1024px) {
    width: 50%;
  }
`;

export const StyledWalletInput = styled.input`
  width: 85%;
  color: black;
  margin-left: 10px;
  padding: 1px;
`;

export const StyledSelectTokenGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledSelectTokenNumber = styled.p`
  color: #fff;
  font-size: 18px;
  line-height: 1
`;

export const StyledSelectTokenDetailBlock = styled.div`
  color: #fff;
  font-size: 15px;
  width: 100%;
  display: flex;
  margin-top: 5%;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center
`;

export const StyledAdvancedGroup = styled.div`
  width: 48%;
  cursor: pointer;
  @media (max-width: 1024px) {
    display: none;
  }
`;
const headers = [
  { label: "Property", key:"type"},
  { label: "Name", key: "name"},
  { label: "Point", key: "point"}
];

const Navbar = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newSearchModal, setNewSearchModal] = useState(false);
  const [leaderBoardModal, setLeaderBoardModal] = useState(false);
  const [status, setStatus] = useState("-200%");
  const [coinidData, setcoinidData] = useState({});
  const common = useSelector((state) => state.common);
  const [totalscore, setTotalScore] = useState(0);
  const [componentValues, setComponentValues] = useState([]);
  const [curCoinId, setCurCoinId] = useState('');
  const [csvReport, setCsvReport] = useState({
    data: [],
    headers: headers,
    filename: 'RaritySearch.csv',
  });

  useEffect(() => {
    dispatch(loadLeaderBoardData());
  }, [])

  const closeModal = () => { 
    setShowModal(false);
  }

  const handleSearch = (e, key) => {
    dispatch(
      saveKeyword({
        key,
        value: e.target.value,
      })
    );    
  }

  const resetNewSearchValues = () => {
    setComponentValues([]);
    setcoinidData({});
    setTotalScore(0);
    setCsvReport({
      ...csvReport,
      data: [],
    });
  }

  const closeNewSearchModal = () => {
    if(document.getElementById("coinid") != undefined)
      document.getElementById("coinid").value = '';
    setNewSearchModal((prevState) => !prevState);
  }

  const onNewSearchClick = () => {
    resetNewSearchValues();
    if(common.statsData.length === 0) dispatch(loadStatsData());
    const newArray = new Array(common.statsData.length);
    setComponentValues([...newArray]);
    setNewSearchModal(true);
  }

  const onLeaderboardClick = () => {
    if(common.leaderBoardData.length === 0) dispatch(loadLeaderBoardData());
    //setLeaderBoardModal(true);
  }

  const closeLeaderBoardModal = () => {
    setLeaderBoardModal(false);
  }

  const getComponentValue = async (pointValue, index, names, points) => {
    await setTotalScore(totalscore + pointValue);
    const newArray = componentValues;
    newArray[index] = {name: names, point:points};
    setComponentValues([...newArray]);
    const newArray1 = csvReport;
    if(newArray1.data.length > 0 && newArray1.data[newArray1.data.length - 1].type == 'CoinID'){
      newArray1.data = newArray1.data.slice(0, newArray1.data.length-1);
    }
    const findIndex = newArray1.data.findIndex((item) => item.type == common.statsData[index].name);
    if (findIndex > -1) newArray1.data.splice(findIndex, 1);
    if (names != '' && points > 0) {
      newArray1.data.push({
        type: common.statsData[index].name,
        name: componentValues[index].name,
        point: componentValues[index].point,
      })
    }
    newArray1.data.push({
      type: 'CoinID',
      name: curCoinId,
      point: totalscore + pointValue,
    })
    await setCsvReport({
      ...csvReport,
      data: [...newArray1.data]
    });
  }

  const onIDChange = (e) => {
    if(e.key === "Enter"){
      const inputval = document.getElementById("coinid").value;
      if(inputval > 0){
        const filename = `${inputval}` + ".csv";
        setComponentValues([]);
        setCsvReport({
          ...csvReport,
          filename: filename,
          data: [],
        });
        setCurCoinId(inputval);
        const coiniddata = common.metaData.filter(data1 => parseInt(data1.incrementNumberCoin) == inputval);
        const firstname = coiniddata[0].firstname;
        const surname = coiniddata[0].surname;
        const foundby = `${firstname}` + "-" + `${surname}`;
        const where = coiniddata[0].whereTheyFoundIt;
        const date = `${coiniddata[0].whenTheyFoundItMonth}` + " " + `${coiniddata[0].whenTheyFoundItDay}` + ", " + `${coiniddata[0].whenTheyFoundItYear}`;
        const coinage = `${coiniddata[0].ad}` + " " + `${coiniddata[0].coinAgeOfCoin}`;
        const metal = `${coiniddata[0].metal}`;
        const imageurl = `${coiniddata[0].pathOfImageOnline}` + `${coiniddata[0].final}`;
        let item = {
          foundby: '',
          where: '',
          date: '',
          coinage: '',
          metal: '',
          imageURL: '',
        };
        item.foundby = foundby;
        item.where = where;
        item.date = date;
        item.coinage = coinage;
        item.metal = metal;
        item.imageURL = imageurl;
        setcoinidData(item);
        let temptotal = 0;
        let newArray = componentValues;
        let newArray1 = csvReport;
        let tindex = common.statsData.findIndex((item) => {return item.name === 'First Name'});
        let ptss;
        if(common.statsData[tindex].value.find((item, index) => {return item.name === firstname}) !== undefined){
          ptss = (common.statsData[tindex].value.find((item, index) => {return item.name === firstname})).point;
          newArray[tindex] = {name: firstname, point: ptss};
          temptotal = temptotal + parseInt(ptss);
          newArray1.data.push({type:"First Name", name:firstname, point: ptss});
        }
        tindex = common.statsData.findIndex((item) => {return item.name === 'Surname'});
        if(common.statsData[tindex].value.find((item, index) => {return item.name === surname}) !== undefined){
        ptss = (common.statsData[tindex].value.find((item, index) => {return item.name === surname})).point;
        newArray[tindex] = {name: surname, point: ptss};
        temptotal = temptotal + parseInt(ptss);
        newArray1.data.push({type:"Surname", name:surname, point: ptss});
        }
        tindex = common.statsData.findIndex((item) => {return item.name === 'Country Found'});
        if(common.statsData[tindex].value.find((item, index) => {return item.name === where}) !== undefined){
        ptss = (common.statsData[tindex].value.find((item, index) => {return item.name === where})).point;
        newArray[tindex] = {name: where, point: ptss};
        temptotal = temptotal + parseInt(ptss);
        newArray1.data.push({type:"Country Found", name:where, point: ptss});
        }
        tindex = common.statsData.findIndex((item) => {return item.name === 'Month Found'});
        if(common.statsData[tindex].value.find((item, index) => {return item.name == coiniddata[0].whenTheyFoundItMonth}) !== undefined){ptss = (common.statsData[tindex].value.find((item, index) => {return item.name == coiniddata[0].whenTheyFoundItMonth})).point;
        newArray[tindex] = {name: coiniddata[0].whenTheyFoundItMonth, point: ptss};
        temptotal = temptotal + parseInt(ptss);
        newArray1.data.push({type:"Month Found", name:coiniddata[0].whenTheyFoundItMonth, point: ptss});
        }
        tindex = common.statsData.findIndex((item) => {return item.name === 'Day of Month Found'});
        if(common.statsData[tindex].value.find((item, index) => {return item.name == coiniddata[0].whenTheyFoundItDay}) !== undefined){ptss = (common.statsData[tindex].value.find((item, index) => {return item.name == coiniddata[0].whenTheyFoundItDay})).point;
        newArray[tindex] = {name: coiniddata[0].whenTheyFoundItDay, point: ptss};
        temptotal = temptotal + parseInt(ptss);
        newArray1.data.push({type:"Day of Month Found", name:coiniddata[0].whenTheyFoundItDay, point: ptss});
        }
        tindex = common.statsData.findIndex((item) => {return item.name === 'Year Found'});
        if(common.statsData[tindex].value.find((item, index) => {return item.name == coiniddata[0].whenTheyFoundItYear}) !== undefined){ptss = (common.statsData[tindex].value.find((item, index) => {return item.name == coiniddata[0].whenTheyFoundItYear})).point;
        newArray[tindex] = {name: coiniddata[0].whenTheyFoundItYear, point: ptss};
        temptotal = temptotal + parseInt(ptss);
        newArray1.data.push({type:"Year Found", name:coiniddata[0].whenTheyFoundItYear, point: ptss});
        }
        tindex = common.statsData.findIndex((item) => {return item.name === 'Coin Age'});
        if(common.statsData[tindex].value.find((item, index) => {return item.name == coiniddata[0].coinAgeOfCoin}) !== undefined){ptss = (common.statsData[tindex].value.find((item, index) => {return item.name == coiniddata[0].coinAgeOfCoin})).point;
        newArray[tindex] = {name: coiniddata[0].coinAgeOfCoin, point: ptss};
        temptotal = temptotal + parseInt(ptss);
        newArray1.data.push({type:"Coin Age", name:coiniddata[0].coinAgeOfCoin, point: ptss});
        }
        tindex = common.statsData.findIndex((item) => {return item.name === 'Metal of Coin'});
        if(common.statsData[tindex].value.find((item, index) => {return item.name == coiniddata[0].metal.toUpperCase()}) !== undefined){ptss = (common.statsData[tindex].value.find((item, index) => {return item.name == coiniddata[0].metal.toUpperCase()})).point;
        newArray[tindex] = {name: coiniddata[0].metal.toUpperCase(), point: ptss};
        temptotal = temptotal + parseInt(ptss);
        newArray1.data.push({type:"Metal of Coin", name:coiniddata[0].metal.toUpperCase(), point: ptss});
        newArray1.data.push({type:"Coin ID", name: inputval, point: temptotal});
        }

        setComponentValues([...newArray]);
        setTotalScore(temptotal);
        setCsvReport({...csvReport, data: newArray1.data, filename: filename});
     }
    }
  }  
    return (
        <>
          <StyledHeader>
            <StyledButtonGroup>
              <s.Container
                fd={"row"}
                jc={"space-between"}
              >
                <StyledIntroLink>
                  <StyledRoundButton className="w-[268px]">
                    <Link to="/introduction" target={"_blank"} className="white">
                      INSTRUCTIONS
                    </Link>
                  </StyledRoundButton>
                </StyledIntroLink>
                { 
                  window.location.pathname == "/introduction" || window.location.pathname == "/leaderboard"
                  ? null
                  : <StyledAdvancedGroup>
                    <StyledRoundButton
                      className="w-[268px] ml-2"
                      onClick={() => {
                        dispatch(resetSearchOptions());
                        setShowModal(true);
                      }}>
                        ADVANCED SEARCH
                    </StyledRoundButton>
                  </StyledAdvancedGroup>   
                }              
              </s.Container>
            </StyledButtonGroup> 
            { 
              window.location.pathname == "/introduction" 
              ? <StyledLogo 
                  alt={"example"} 
                  src={"/images/HoardToken.png"}
                  className="lg:-ml-[9%]"
                  onClick={() => {
                      window.scrollTo(0,0);
                      window.open(
                        'http://hoardtoken.com/',
                        '_blank'
                      )
                  }} 
                />
              : <StyledLogo 
                  alt={"example"} 
                  src={"/images/HoardToken.png"}
                  className=""
                  onClick={() => {
                      window.scrollTo(0,0);
                      window.open(
                        'http://hoardtoken.com/',
                        '_blank'
                      )
                  }} 
                />   
            }           
            <div className="flex flex-row items-center">
              <div>
              { 
                window.location.pathname == "/introduction" || window.location.pathname == "/leaderboard"
                ? null
                : <div className="flex flex-row">
                    <StyledIntroLink className="md:block hidden">
                      <StyledRoundButton
                        className="w-[268px] mr-16">
                          <Link to="/leaderboard" target={"_blank"} className="white" onClick={() => {
                            setStatus("-200%")
                            onLeaderboardClick()}}>
                          LEADERBOARD
                          </Link>
                      </StyledRoundButton>
                    </StyledIntroLink>
                    <StyledAdvancedGroup>
                      <StyledRoundButton
                        className="w-[268px] hidden md:flex"
                        onClick={() => onNewSearchClick()}>
                          RARITY SEARCH
                      </StyledRoundButton>
                    </StyledAdvancedGroup>
                </div>
                
              }
              </div>     
              <StyledIconGroup className="mt-2">
                <StyledLink 
                    target={"_blank"} 
                    href="https://t.me/HOARDTOKEN"
                >
                    <i className="fab fa-telegram"></i>
                </StyledLink>
                <StyledLink 
                    target={"_blank"} 
                    href="https://twitter.com/HOARDTOKEN"
                    className="ml-8"
                >
                    <i className="fab fa-twitter"></i>
                </StyledLink>          
              </StyledIconGroup>
            </div>
            <StyledMenuIcon>
                <StyledMenuImg 
                  alt={"menu"} 
                  onClick={
                    () => {
                      dispatch(resetSearchOptions());
                      setStatus("-0.15%");
                    }
                  } 
                  src={"/images/icon_menu.png"}
                
                >                  
                </StyledMenuImg>
            </StyledMenuIcon>
          </StyledHeader>
          <StyledMyNavSide style={{ top: status }}>   
            <StyledMyNavSideDiv> 
              <StyledMobileButtonGroup>
                <s.Container
                  fd={"column"}
                  ai={"center"}
                >                   
                  <StyledRoundButton style={{ width: '60%' }}>
                    <Link to="/introduction" target={"_blank"} className="white">
                      INSTRUCTIONS
                    </Link>
                  </StyledRoundButton>   
                  <StyledRoundButton style={{ width: '60%', marginTop:20 }}>
                    <div onClick={() => {
                      setStatus("-200%");
                      onNewSearchClick();
                    }}>RARITY SEARCH</div>
                  </StyledRoundButton>
                  {/* <StyledRoundButton style={{ width: '60%', marginTop:20 }}>
                    <div onClick={() => {
                      setStatus("-200%");
                      onLeaderboardClick();
                    }}>LEADERBOARD</div>
                  </StyledRoundButton>    */}
                  <StyledRoundButton style={{ width: '60%', marginTop:20 }}>
                      <Link to="/leaderboard" target={"_blank"} className="white" onClick={() => {
                        setStatus("-200%")
                        onLeaderboardClick()}}>
                      LEADERBOARD
                      </Link>
                  </StyledRoundButton>
                  <StyledSelectTokenDetailBlock>
                    <StyledWalletButton className="advanced-input mrb">
                      <StyledScanSelect 
                        placeholder="COIN TYPE"
                        className="advanced-wallet"
                        value={common.searchOptions.coinType}
                        // defaultValue={''}
                        onChange={(e) => handleSearch(e, 'coinType')}
                      >
                        <option key={0} value={''}>{'ANY-COIN TYPE'}</option>
                        <option key={1} value={'Gold'}>Gold</option>
                        <option key={2} value={'Silver'}>Silver</option>
                        <option key={3} value={'Bronze'}>Bronze</option>                        
                      </StyledScanSelect>
                    </StyledWalletButton>
                    <StyledWalletButton className="advanced-input mb">
                      <StyledWalletInput
                        placeholder="WALLET"
                        className="advanced-wallet"
                        value={common.searchOptions.wallet}
                        onChange={(e) => handleSearch(e, 'wallet')}
                      />
                    </StyledWalletButton> 
                    <StyledWalletButton className="advanced-input mrb">
                      <StyledScanInput 
                        placeholder="NAME"
                        className="advanced-wallet"
                        value={common.searchOptions.name}
                        onChange={(e) => handleSearch(e, 'name')}
                      />
                    </StyledWalletButton>
                    <StyledWalletButton className="advanced-input mb">
                      <StyledScanSelect
                        placeholder="COUNTRY"
                        className="advanced-wallet"
                        value={common.searchOptions.country}
                        onChange={(e) => handleSearch(e, 'country')}
                      >
                        <option key={-1} value={''} style={{ maxWidth: '20px' }}>{'ANY-COUNTRY'}</option>
                        {
                          country && country.map((o, idx) => {
                            return <option key={idx} value={o.country} style={{ maxWidth: '20px' }}>
                                      {truncate(o.country, 20)}
                                   </option>
                          })
                        }
                      </StyledScanSelect>
                    </StyledWalletButton> 
                    <p className="white detail-title">TOKEN ID</p>
                    <StyledWalletButton className="advanced-input mrb">
                      <StyledScanInput 
                        type="number"
                        placeholder="FROM"
                        className="advanced-wallet"
                        value={common.searchOptions.tokenIdFrom}
                        onChange={(e) => handleSearch(e, 'tokenIdFrom')}
                      />
                    </StyledWalletButton>
                    <StyledWalletButton className="advanced-input mb">
                      <StyledWalletInput
                        type="number"
                        placeholder="TO"
                        className="advanced-wallet"
                        value={common.searchOptions.tokenIdTo}
                        onChange={(e) => handleSearch(e, 'tokenIdTo')}
                      />
                    </StyledWalletButton> 
                    <p className="white detail-title">YEAR</p>
                    <StyledWalletButton className="advanced-input mrb">
                      <StyledScanInput 
                        type="number"
                        placeholder="FROM"
                        className="advanced-wallet"
                        value={common.searchOptions.yearFrom}
                        onChange={(e) => handleSearch(e, 'yearFrom')}
                      />
                    </StyledWalletButton>
                    <StyledWalletButton className="advanced-input mb">
                      <StyledWalletInput
                        type="number"
                        placeholder="TO"
                        className="advanced-wallet"
                        value={common.searchOptions.yearTo}
                        onChange={(e) => handleSearch(e, 'yearTo')}
                      />
                    </StyledWalletButton> 
                    <p className="white detail-title">AGE</p>
                    <StyledWalletButton className="advanced-input mrb">
                      <StyledScanInput 
                        type="number"
                        placeholder="FROM"
                        className="advanced-wallet"
                        value={common.searchOptions.ageFrom}
                        onChange={(e) => handleSearch(e, 'ageFrom')}
                      />
                    </StyledWalletButton>
                    <StyledWalletButton className="advanced-input mb">
                      <StyledWalletInput
                        className="advanced-wallet"
                        type="number"
                        placeholder="TO"
                        value={common.searchOptions.ageTo}
                        onChange={(e) => handleSearch(e, 'ageTo')}
                      />
                    </StyledWalletButton>  
                    <StyledWalletButton
                      style={{ marginTop: '3%' }}
                      onClick={() => {
                        dispatch(doSearch(true));
                        setStatus('-200%');
                    }}>
                      SEARCH
                    </StyledWalletButton>  
                  </StyledSelectTokenDetailBlock>
                </s.Container>
              </StyledMobileButtonGroup>  
              <StyledMobileIconGroup>
                <StyledLink 
                  target={"_blank"} 
                  href="https://t.me/HOARDTOKEN"
                  style={{ marginRight: '8px' }}
                >
                  <i className="fab fa-telegram"></i>
                </StyledLink>
                <StyledMobileClose onClick={() => setStatus("-200%")}>&times;</StyledMobileClose>
                <StyledLink 
                  target={"_blank"} 
                  href="https://twitter.com/HOARDTOKEN"
                >
                  <i className="fab fa-twitter"></i>
                </StyledLink>                        
              </StyledMobileIconGroup>                   
            </StyledMyNavSideDiv>    
          </StyledMyNavSide> 
          <Modal size="regular" className="advanced-modal" style={{ width: '90% !important' }} active={showModal} toggler={() => closeModal()}>     
            <ModalBody className="advanced-modal">      
              {
                <StyledSelectTokenGroup>
                  <StyledSelectTokenNumber>ADVANCED SEARCH</StyledSelectTokenNumber>
                  <StyledSelectTokenDetailBlock>
                    <StyledWalletButton className="advanced-input mrb">
                      <StyledScanSelect 
                        placeholder="COIN TYPE"
                        className="advanced-wallet"
                        value={common.searchOptions.coinType}
                        // defaultValue={''}
                        onChange={(e) => handleSearch(e, 'coinType')}
                      >
                        <option key={0} value={''}>{'ANY-COIN TYPE'}</option>
                        <option key={1} value={'Gold'}>Gold</option>
                        <option key={2} value={'Silver'}>Silver</option>
                        <option key={3} value={'Bronze'}>Bronze</option>                        
                      </StyledScanSelect>
                    </StyledWalletButton>
                    <StyledWalletButton className="advanced-input mb">
                      <StyledWalletInput
                        placeholder="WALLET"
                        className="advanced-wallet"
                        value={common.searchOptions.wallet}
                        onChange={(e) => handleSearch(e, 'wallet')}
                      />
                    </StyledWalletButton> 
                    <StyledWalletButton className="advanced-input mrb">
                      <StyledScanInput 
                        placeholder="NAME"
                        className="advanced-wallet"
                        value={common.searchOptions.name}
                        onChange={(e) => handleSearch(e, 'name')}
                      />
                    </StyledWalletButton>
                    <StyledWalletButton className="advanced-input mb">
                      <StyledScanSelect
                        placeholder="COUNTRY"
                        className="advanced-wallet"
                        value={common.searchOptions.country}
                        onChange={(e) => handleSearch(e, 'country')}
                      >
                        <option key={-1} value={''}>{'ANY-COUNTRY'}</option>
                        {
                          country && country.map((o, idx) => {
                            return <option key={idx} value={o.country}>
                                      {truncate(o.country, 20)}
                                   </option>
                          })
                        }
                      </StyledScanSelect>
                    </StyledWalletButton> 
                    <p className="white detail-title">TOKEN ID</p>
                    <StyledWalletButton className="advanced-input mrb">
                      <StyledScanInput 
                        type="number"
                        placeholder="FROM"
                        className="advanced-wallet"
                        value={common.searchOptions.tokenIdFrom}
                        onChange={(e) => handleSearch(e, 'tokenIdFrom')}
                      />
                    </StyledWalletButton>
                    <StyledWalletButton className="advanced-input mb">
                      <StyledWalletInput
                        type="number"
                        placeholder="TO"
                        className="advanced-wallet"
                        value={common.searchOptions.tokenIdTo}
                        onChange={(e) => handleSearch(e, 'tokenIdTo')}
                      />
                    </StyledWalletButton> 
                    <p className="white detail-title">YEAR</p>
                    <StyledWalletButton className="advanced-input mrb">
                      <StyledScanInput 
                        type="number"
                        placeholder="FROM"
                        className="advanced-wallet"
                        value={common.searchOptions.yearFrom}
                        onChange={(e) => handleSearch(e, 'yearFrom')}
                      />
                    </StyledWalletButton>
                    <StyledWalletButton className="advanced-input mb">
                      <StyledWalletInput
                        type="number"
                        placeholder="TO"
                        className="advanced-wallet"
                        value={common.searchOptions.yearTo}
                        onChange={(e) => handleSearch(e, 'yearTo')}
                      />
                    </StyledWalletButton> 
                    <p className="white detail-title">AGE</p>
                    <StyledWalletButton className="advanced-input mrb">
                      <StyledScanInput 
                        type="number"
                        placeholder="FROM"
                        className="advanced-wallet"
                        value={common.searchOptions.ageFrom}
                        onChange={(e) => handleSearch(e, 'ageFrom')}
                      />
                    </StyledWalletButton>
                    <StyledWalletButton className="advanced-input mb">
                      <StyledWalletInput
                        className="advanced-wallet"
                        type="number"
                        placeholder="TO"
                        value={common.searchOptions.ageTo}
                        onChange={(e) => handleSearch(e, 'ageTo')}
                      />
                    </StyledWalletButton>  
                    <StyledWalletButton
                      style={{ marginTop: '3%' }}
                      onClick={() => {
                        dispatch(doSearch(true));
                        closeModal();
                    }}>
                      SEARCH
                    </StyledWalletButton>  
                  </StyledSelectTokenDetailBlock>
                </StyledSelectTokenGroup>
                
              }             
            </ModalBody>
          </Modal>
          <Modal size="lg" active={newSearchModal} toggler={() => closeNewSearchModal()}>
            <ModalBody className="bg-white nice-scroll">
              {
                common.isLoadingStatsData
                ?<StyledSelectTokenGroup>
                <div className="sk-chase">
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                </div>
            </StyledSelectTokenGroup>
            : common.isfinishLoadStatsData ?
              <div className="text-gray-600">
                <div className="absolute cursor-pointer top-2 right-4 text-4xl text-white" onClick={()=>setNewSearchModal(false)}>&times;</div>
                <div className="flex justify-center lg:justify-start">
                  <img src="/images/HOARDTOKENMAINBLACK.png" className="lg:ml-[5rem] w-[12.5rem]" />
                </div>
                <div className="flex flex-row flex-wrap justify-center lg:justify-start text-neutral-200">
                  <div className="w-[350px] mb-8 lg:mb-0">
                    <div><img src={coinidData.imageURL} className="w-full h-[350px] border" /></div>
                    <div className="text-base flex flex-row justify-between w-[100%] p-0.6">
                      <div className="w-[30%] mt-4">
                        <span className="ml-[-10px] w-[100%] text-gray-600">SEARCH COIN ID</span>
                        <div className="mt-[10px]"><input type="number" className="border rounded-[5px] border-solid border-[#fff] text-white bg-transparent h-[30px] w-[100px] text-center" onKeyPress={(e) => onIDChange(e)} id="coinid" /></div>
                      </div>
                      <div className="flex flex-row justify-between ml-10 flex-1 mt-4">
                        <div className="w-[30%] text-gray-600">
                          <div>FoundBy:</div>
                          <div>Where:</div>
                          <div>Date:</div>
                          <div>CoinAge:</div>
                          <div>Metal:</div>
                        </div>
                        <div className="w-[60%] text-gray-600">
                          <div>{coinidData.foundby}</div>
                          <div>{coinidData.where}</div>
                          <div>{coinidData.date}</div>
                          <div>{coinidData.coinage}</div>
                          <div>{coinidData.metal}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-end p-0.6">
                      <div className = "mt-[30px]">
                        <div className="ml-[-5px] mb-2 text-gray-600">TOTAL SCORE</div>
                        <div>{totalscore}</div>
                      </div>
                      <div className="p-[5px] csvLinkContainer active:opacity-70">
                        <CSVLink {...csvReport}>
                          <button className="p-[5px] border border-[#fff] cursor-pointer rounded-[5px] flex flex-row items-center">
                            <span>Export .CSV</span>
                            <BsDownload className="ml-2" />
                          </button>
                        </CSVLink>
                      </div>
                    </div>
                  </div>
                  <div className="ml-[15px] flex-1">
                    {/* <div className="grid gap-4 grid-cols-4 grid-rows-7"> */}
                    <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-4 mx-auto">
                      {
                        common.statsData.map((compo, index) => {
                          return (
                            <div className="mb-[3px]" key={index}>
                              <div className="ml-[-10px] text-gray-600 mb-[3px]">{compo.name}</div>
                              <PropertyDropdown type={compo.type} propList={compo.value} sendComponentValue={getComponentValue} value={componentValues[index]} index={index} name={compo.name} />
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              :<StyledSelectTokenGroup></StyledSelectTokenGroup>
              }
            </ModalBody>
          </Modal>
          <Modal size="lg" active={leaderBoardModal} toggler={() => closeLeaderBoardModal()}>
            <ModalBody className="bg-white nice-scroll">
              {
                common.isLoadingLeaderBoardData === true
                ?<StyledSelectTokenGroup>
                  <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                  </div>
                </StyledSelectTokenGroup>
                : <div className="text-gray-600">
                    <div className="w-full justify-center md:flex hidden">
                      <img src="/images/HOARDTOKENMAINBLACK.png" className="h-[100px]" />
                    </div>
                    <div className="md:text-[24px] text-[18px] mt-[10px] pb-[10px] mb-[10px] flex flex-row justify-between w-full border-b-[2px] border-white border-solid">
                      <div className="md:w-[50px] w-[36px] text-center">Rank</div>
                      <div className="md:w-[66px] w-[45px] text-center">Points</div>
                      <div className="w-[175px] text-center md:block hidden">Image</div>
                      <div className="md:w-[100px] w-[70px] text-center">Coin No.</div>
                      <div className="md:w-[280px] w-[120px] text-center">Wallet Address</div>
                      <div className="w-[105px] text-center md:block hidden">CSV Link</div>
                      <div className="w-[70px] text-center md:block hidden">Metal</div>
                      <div className="w-[105px] text-center md:block hidden">How Rare</div>
                      <div className="w-[50px] text-center md:block hidden">Mic1</div>
                      <div className="w-[50px] text-center md:block hidden">Mic2</div>
                      <div className="w-[50px] text-center md:block hidden">Mic3</div>
                    </div>
                    <div className="overflow-y-auto leaderboard nice-scroll">
                      {
                        common.leaderBoardData.map((item, index) => {
                          return(
                            <div className="flex flex-row justify-between md:text-[16px] text-[12px] py-[5px] w-full hover:bg-gray-200" key={index}>
                              <div className="md:w-[50px] w-[36px] text-center">{index + 1}</div>
                              <div className="md:w-[66px] w-[45px] text-center">{item.points}</div>
                              <div className="w-[175px] text-center md:block hidden"><img src={item.coinImage} className="w-full" /></div>
                              <div className="md:w-[100px] w-[60px] text-center">{item.coinNumber}</div>
                              <div className="md:w-[280px] w-[120px] text-center overflow-hidden text-ellipsis whitespace-nowrap">{item.walletOwner}</div>
                              <div className="w-[105px] text-center md:block hidden"><a href={item.linkToCsvData} target="_blank">{item.linkToCsvData}</a></div>
                              <div className="w-[70px] text-center md:block hidden">{item.metal}</div>
                              <div className="w-[105px] text-center md:block hidden">{item.howRare}</div>
                              <div className="w-[50px] text-center md:block hidden">{item.mic1}</div>
                              <div className="w-[50px] text-center md:block hidden">{item.mic2}</div>
                              <div className="w-[50px] text-center md:block hidden">{item.mic3}</div>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
              }
            </ModalBody>
          </Modal>
        </>   
    )
}

export default Navbar;