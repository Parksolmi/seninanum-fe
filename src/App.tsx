import GlobalStyle from './styles/GlobalStyle';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import NavLayout from './layouts/NavLayout';
import ChatIndexPage from './pages/chat/ChatIndexPage';
import CommunityIndexPage from './pages/community/CommunityIndexPage';
import HomeIndexPage from './pages/home/HomeIndexPage';
import MyIndexPage from './pages/mypage/MyIndexPage';
import ChooseTypePage from './pages/signup/ChooseTypePage';
import AgreePolicyPage from './pages/signup/AgreePolicyPage';
import RegisterProfilePage from './pages/signup/RegisterProfilePage';
import SignupIndexPage from './pages/signup/SignupIndexPage';
import KakaoAuthHandle from './pages/signup/KakaoAuthHandle';
import RegisterRecruitFieldPage from './pages/home/RegisterRecruitFieldPage';
import RegisterRecruitMethodPage from './pages/home/RegisterRecruitMethodPage';
import RegisterRecruitContentPage from './pages/home/RegisterRecruitContentPage';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/signup" element={<SignupIndexPage />} />
        <Route path="/signup/usertype" element={<ChooseTypePage />} />
        <Route path="/signup/policy" element={<AgreePolicyPage />} />
        <Route path="/signup/profile" element={<RegisterProfilePage />} />
        <Route path="/auth/kakao/callback" element={<KakaoAuthHandle />} />

        <Route
          path="/register/recruit/field"
          element={<RegisterRecruitFieldPage />}
        />
        <Route
          path="/register/recruit/method"
          element={<RegisterRecruitMethodPage />}
        />
        <Route
          path="/register/recruit/content"
          element={<RegisterRecruitContentPage />}
        />
        <Route element={<NavLayout />}>
          <Route path="/" element={<HomeIndexPage />} />
          <Route path="/chat" element={<ChatIndexPage />} />
          <Route path="/community" element={<CommunityIndexPage />} />
          <Route path="/mypage" element={<MyIndexPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
