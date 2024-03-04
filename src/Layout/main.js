import { Container } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import AppBarComponent from "./appbar";
import RecitationCardListComponent from "./Cards";
import UnitPageComponent from "./Check/Unit/unitPage";
import IntroPageComponent from "./intro.page";
import OYOIndex from "./OYO";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Provider as ContextProvider } from "../Utils/Context";
import RecitationExam from "./Check/Exam/Test";
import PrepareForMember from "./Check/Exam/Prepare/forMember";
import PrepareForGuest from "./Check/Exam/Prepare/forGuest";
import RecitationLoading from "./Check/Exam/loading";
import RecitationResult from "./Check/Exam/result";

export default function MainComponent(props) {
  const checkUserSignuped = function () {
    const authtoken = Cookies.get("authtoken");
    const username = Cookies.get("username");
    if (authtoken && !username) {
      const decoded = jwtDecode(authtoken);
      const decodedUsername = decoded.u_n;
      Cookies.set("username", decodedUsername);
    }
  };

  useEffect(() => {
    checkUserSignuped();
  }, []);
  return (
    <div className="h-full flex flex-col">
      <ContextProvider>
        <AppBarComponent {...props} />
        <Container className={`flex-1 py-2`}>
          <Routes>
            <Route path="/test">
              <Route path="exam" element={<RecitationExam />} />
              <Route path="prepare" element={<PrepareForMember />} />
              <Route path="v_prepare" element={<PrepareForGuest />} />
              <Route path="loading" element={<RecitationLoading />} />
              <Route path="result" element={<RecitationResult />} />
            </Route>
            <Route path="/check/*" element={<UnitPageComponent />} />
            <Route
              path="/recitation/:category"
              element={<RecitationCardListComponent />}
            />
            <Route path="/oyo/:path" element={<OYOIndex />} />
            <Route path="/" excat element={<IntroPageComponent />} />
          </Routes>
        </Container>
      </ContextProvider>
    </div>
  );
}
