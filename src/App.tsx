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
import RegisterRecruitFieldPage from './pages/recruit/RegisterRecruitFieldPage';
import RegisterRecruitMethodPage from './pages/recruit/RegisterRecruitMethodPage';
import RegisterRecruitContentPage from './pages/recruit/RegisterRecruitContentPage';
import RegisterProfileCareerPage from './pages/career/RegisterProfileCareerPage';
import RegisterProfileCareerAddPage from './pages/career/RegisterProfileCareerAddPage';
import RegisterProfileIntroductionPage from './pages/career/RegisterProfileIntroductionPage';
import RegisterProfileConditionPage from './pages/career/RegisterProfileConditionPage';
import ViewRecruitList from './pages/recruit/ViewRecruitList';
import ViewRecruitDetail from './pages/recruit/ViewRecruitDetail';
import ViewProfileCareer from './pages/career/ViewProfileCareer';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SignupIndexPage />} />
        <Route path="/signup/usertype" element={<ChooseTypePage />} />
        <Route path="/signup/policy" element={<AgreePolicyPage />} />
        <Route path="/signup/profile" element={<RegisterProfilePage />} />
        <Route path="/auth/kakao/callback" element={<KakaoAuthHandle />} />
        {/* 구인글 등록 */}
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
        {/* 구인글 조회 */}
        <Route path="/view/recruit/list" element={<ViewRecruitList />} />
        <Route
          path="/view/recruit/:recruitId"
          element={<ViewRecruitDetail />}
        />
        {/* 경력 프로필 등록 */}
        <Route
          path="/register/profile/career"
          element={<RegisterProfileCareerPage />}
        />
        <Route
          path="/register/profile/career/add"
          element={<RegisterProfileCareerAddPage />}
        />
        <Route
          path="/register/profile/introduction"
          element={<RegisterProfileIntroductionPage />}
        />
        <Route
          path="/register/profile/condition"
          element={<RegisterProfileConditionPage />}
        />
        {/* 경력 프로필 조회 */}
        <Route
          path="/view/profile/career/:profileId"
          element={<ViewProfileCareer />}
        />
        <Route element={<NavLayout />}>
          <Route path="/home" element={<HomeIndexPage />} />
          <Route path="/chat" element={<ChatIndexPage />} />
          <Route path="/community" element={<CommunityIndexPage />} />
          <Route path="/mypage" element={<MyIndexPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
