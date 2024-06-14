import { useState, useEffect } from 'react';
import { instance } from '../api/instance';

const useUserInfo = (userId: string) => {
  const [userType, setUserType] = useState<'dong' | 'nari' | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await instance.get(
          `http://localhost:3001/user/${userId}`
        );
        const data = response.data;
        console.log('Fetched data:', data); // data를 콘솔에 출력하여 확인

        setUserType(data.userType);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return userType;
};

export default useUserInfo;
