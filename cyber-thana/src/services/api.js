// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle token expiration
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/victim/login';
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  // Victim authentication
  victimRegister: (userData) => 
    apiRequest('/auth/victim/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  victimLogin: (credentials) => 
    apiRequest('/auth/victim/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Police authentication
  policeLogin: (credentials) => 
    apiRequest('/auth/police/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Common auth functions
  getCurrentUser: () => 
    apiRequest('/auth/me'),

  logout: () => 
    apiRequest('/auth/logout', {
      method: 'POST',
    }),

  refreshToken: (refreshToken) => 
    apiRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),
};

// Victim API functions
export const victimAPI = {
  getDashboard: () => 
    apiRequest('/victim/dashboard'),

  getCases: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/victim/cases${queryString ? `?${queryString}` : ''}`);
  },

  getCase: (caseId) => 
    apiRequest(`/victim/cases/${caseId}`),

  createCase: (caseData) => 
    apiRequest('/victim/cases', {
      method: 'POST',
      body: JSON.stringify(caseData),
    }),

  createAnonymousCase: (caseData) => 
    apiRequest('/victim/cases/anonymous', {
      method: 'POST',
      body: JSON.stringify(caseData),
    }),

  updateProfile: (profileData) => 
    apiRequest('/victim/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  changePassword: (passwordData) => 
    apiRequest('/victim/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    }),
};

// Police API functions
export const policeAPI = {
  getDashboard: () => 
    apiRequest('/police/dashboard'),

  getMyCases: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/police/cases/my${queryString ? `?${queryString}` : ''}`);
  },

  getAnalytics: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/police/analytics${queryString ? `?${queryString}` : ''}`);
  },

  getUsers: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/police/users${queryString ? `?${queryString}` : ''}`);
  },

  createUser: (userData) => 
    apiRequest('/police/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  updateUser: (userId, userData) => 
    apiRequest(`/police/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
};

// Case API functions
export const caseAPI = {
  getCases: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/cases${queryString ? `?${queryString}` : ''}`);
  },

  getCase: (caseId) => 
    apiRequest(`/cases/${caseId}`),

  createCase: (caseData) => 
    apiRequest('/cases', {
      method: 'POST',
      body: JSON.stringify(caseData),
    }),

  updateCaseStatus: (caseId, statusData) => 
    apiRequest(`/cases/${caseId}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    }),

  assignCase: (caseId, officerData) => 
    apiRequest(`/cases/${caseId}/assign`, {
      method: 'PUT',
      body: JSON.stringify(officerData),
    }),

  deleteCase: (caseId) => 
    apiRequest(`/cases/${caseId}`, {
      method: 'DELETE',
    }),
};

// Evidence API functions
export const evidenceAPI = {
  uploadEvidence: (caseId, formData) => {
    const token = localStorage.getItem('token');
    return fetch(`${API_BASE_URL}/evidence/upload/${caseId}`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      return data;
    });
  },

  getCaseEvidence: (caseId) => 
    apiRequest(`/evidence/case/${caseId}`),

  downloadEvidence: (evidenceId) => {
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/evidence/${evidenceId}/download`;
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.style.display = 'none';
    
    if (token) {
      link.setAttribute('Authorization', `Bearer ${token}`);
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  verifyEvidence: (evidenceId, verificationData) => 
    apiRequest(`/evidence/${evidenceId}/verify`, {
      method: 'PUT',
      body: JSON.stringify(verificationData),
    }),

  deleteEvidence: (evidenceId) => 
    apiRequest(`/evidence/${evidenceId}`, {
      method: 'DELETE',
    }),
};

// Utility functions
export const apiUtils = {
  // Store authentication data
  setAuthData: (token, user, userType) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userType', userType);
  },

  // Clear authentication data
  clearAuthData: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get user type
  getUserType: () => {
    return localStorage.getItem('userType');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Format date for API
  formatDateForAPI: (date) => {
    return new Date(date).toISOString();
  },

  // Handle API errors
  handleError: (error, customMessage = '') => {
    const message = error.message || customMessage || 'An error occurred';
    console.error('API Error:', error);
    return message;
  },
};

export default apiRequest;
