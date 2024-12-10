import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { instance } from '../../api/instance';

interface listIf {
  topicBoardId: number;
  question: string;
  date: string;
}

const AdminRegisterTodayTopicPage = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState<listIf[]>([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirm = window.confirm('등록하시겠습니까?');
    if (!confirm) return;

    try {
      // 오늘 날짜 생성 ('2024-12-11' 형식)
      const today = new Date()
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .trim() // 앞뒤 공백 제거
        .replace(/\s/g, '') // 중간 공백 제거
        .replace(/\./g, '-') // 점(.)을 대시(-)로 변경
        .replace(/-$/, ''); // 마지막 '-' 제거

      // 등록 API 호출
      await instance.post('/board/topic', {
        question: input, // input 내용
        date: today, // 오늘 날짜
      });

      alert('오늘의 주제가 성공적으로 등록되었습니다.');
      setInput('');

      // 등록 후 목록 갱신
      fetchTopicList();
    } catch (error) {
      console.error('주제 등록 실패:', error);
      alert('주제 등록에 실패했습니다.');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('삭제하시겠습니까?');
    if (!confirm) return;

    try {
      await instance.delete(`/board/topic/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const fetchTopicList = async () => {
    try {
      const res = await instance.get('/board/topic');
      setList(res.data); // API에서 받은 데이터로 목록 업데이트
    } catch (error) {
      console.error('목록 불러오기 실패:', error);
      alert('목록을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchTopicList();
  }, []);

  return (
    <WrapContent>
      <h1>오늘의 주제 등록 페이지</h1>
      <form onSubmit={handleSubmit}>
        <label>질문 : </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // input 업데이트
          placeholder="오늘의 질문을 입력하세요."
          required
        />
        <button type="submit">등록하기</button>
      </form>

      <h1>등록된 주제 목록</h1>
      <ol>
        {list.map((item) => (
          <li key={item.topicBoardId}>
            <span>
              {item.date} - {item.question}
            </span>
            <button onClick={() => handleDelete(item.topicBoardId)}>
              삭제
            </button>
          </li>
        ))}
      </ol>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 2rem 1.3rem;

  h1 {
    font-size: 1.3rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }

  form {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 3rem;

    label {
      font-size: 1rem;
    }
    input {
      flex: 1;
      margin: 0 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      background-color: #4d4d4d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  ol {
    padding: 0;

    li {
      font-size: 1rem;
    }

    button {
      margin-left: 0.5rem;
    }
  }
`;

export default AdminRegisterTodayTopicPage;
