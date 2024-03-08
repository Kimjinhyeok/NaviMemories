import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import cookies from "../../../Data/cookies";
export default function CardHtml({ item, updatePassed, version }) {
  return (
    <CardLayout>
      <CardWrapper>
        <CardTheme theme={item.theme} />
        <div
          className={"mt-2 flex flex-1 flex-col whitespace-pre-wrap text-left"}
        >
          <CardContentPosition {...item} />
          <div className={"mt-1"}>
            <CardContent version={version} {...item} />
          </div>
          <CardCategory category={item.category} />
        </div>
        <CardOptionActions cookies={cookies} item={item} update={updatePassed}/>
			</CardWrapper>
    </CardLayout>
  );
}

const CardLayout = ({ children }) => (
  <div className="w-full h-full flex justify-center items-center">
    <div
      className={"w-[300px] h-full flex justify-center items-center rounded"}
    >
      {children}
    </div>
  </div>
);
const CardWrapper = ({children}) => (
	<div className={"flex flex-col relative w-[400px] h-[400px] rounded border-2 p-2"}>
		{children}
	</div>
)
const CardTheme = ({ theme="" }) => (
	theme ? <div className={"text-xl"}>{theme}</div> : <></>
)
const CardContentPosition = ({ bible_name="", chapter=0, f_verse=0, l_verse=0 }) => (
	<div className={"flex flex-row items-center mt-2 mb-1 space-x-1 text-green-600"}>
		<div>{bible_name}</div>
		<div>{chapter}</div>
		<span>:</span>
		<div className={"flex flex-row flex-1 space-x-1"}>
			<span>{f_verse}</span>
			{l_verse ? (
				<>
					<span>~</span>
					<span>{l_verse}</span>
				</>
			) : (
				<></>
			)}
		</div>
	</div>
)
const CardContent = ({version, verse_gae="", verse_kor=""}) => (
	<div>
		{version ? verse_gae : verse_kor || verse_gae}
	</div>
)
const CardCategory = ({category}) => (
	<div className={"mt-4 text-right text-gray-600 font-light"}>{category}</div>
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