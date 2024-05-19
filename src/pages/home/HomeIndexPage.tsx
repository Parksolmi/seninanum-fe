import { useState } from 'react';
import Button from '../../components/common/Button';
import Toggle from '../../components/signup/Toggle';

const HomeIndexPage: React.FC = () => {
  const [toggleState, setToggleState] = useState<string>('');

  return (
    <>
      <h1>홈페이지</h1>
      <Button type="dong">버튼</Button>
      <Toggle options={['남성', '여성']} setState={setToggleState} />
    </>
  );
};
export default HomeIndexPage;
