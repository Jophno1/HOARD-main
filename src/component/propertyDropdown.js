import React, { useEffect, useState, useRef } from "react";
import { FaChevronDown } from 'react-icons/fa';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const PropertyDropdown = (props) => {
  const [menu, setMenu] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [curSel, setCurSel] = useState('');
  const inputFilter = useRef();
  //const propList = props.propList;
  const [propList, setPropList] = useState(props.propList);
  const type = props.type;
  const name = props.name;

  useEffect(() => {
    // if(curSel !== ''){
    setCurSel(props.value === undefined ? '' : `${props.value.name}   = ${props.value.point} PTS`);
    // }
  }, [props.value])

  const toggle = () => {
    if (!menu && type === false) inputFilter.current.focus();
    setMenu((prevState) => !prevState);
    setPropList(props.propList);
  };

  const imgPropClick = () => {
    setImgModal(true);
  }

  const imgClick = (item) => {
    let flag = 0;
    if(curSel !== ''){
        flag = parseInt(((((curSel.replace(/\s/g, '')).split('='))[1]).split('P'))[0]);
    }
    setCurSel(`${item.name}   = ${item.point} PTS`);
    props.sendComponentValue(item.point - flag, props.index, item.name, item.point);
    setImgModal(false);
  }

  const propSearchInput = (ev) => {
    const NewArray = props.propList.filter((e, index) => e.name.toUpperCase().includes(ev.toUpperCase()) === true);
    setPropList(NewArray);
  }

  const onSelList = (item) => {
    let flag = 0;
    if(item === null){
      if(curSel !== ''){
        flag = parseInt(((((curSel.replace(/\s/g, '')).split('='))[1]).split('P'))[0]);
      }else{
        flag = 0;
      }
      setCurSel('');
      props.sendComponentValue(-flag, props.index, '', 0);
    } else{
      if(curSel !== '')
        flag = parseInt(((((curSel.replace(/\s/g, '')).split('='))[1]).split('P'))[0]);
      setCurSel(`${item.name}   = ${item.point} PTS`);
      props.sendComponentValue(item.point - flag, props.index, item.name, item.point);
    }
  }
  return (
    <div>
      {type === false || name === "Women Right Facing" || name === "Middle Rings" || name === "Men Right Facing" || name === "Women Left Facing" || name === "Men Left Facing" || name === "Inner Textures" ?
      <Dropdown isOpen={menu} toggle={toggle} className="w-48">
        <DropdownToggle className="bg-black py-1 rounded-sm border border-slate-200 w-full h-[35px]">
            <div className="text-white flex flex-row items-center justify-between">
                <div className="text-left">
                  {type && curSel.length > 0 && (name !== "Women Right Facing" && name !== "Middle Rings" && name !== "Men Right Facing" && name !== "Women Left Facing" && name !== "Men Left Facing") ?
                  <div className="flex flex-row justify-between">
                    <div id="picture">
                      <div className="small"><img src={((curSel.replace(/\s/g, '')).split('='))[0]} />
                      <img className="large fade" src={((curSel.replace(/\s/g, '')).split('='))[0]} />
                      </div>
                    </div>
                      <div className="ml-[5px]">&nbsp;&nbsp;= {(curSel.split('='))[1]}</div>
                  </div>
                  : curSel.length > 0 ? <div>{curSel}</div>: <div></div>
                  }
                </div>
                <div className="border-l border-slate-200 border-solid pl-2 opacity-60">
                    <FaChevronDown />
                </div>
            </div>
        </DropdownToggle>
        {type === false ? <DropdownMenu className="bg-black w-full border border-t-0 border-slate-200 border-solid max-h-[250px] overflow-y-auto overflow-x-hidden nice-scroll">
          <div className="propDropdownItem h-[36px] w-full flex justify-center py-1">
            <input type="text" autoFocus ref={inputFilter} className="text-white bg-gray-200 bg-opacity-20 p-1 rounded-md w-[90%]" onChange={(e) => propSearchInput(e.target.value)} />
          </div>
          <DropdownItem onClick={() => onSelList(null)} key = {propList.length + + 1} className="text-white propDropdownItem h-[20px]"></DropdownItem>
            {
              propList.map((item,index) => {
                return (
                  <DropdownItem onClick={() => onSelList(item)} key={index} className="text-white propDropdownItem h-[20px]" >
                    <div className="flex flex-row ">
                      <div className="text-white">
                        {
                          type ?
                          <img className="w-[20px]" src={item.name} />
                          : item.name
                        }
                      </div>
                      <div className="text-white ml-[10px]">
                        &nbsp;&nbsp;= {item.point} PTS
                      </div>
                    </div>
                  </DropdownItem>
                )
              })
            }
        </DropdownMenu>
        : <DropdownMenu className="bg-black w-full border border-t-0 border-slate-200 border-solid max-h-[250px] overflow-y-auto overflow-x-hidden nice-scroll">
            <DropdownItem onClick={() => onSelList({name: "Yes", point: propList[0].point})} key={51684} className="text-white propDropdownItem h-[20px]" >
              <div className="flex flex-row ">
                <div className="text-white">
                  Yes
                </div>
                <div className="text-white ml-[10px]">
                  &nbsp;&nbsp;= {propList[0].point} PTS
                </div>
              </div>
            </DropdownItem>
            <DropdownItem onClick={() => onSelList({name: "No", point: "0"})} key={51685} className="text-white propDropdownItem h-[20px]" >
              <div className="flex flex-row ">
                <div className="text-white">
                  No
                </div>
                <div className="text-white ml-[10px]">
                  &nbsp;&nbsp;= 0 PTS
                </div>
              </div>
            </DropdownItem>
        </DropdownMenu>
        }
      </Dropdown>
      : curSel.length > 0 ? 
      <div className="bg-black px-2 py-1 rounded-sm border border-slate-200 h-[35px] w-48 flex flex-row items-center justify-between propImgButton">
          <div className="flex flex-row items-center flex-1 pr-2 cursor-pointer" onClick={() => imgPropClick()}>
            <div id="picture">
              <div className="small"><img src={((curSel.replace(/\s/g, '')).split('='))[0]} />
              <img className="large fade" src={((curSel.replace(/\s/g, '')).split('='))[0]} />
              </div>
            </div>
            <div className="ml-[5px]">&nbsp;&nbsp;= {(curSel.split('='))[1]}</div>
          </div>
          <div className="text-white text-xl pl-2 pr-1 cursor-pointer opacity-80" onClick={() => onSelList(null)}>&times;</div>
      </div> : <button className="bg-black py-1 rounded-sm border border-slate-200 w-full h-[35px] w-48 propImgButton" onClick={() => imgPropClick()}></button>
      }
      {imgModal && <div className="absolute inset-0 w-full h-full flex justify-center">
        <div className="fixed z-10 mt-[5%] w-[90%] xl:w-[60%] h-[500px] 2xl:h-[70%] mx-auto bg-black rounded-xl border-2 border-white border-solid overflow-y-auto flex flex-row flex-wrap items-center justify-center py-8 nice-scroll">
          <div className="absolute cursor-pointer top-2 right-4 text-4xl text-white" onClick={()=>setImgModal(false)}>&times;</div>
          {propList.map((item,index) => {
            return (
              <div className="w-[30%] cursor-pointer p-4 rounded-lg hover:bg-gray-200 hover:bg-opacity-20" onClick={() => imgClick(item)} key={index}>
                <img width="200" height="200" src={item.name} />
                <div className="text-center">{item.point} PTS</div>
              </div>
            )
          })}
        </div>
        <div className="absolute inset-0" onClick={() => setImgModal(false)}></div>
      </div>}
    </div>
  );
};

export default PropertyDropdown;
