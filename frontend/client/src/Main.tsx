import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RootState } from "./store/Store"
import { useSelector } from "react-redux"
import { CookiesProvider } from "react-cookie"
import { EventSourcePolyfill } from "event-source-polyfill"
import { serverUrl } from "./urls"

import MainPage from "./components/MainPage"
import { CheckPassword } from "./components/Auth/CheckPassword"
import ShopPage from "./components/ShopPage"
import TimecapsulePage from "./components/TimecapsulePage"
import Card from "./components/Card"
import Friend from "./components/Friend"
import { List, Request } from "./components/Friend"
import Login from "./components/Auth/Login"
import { SignUp } from "./components/Auth/SignUp"
import { Logout } from "./components/Auth/Logout"
import { FindPassword } from "./components/Auth/FindPassword"
import { LandingPage } from "./components/LandingPage"
import Tutorial from "./components/Tutorial"
import { DummyKakao } from "./components/Auth/DummyKakao"
import Menu from "./components/Menu"
import SavedTimecapsule from "./components/SavedTimecapsule"
import Participate from "./components/Participate"
import { UserInfoChange } from "./components/Auth/UserInfoChange"
import SelectType from "./components/SelectType"
import ClassicCapsule from "./components/ClassicCapsule"
import { ThemeProvider } from "styled-components"
import RecordCapsule from "./components/RecordCapsule"
import GoalCapsule from "./components/GoalCapsule"
import SelectTheme from "./components/SelectTheme"
import UserSearch from "./components/UserSearch"
import TimeCapsuleDetail from "./components/TimeCapsuleDetail"

function Main() {
  const themeState = useSelector((state: RootState) => state.theme)
  const token = useSelector((state: RootState) => state.auth.accessToken)

  const styleElement = document.createElement("style")
  styleElement.innerHTML = `
    html {
      background: ${themeState.colorTheme} no-repeat center fixed;
      background-size: cover;
    }
  `
  useEffect(() => {
    let eventSource: EventSource
    const fetchSse = () => {
      try {
        eventSource = new EventSourcePolyfill(serverUrl + "sse/test?no=10", {
          headers: {
            token: token ? token : "",
          },
        })

        eventSource.onmessage = (event) => {
          const res = event.data
          console.log(res)
        }

        eventSource.addEventListener("custom-event", (event) => {
          console.log(event)
        })

        eventSource.onerror = (event) => {
          console.log("Error event:", event)

          eventSource.close()
        }
      } catch (error) {}
    }
    if (token) {
      fetchSse()
    }
    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  })

  document.head.appendChild(styleElement)
  return (
    <ThemeProvider theme={themeState}>
      <div className="Main">
        <CookiesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/user/" element={<CheckPassword />}></Route>
              <Route path="/user-info/" element={<UserInfoChange />}></Route>
              <Route path="/shop/" element={<ShopPage />}></Route>
              <Route path="/timecapsule/" element={<TimecapsulePage />}></Route>
              <Route path="/card/" element={<Card />}></Route>
              <Route path="/friend/" element={<Friend />}>
                <Route path="list" element={<List />}></Route>
                <Route path="request" element={<Request />}></Route>
              </Route>
              <Route path="/friend/search" element={<UserSearch />}></Route>
              <Route path="/login/" element={<Login />}></Route>
              <Route path="/signup/" element={<SignUp />}></Route>
              <Route path="/logout/" element={<Logout />}></Route>
              <Route path="/main/" element={<MainPage />}></Route>
              <Route path="/findPassword/" element={<FindPassword />}></Route>
              <Route path="/tutorial/" element={<Tutorial />}></Route>
              <Route path="/dummykakao/" element={<DummyKakao />}></Route>
              <Route path="/menu/" element={<Menu />}></Route>
              <Route
                path="/savetimecapsule/"
                element={<SavedTimecapsule />}
              ></Route>
              <Route path="/participate/" element={<Participate />}></Route>
              <Route path="/selecttype/" element={<SelectType />}></Route>
              <Route path="/classic/" element={<ClassicCapsule />}></Route>
              <Route path="/record/" element={<RecordCapsule />}></Route>
              <Route path="/goal/" element={<GoalCapsule />}></Route>
              <Route path="/selecttheme/" element={<SelectTheme />}></Route>
              <Route
                path="/timecapsule/detail/:capsuleId/"
                element={<TimeCapsuleDetail />}
              ></Route>
            </Routes>
          </BrowserRouter>
        </CookiesProvider>
      </div>
    </ThemeProvider>
  )
}

export default Main
