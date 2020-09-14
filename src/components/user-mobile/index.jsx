import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Profile from './profileCard';
import effectAsyncHandler from '../../assets/async/asyncFunction';

const ProfileUserMobile = (props) => {
  const [user, setUser] = useState('');
  const { match } = props;
  const userId = match.params.id;
  const currentUser = useSelector((state) => state.userInformation);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    effectAsyncHandler(
      `${process.env.REACT_APP_API_URL}/api/v1/admins-users/${userId}`,
      'GET',
      (data) => setUser(data.user),
      currentUser.token,
      signal,
      null,
      null,
    );
    setIsLoading(false);

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [userId, currentUser.token]);

  return <Profile user={user} isLoading={isLoading} />;
};

export default ProfileUserMobile;
