import React, { useState } from 'react';
import styled from 'styled-components';

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
};

const TopicDropdown = ({ list, setSelectedTopic, setTopicBoardId }) => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${String(
    today.getMonth() + 1
  ).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일`;

  const [isOpen, setIsOpen] = useState(false);
  const [selectText, setSelectText] = useState(formattedDate);

  const handleSelect = (selected) => {
    setIsOpen(false);
    setSelectText(formatDate(selected.date));
    setSelectedTopic(selected.question);
    setTopicBoardId(selected.topicBoardId);
  };

  return (
    <Dropdown>
      <SelectText onClick={() => setIsOpen((prev) => !prev)} $isOpen={isOpen}>
        {selectText}
        <img src="/assets/chat/more-arrow.svg" alt="Toggle Dropdown" />
      </SelectText>

      {isOpen && (
        <DropdownList>
          {list.map((item) => (
            <React.Fragment key={item.topicBoardId}>
              <DropdownItem
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {formatDate(item.date)}
              </DropdownItem>
            </React.Fragment>
          ))}
        </DropdownList>
      )}
    </Dropdown>
  );
};

const Dropdown = styled.div`
  margin-bottom: 1rem;
  position: relative; /* 드롭다운 위치를 정확히 지정하기 위해 추가 */
`;

const SelectText = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center; /* 수직 가운데 정렬 추가 */

  color: #000;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: normal;

  cursor: pointer; /* 클릭 가능한 영역임을 표시 */
  user-select: none; /* 텍스트 선택 방지 */

  img {
    margin-left: 0.5rem;
    transition: transform 0.3s;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

const DropdownList = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  position: absolute;
  top: 100%; /* 부모 요소 바로 아래에 위치하도록 설정 */
  left: 0;
  width: 100%;
  max-height: 200px; /* 최대 높이 설정 (필요에 따라 조정) */
  z-index: 100;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 표시 */
`;

const DropdownItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  color: #000;
  font-size: 1.25rem;
  font-family: NanumSquare;
  white-space: nowrap; /* 한 줄로 표시 */
  text-overflow: ellipsis;
  overflow: hidden;
  border-bottom: 1px solid #ebeceb; /* 아이템 사이의 구분선 */

  display: flex;
  justify-content: center;

  &:last-child {
    border-bottom: none; /* 마지막 아이템 구분선 제거 */
  }

  &:hover {
    background-color: #f0f0f0; /* 호버 시 배경색 변경 */
  }
`;

export default TopicDropdown;
