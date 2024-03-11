import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, Radio, RadioGroup, TextField, Typography } from "@mui/material";

import React, { useContext } from "react";
import { Context } from "../../../../Utils/Context";
import { useNavigate } from "react-router";

export default function PrepareForMember(props) {
  const navigate = useNavigate();

  const {
    state: { version },
  } = useContext(Context);
  const InitOptions = {
    participation: 100,
    include242: "yes", //with 242 verse
    themeOf242: "yes",
    precedence: "cn",
    version: version ? "gae" : "kor",
  };

  const [options, setOptions] = React.useState(InitOptions);

  const loadingCardList = async function () {
    navigate("/test/loading", {
      state: {
        path: "/test/exam",
        version: options.version,
        include242: options.include242,
        themeOf242: options.themeOf242,
        participation: options.participation,
        precedence: options.precedence,
      },
    });
  };
  return (
    <Container maxWidth="md" className="py-4 h-full">
      <div className="flex flex-col h-full space-y-4">
        <Typography component="div" variant="h5">
          암송 실기 테스트 설정
        </Typography>
        <div className="flex-1 flex flex-col">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="출전 구절 수"
                type="number"
                value={options.participation}
                required
                onChange={(event) =>
                  setOptions({ ...options, participation: event.target.value })
                }
                InputProps={{
                  inputProps: {
                    min: 5,
                    step: 10,
                  },
                  endAdornment: (
                    <InputAdornment position="end">구절</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel component="legend">242구절 선택</FormLabel>
                <RadioGroup
                  value={options.include242}
                  onChange={(event) => {
                    setOptions({ ...options, include242: event.target.value });
                  }}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="네"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="아니요"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl disabled={options.include242 != "yes"}>
                <FormLabel component="legend">242 주제 포함</FormLabel>
                <RadioGroup
                  value={options.themeOf242}
                  onChange={(event) => {
                    setOptions({ ...options, themeOf242: event.target.value });
                  }}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="네"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="아니요"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel component="legend">선행 문제 선택</FormLabel>
                <RadioGroup
                  value={options.precedence}
                  onChange={(event) => {
                    setOptions({ ...options, precedence: event.target.value });
                  }}
                >
                  <FormControlLabel
                    label="내용"
                    value="cn"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="장절"
                    value="cv"
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel component="legend">역본 선택</FormLabel>
                <RadioGroup
                  value={options.version}
                  onChange={(event) => {
                    setOptions({ ...options, version: event.target.value });
                  }}
                >
                  <FormControlLabel
                    label="개역한글"
                    value="kor"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="개역개정"
                    value="gae"
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <div className="mt-2 w-full">
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={loadingCardList}
            >
              다음
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
