import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import OyoUsecase from "../../../Usecase/oyo/oyo";
import OYOCardManage from "./list";
import OyoEmptyCard from "./empty.card";
import { Container } from "@mui/material";

export default function OyoManagePage() {

  const [OYORow, setOYORow] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      const res = await OyoUsecase.getOyoCardList();
      if(res instanceof Error) {
        const {message} = res.response.data;
        enqueueSnackbar(message || "OYO 카드를 불러오는 도중 오류가 발생했습니다.", {variant : 'error'})
      } else {
        setOYORow(res);
      }
    })()
  }, [])

  return (
    <Container maxWidth="sm" sx={{ position: 'relative', height: '100%', width: '100%', padding: '8px 0 8px 0 !important' }}>
      {
        OYORow && OYORow.length > 0
        ? <OYOCardManage OYORow={OYORow} setOYORow={setOYORow} />
        : <OyoEmptyCard />
      }
    </Container>
  )
}