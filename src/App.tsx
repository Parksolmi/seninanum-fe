import './styles/reset.css';
import React, { useState } from 'react';
import StyleButton from './components/common/Button';
import { Route, Routes } from 'react-router-dom';
import NavLayout from './layouts/NavLayout';

function App() {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  return (
    <>
      <h1>시니나눔</h1>
      <div>시니나눔</div>
      <StyleButton children="다음" varient="dong" />

      {/* // <Routes>
    //   <Route element={<NavLayout />}></Route>
    //   //동백 //나리
    // </Routes> */}
    </>
  );
}

export default App;
