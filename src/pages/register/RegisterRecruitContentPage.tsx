import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StopWritingButton from '../../components/common/StopWritingButton';
import ProgressBar from '../../components/common/ProgressBar';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import InputPrice from '../../components/common/InputPrice';
import Modal from '../../components/common/Modal';
import { useNavigate } from 'react-router-dom';
import useRecruitState from '../../store/RecruitState';

const RegisterRecruitContentPage = () => {
  const navigate = useNavigate();
  const { setRecruitState } = useRecruitState();

  const [inputCount, setInputCount] = useState(0);
  const [selectedPriceType, setSelectedPriceType] = useState('');

  const hadnleOnChagne = (e) => {
    const { name, value } = e.target;

    setInputCount(e.target.value.replace(/<br\s*V?>/gm, '\n').length);
    setRecruitState({ [name]: value });
  };

  // 모달 열고 닫기
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const openModal = () => setIsOpenModal(true);
  const cancelModal = () => setIsOpenModal(false);
  // 모달 > 확인하기 버튼 클릭 시 동작되는 함수
  const confirmModal = () => {};

  const navigateToMethod = () => {
    navigate('/register/recruit/method');
  };
  const navigateTo = () => {
    navigate('/home');
  };

  useEffect(() => {
    setRecruitState({ priceType: selectedPriceType });
  }, [setRecruitState, selectedPriceType]);

  return (
    <WrapContent>
      <ButtonWrap onClick={openModal}>
        <StopWritingButton />
      </ButtonWrap>
      <ProgressBar status={2} type={'nari'} />
      <TitleText>{`마지막으로,\n내 구인글을 소개해보세요!`}</TitleText>
      <Input
        name="title"
        inputPlaceholder={'제목을 입력하세요.'}
        onChange={hadnleOnChagne}
        maxLength={39}
      ></Input>
      <MaxText>
        <span>{inputCount}</span>
        <span>/40</span>
      </MaxText>
      <TextArea
        name="content"
        inputPlaceholder={'내용을 입력하세요.'}
        onChange={hadnleOnChagne}
      ></TextArea>
      <InputPrice
        name="price"
        onChange={hadnleOnChagne}
        userType={'nari'}
        selected={selectedPriceType}
        onClickMethod={setSelectedPriceType}
      />
      <WrapButton>
        <Button
          type={null}
          disabled={false}
          children={'이전'}
          onClick={navigateToMethod}
        ></Button>
        <Button
          type={'nari'}
          disabled={false}
          children={'다음'}
          onClick={navigateTo}
        ></Button>
      </WrapButton>
      <Modal
        isOpen={isModalOpen}
        title={'정말 나가시겠습니까?'}
        content={`지금 나가면 \n작성했던 모든 내용이 사라져요.`}
        cancelText={'취소'}
        confirmText={'나가기'}
        confirmModal={confirmModal}
        cancelModal={cancelModal}
      />
    </WrapContent>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;
const ButtonWrap = styled.div`
  display: flex;
  float: right;
  width: 5.7rem;
  height: 2.2rem;
  flex-shrink: 0;
  margin-bottom: 1.63rem;
`;
const TitleText = styled.div`
  font-size: 1.5rem;
  font-family: 'NanumSquareR';
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1.56rem;
`;

const MaxText = styled.span`
  margin-top: 0.6rem;
  display: flex;
  justify-content: right;
  color: #000;
  font-family: NanumSquare;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.6rem;
`;

const WrapButton = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 4rem;
  gap: 1rem;
`;

export default RegisterRecruitContentPage;
