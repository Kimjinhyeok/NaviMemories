import { AddSharp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function OyoEmptyCard({}) {

  const navigator = useNavigate();

  const onClickCreate = () => {
    navigator('/oyo/template')
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
      <Typography variant="h6" component='div'>생성된 OYO 카드가 없습니다. 카드를 등록해주세요.</Typography>
      <div role="button" onClick={onClickCreate} className='w-80 h-40 rounded-md border border-blue-500 flex justify-center items-center space-x-2 hover:shadow-lg hover:font-semibold'>
        <AddSharp color='primary' />
        <span>생성하기</span>
      </div>
    </div>
  )
}