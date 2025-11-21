import api from './api';

export const authService = {
  signup: async (email, password, firstName, lastName) => {
    const response = await api.post('/auth/signup', {
      email,
      password,
      firstName,
      lastName,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  saveAuthData: (authData) => {
    localStorage.setItem('accessToken', authData.accessToken);
    localStorage.setItem('refreshToken', authData.refreshToken);
    localStorage.setItem('user', JSON.stringify({
      userId: authData.userId,
      email: authData.email,
      role: authData.role,
      subscriptionTier: authData.subscriptionTier,
    }));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
};
