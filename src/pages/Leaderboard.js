import "animate.css/animate.min.css";
import {useSelector} from 'react-redux';
import styled from "styled-components";
import { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FaChevronDown } from 'react-icons/fa';

export const StyledSelectTokenGroup = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Leaderboard() {
    const common = useSelector((state) => state.common);
    const [ptsFilter, setPtsFilter] = useState("");
    const [metalFilter, setMetalFilter] = useState("");
    const [menu, setMenu] = useState(false);

    const onSearchChange = (e) => {
        setPtsFilter(e.target.value);
    }

    const toggle = () => {
        setMenu(!menu);
    }

    const onMetalClick = (met) => {
        setMetalFilter(met);
    }

    return (
        <div className="w-full">
            { common.isLoadingLeaderBoardData ? 
                <StyledSelectTokenGroup className="loadingdata">
                  <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                  </div>
                </StyledSelectTokenGroup>
                :<div className="text-gray-600 w-full md:px-16 px-2">
                    <div className="w-full flex justify-end flex-row gap-[20px] mt-[50px]">
                        <div className="flex items-center">
                            <div className="text-[20px] mr-[10px] text-center"><label>Search ID:</label></div>
                            <input type="number" className="w-[150px] bg-transparent border-white border-[1px] border-solid text-[20px] rounded px-[5px] py-[3px]" placeholder="Input ID" onChange={(e) => onSearchChange(e)}/>
                        </div>
                        <div className="w-[150px]">
                            <div>
                            <Dropdown className="w-full" isOpen={menu} toggle={toggle}>
                                <DropdownToggle className="w-full bg-black py-1 rounded-sm border border-slate-200 h-[40px] text-[20px]">
                                    <div className="w-full flex flex-row justify-between items-center">
                                        <div>{metalFilter}</div>
                                        <div className="border-l border-slate-200 border-solid pl-2 opacity-60">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu className="bg-black w-full border border-t-0 border-slate-200 border-solid max-h-[150px] overflow-y-auto overflow-x-hidden nice-scroll">
                                    <DropdownItem className="text-white h-[20px] propDropdownItem" onClick={() => onMetalClick("")}></DropdownItem>
                                    <DropdownItem className="text-white h-[20px] propDropdownItem" onClick={() => onMetalClick("Gold")}>Gold</DropdownItem>
                                    <DropdownItem className="text-white h-[20px] propDropdownItem" onClick={() => onMetalClick("Silver")}>Silver</DropdownItem>
                                    <DropdownItem className="text-white h-[20px] propDropdownItem" onClick={() => onMetalClick("Bronze")}>Bronze</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="md:text-[24px] text-[18px] mt-[50px] pb-[10px] mb-[10px] flex flex-row justify-between w-full border-b-[2px] border-white border-solid">
                        <div className="md:w-[50px] w-[36px] text-center">RANK</div>
                        <div className="md:w-[66px] w-[45px] text-center">PTS</div>
                        <div className="w-[100px] text-center md:block hidden">IMAGE</div>
                        <div className="md:w-[100px] w-[70px] text-center">COIN ID</div>
                        <div className="md:w-[280px] w-[120px] text-center">WALLET</div>
                        <div className="w-[150px] text-center md:block hidden">DATA</div>
                        <div className="w-[70px] text-center md:block hidden">METAL</div>
                        <div className="w-[105px] text-center md:block hidden">RARITY</div>
                        <div className="w-[50px] text-center md:block hidden">TBA</div>
                        <div className="w-[50px] text-center md:block hidden">TBA</div>
                        <div className="w-[50px] text-center md:block hidden">TBA</div>
                    </div>
                    <div className="overflow-y-auto leaderboard nice-scroll">
                        {
                        common.leaderBoardData.map((item, index) => {
                            return( item.num.includes(ptsFilter) && item.metal.includes(metalFilter) ?
                            <div className="flex flex-row justify-between relative md:text-[16px] text-[12px] py-[5px] w-full hover:bg-gray-200 hover:text-white hover:bg-opacity-20 items-center" key={index}>
                                <div className="md:w-[50px] w-[36px] text-center">{index + 1}</div>
                                <div className="md:w-[66px] w-[45px] text-center">{item.pts}</div>
                                <div className="w-[100px] text-center md:block hidden">
                                    <div id="picture1" className="flex justify-center">
                                        <div className="small">
                                            <img src={item.coin} className="w-full" />
                                            <img src={item.coin} className="w-full large fade" />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-[100px] w-[60px] text-center">{item.num}</div>
                                <div className="md:w-[280px] w-[120px] text-center overflow-hidden text-ellipsis whitespace-nowrap">{item.wallet}</div>
                                <div className="w-[150px]  text-center md:block hidden break-all"><a href={item.data} target="_blank">{item.data}</a></div>
                                <div className="w-[70px] text-center md:block hidden">{item.metal}</div>
                                <div className="w-[105px] text-center md:block hidden">{item.rarity}</div>
                                <div className="w-[50px] text-center md:block hidden">{item.mic1}</div>
                                <div className="w-[50px] text-center md:block hidden">{item.mic2}</div>
                                <div className="w-[50px] text-center md:block hidden">{item.mic3}</div>
                            </div> : null
                            );
                        })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Leaderboard;