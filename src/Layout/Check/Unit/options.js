import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ArrowRightAlt, KeyboardArrowDown, KeyboardArrowUp, Shuffle } from '@mui/icons-material'
import CategorySelect from "../../categorySelect";
import { useState } from "react";
import { BibleVersion, TestOrderType } from "../../../Data/common";

export default function CheckOptions({ options={}, changeOptions=()=>{} }) {

  const [open, setOpen] = useState(false);

  const onHandleOpen = () => {
    setOpen(!open);
  }
  
  const handleOrderTypeChange = function (event) {
    const value = event.target.value;
    const newOptions = { ...options, orderType: value };
    changeOptions("order", newOptions);

  }
  const handleVersionChange = function (event) {
    const value = event.target.value;
    const newOptions = { ...options, version: value };
    changeOptions("version", newOptions);

  }
  const handleSeriesChange = async function (event) {
    const value = event.target.value;
    const newOptions = { ...options, series: value };
    changeOptions("series", newOptions);
  }
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", height: "100%" }}
      className="mt-2 border rounded-[4px] flex flex-col flex-1"
    >
      <div className={`flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0  actions ${open ? "overflow-hidden h-0" : "h-auto"}`}>
        <div>
          <CategorySelect
            value={options.series}
            onChange={handleSeriesChange}
          />
        </div>
        <FormControl>
          <FormLabel component="legend">진행 순서</FormLabel>
          <RadioGroup
            row={true}
            value={options.orderType}
            onChange={handleOrderTypeChange}
          >
            <FormControlLabel
              value={TestOrderType.STRIGHT}
              control={<Radio />}
              label={<ArrowRightAlt />}
              title="시리즈 순서"
            />
            <FormControlLabel
              value={TestOrderType.RANDOM}
              control={<Radio />}
              label={<Shuffle />}
              title="무작위"
            />
          </RadioGroup>
        </FormControl>
        {options.series != 500 ? (
          <FormControl>
            <FormLabel component="legend">역본</FormLabel>
            <RadioGroup
              row={true}
              value={options.version}
              onChange={handleVersionChange}
            >
              <FormControlLabel
                value={BibleVersion.kor}
                control={<Radio />}
                label="개역한글"
              ></FormControlLabel>
              <FormControlLabel
                value={BibleVersion.gae}
                control={<Radio />}
                label="개정개역"
              ></FormControlLabel>
            </RadioGroup>
          </FormControl>
        ) : (
          <></>
        )}
      </div>
      <Button onClick={onHandleOpen} startIcon={open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}  size="small"  >
        옵션 {!open ? "닫기" : "열기"}
      </Button>
    </Container>
  );
}
