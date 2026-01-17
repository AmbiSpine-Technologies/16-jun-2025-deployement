import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProfileByUsername } from '../store/profileSlice';

export const useAppProfile = () => {
  const dispatch = useDispatch();
  
  // Auth state se current user nikalna
  const authUser = useSelector((state) => state.users.currentUser);
  // Profile state
  const { data: profileData, loading } = useSelector((state) => state.profile);
  const isHydrated = useSelector((state) => state._persist?.rehydrated);

  useEffect(() => {
    // Agar login user hai lekin profile data Redux mein nahi hai
    const username = authUser?.username || authUser?.userName;
    
    if (isHydrated && !profileData && !loading && username) {
      dispatch(fetchProfileByUsername(username));
    }
  }, [isHydrated, profileData, loading, authUser, dispatch]);

  return {
    user: authUser,
    profile: profileData || {},
    isReady: !!profileData && !loading,
    isLoading: loading || !isHydrated
  };
};