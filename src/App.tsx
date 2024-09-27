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
import ChatPageDong from './pages/chat/ChatPageDong';
import ChatPageNari from './pages/chat/ChatPageNari';
import ViewProfileCareer from './pages/career/ViewProfileCareer';
import ProgressLayout from './layouts/ProgressLayout';
import WalkThroughIndexPage from './pages/walkthrough/WalkThroughIndexPage';
import RegisterProfileCertificatePage from './pages/career/RegisterProfileCertificatePage';
import ViewMyProfileDongPage from './pages/mypage/ViewMyProfileDongPage';
import ViewMyProfileNariPage from './pages/mypage/ViewMyProfileNariPage';

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
        <Route path="/walkthrough" element={<WalkThroughIndexPage />} />
        {/* 구인글 등록 */}
        <Route path="/register/recruit" element={<ProgressLayout />}>
          <Route path="field" element={<RegisterRecruitFieldPage />} />
          <Route path="method" element={<RegisterRecruitMethodPage />} />
          <Route path="content" element={<RegisterRecruitContentPage />} />
        </Route>
        {/* 구인글 조회 */}
        <Route path="/view/recruit/list" element={<ViewRecruitList />} />
        <Route
          path="/view/recruit/:recruitId"
          element={<ViewRecruitDetail />}
        />
        {/* 경력 프로필 등록 */}
        <Route path="/register/profile" element={<ProgressLayout />}>
          <Route
            path="career/:profileId"
            element={<RegisterProfileCareerPage />}
          />
          <Route
            path="introduction/:profileId"
            element={<RegisterProfileIntroductionPage />}
          />
          <Route
            path="condition/:profileId"
            element={<RegisterProfileConditionPage />}
          />
        </Route>
        <Route
          path="/register/profile/career/add"
          element={<RegisterProfileCareerAddPage />}
        />
        <Route
          path="/register/profile/certificate"
          element={<RegisterProfileCertificatePage />}
        />
        {/* 경력 프로필 조회 */}
        <Route
          path="/view/profile/career/:profileId"
          element={<ViewProfileCareer />}
        />
        {/* 채팅 */}
        <Route path="/chatroom/dong" element={<ChatPageDong />} />
        <Route path="/chatroom/nari" element={<ChatPageNari />} />
        {/* 마이페이지 */}
        <Route
          path="/view/myprofile/dong/:profileId"
          element={<ViewMyProfileDongPage />}
        />
        <Route
          path="/view/myprofile/nari/"
          element={<ViewMyProfileNariPage />}
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
