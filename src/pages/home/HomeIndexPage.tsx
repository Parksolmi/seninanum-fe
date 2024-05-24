import { useState } from 'react';
import Button from '../../components/common/Button';
import Toggle from '../../components/signin/Toggle';
import UserTypeButton from '../../components/signin/UserTypeButton';

const HomeIndexPage: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('');

  return (
    <>
      <h1>홈페이지</h1>

      <Button type="동백">버튼</Button>
      <Toggle options={['남성', '여성']} setState={setToggleState} />
    </>
  );
};
export default HomeIndexPage;
