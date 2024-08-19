import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useMemo } from "react";
import cookies from "../../../Data/cookies";
import { useSelector } from "react-redux";
import { KEY_HIDE_OPTIONS } from "../../../Redux/hideOptions/action";
import { useEffect } from "react";
export default function CardHtml({ item, idx=0, length=0, updatePassed, version }) {

	const hideOptions = useSelector(state => state[KEY_HIDE_OPTIONS]);
	const commonShow = useMemo(() => !(hideOptions.cv || hideOptions.cn), [hideOptions]);
  return (
    <CardLayout>
      <CardWrapper>
        <CardTheme show={commonShow} theme={item.theme} />
        <div
          className={"mt-2 flex flex-1 flex-col whitespace-pre-wrap text-left"}
        >
          <CardContentPosition show={!hideOptions.cv} {...item} />
          <div className={"mt-1 flex-1"}>
            <CardContent show={!hideOptions.cn} version={version} {...item} />
          </div>
          <CardBottom show={commonShow} category={item.category} idx={idx} length={length} />
        </div>
        <CardOptionActions cookies={cookies} item={item} update={updatePassed}/>
			</CardWrapper>
    </CardLayout>
  );
}

const CardLayout = ({ children }) => (
  <div className="w-full h-full flex justify-center items-center xs:scale-100 lg:scale-150">
    <div
      className={"w-[300px] h-full flex justify-center items-center rounded"}
    >
      {children}
    </div>
  </div>
);
const CardWrapper = ({children}) => (
	<div className={"flex flex-col relative w-[400px] h-[300px] rounded border-2 p-2"}>
		{children}
	</div>
)
const CardTheme = ({ show = true, theme="" }) => (
	theme ? <div className={"h-6 text-xl"}>{show ? theme : ""}</div> : <></>
)
const CardContentPosition = ({ show=true, bible_name="", chapter=0, f_verse=0, l_verse=0 }) => (
	<div className={"h-7 flex flex-row items-center mt-2 mb-1 space-x-1 text-green-600"}>
		{
			show 
			&&
				<>
					<div>{bible_name}</div>
					<div>{chapter}</div>
					<span>:</span>
					<div className={"flex flex-row flex-1 space-x-1"}>
						<span>{f_verse}</span>
						{l_verse ? (
							<>
								,
								<span>{l_verse}</span>
							</>
						) : (
							<></>
						)}
					</div>
				</>
		}
	</div>
)
const CardContent = ({show=true, version, verse_gae="", verse_kor=""}) => (
	<div>
		{show && (version ? verse_gae : verse_kor || verse_gae)}
	</div>
)
const CardBottom = ({show=true, category, idx=0, length=0}) => (
	<div className={"mt-4 flex justify-between items-end text-sm text-gray-600 font-light"}>
		<div className="">
			{show ? category : ''}
		</div>
		<div className="">
			{idx+1}/{length}
		</div>
	</div>
)
const CardOptionActions = ({ cookies={}, item={}, update={} }) => {
	
	const handleClickUpdate = (ev) => update(ev, item)
	return (
		cookies.isLogin() 
		? (
				<div className={"absolute top-0 right-2"}>
					<FormControlLabel
						checked={
							item.passed === null || item.passed === undefined
								? false
								: item.passed
						}
						value={
							item.passed === null || item.passed === undefined
								? false
								: item.passed
						}
						control={<Checkbox color="primary" />}
						label="암송"
						labelPlacement="start"
						onChange={handleClickUpdate}
					/>
				</div>
			) 
		: (
			<></>
		)
	)
}