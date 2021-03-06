import { useEffect, useState } from 'react';
import api from '~/services/api';

const usePublicIp = () => {
  const [ip, setIp] = useState('');

  const getIpAddress = async () => {
    const { data } = await api.get('https://api.ipify.org?format=json');

    setIp(data?.ip || '');
  };

  useEffect(() => {
    getIpAddress();
  }, []);

  return { ip };
};

export default usePublicIp;
