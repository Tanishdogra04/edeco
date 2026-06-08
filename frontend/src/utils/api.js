// Central API Utility for Edeco Portal

const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD 
  ? 'https://edeco-1.onrender.com/api' 
  : '/api');

// Helper to make API requests with token injection
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('edeco_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error(`API Error in ${endpoint}:`, error.message);
    throw error;
  }
};

// API Endpoints exports
export const api = {
  auth: {
    login: async (email, password) => {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      if (data.token) {
        localStorage.setItem('edeco_token', data.token);
      }
      return data;
    },
    signup: async (name, email, password, code) => {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, code })
      });
      if (data.token) {
        localStorage.setItem('edeco_token', data.token);
      }
      return data;
    },
    sendVerificationCode: async (email) => {
      return await apiRequest('/auth/send-code', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
    },
    getProfile: async () => {
      return await apiRequest('/auth/profile');
    },
    updateProfile: async (name, avatar) => {
      return await apiRequest('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({ name, avatar })
      });
    },
    toggleSavedCollege: async (collegeId) => {
      return await apiRequest(`/auth/saved-colleges/${collegeId}`, {
        method: 'POST'
      });
    }
  },
  
  colleges: {
    getAll: async (filters = {}) => {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          if (Array.isArray(filters[key])) {
            filters[key].forEach(val => params.append(key, val));
          } else {
            params.append(key, filters[key]);
          }
        }
      });
      const queryString = params.toString() ? `?${params.toString()}` : '';
      return await apiRequest(`/colleges${queryString}`);
    },
    getById: async (id) => {
      return await apiRequest(`/colleges/${id}`);
    },
    create: async (collegeData) => {
      return await apiRequest('/colleges', {
        method: 'POST',
        body: JSON.stringify(collegeData)
      });
    },
    delete: async (id) => {
      return await apiRequest(`/colleges/${id}`, {
        method: 'DELETE'
      });
    },
    getAnalytics: async () => {
      return await apiRequest('/admin/analytics');
    }
  },

  cities: {
    getAll: async () => {
      return await apiRequest('/cities');
    },
    getById: async (id) => {
      return await apiRequest(`/cities/${id}`);
    }
  },

  exams: {
    getAll: async () => {
      return await apiRequest('/exams');
    },
    getById: async (id) => {
      return await apiRequest(`/exams/${id}`);
    },
    create: async (examData) => {
      return await apiRequest('/exams', {
        method: 'POST',
        body: JSON.stringify(examData)
      });
    }
  },

  events: {
    getAll: async () => {
      return await apiRequest('/events');
    },
    getById: async (id) => {
      return await apiRequest(`/events/${id}`);
    },
    register: async (eventId, registrationData) => {
      return await apiRequest(`/events/${eventId}/register`, {
        method: 'POST',
        body: JSON.stringify(registrationData)
      });
    }
  },

  news: {
    getAll: async () => {
      return await apiRequest('/news');
    },
    getById: async (id) => {
      return await apiRequest(`/news/${id}`);
    }
  },

  counselling: {
    submit: async (formData) => {
      return await apiRequest('/counselling/request', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
    },
    getAll: async () => {
      return await apiRequest('/counselling');
    },
    updateStatus: async (id, status) => {
      return await apiRequest(`/counselling/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
    }
  }
};
