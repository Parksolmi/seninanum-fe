import './styles/reset.css';
import React, { useState } from 'react';
import CheckBox from './components/common/CheckBox';
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
      <CheckBox
        id="checkbox_labeled"
        checked={isChecked}
        onChange={onChange}
        label="약관에 모두 동의"
      />
      {/* // <Routes>
    //   <Route element={<NavLayout />}></Route>
    //   //동백 //나리
    // </Routes> */}
    </>
  );
}

export default App;
