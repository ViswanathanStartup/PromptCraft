import api from './api';

export const templateService = {
  // Get all public templates
  getPublicTemplates: async (page = 0, size = 20, sortBy = 'createdAt', sortDir = 'DESC') => {
    const response = await api.get('/templates/public', {
      params: { page, size, sortBy, sortDir },
    });
    return response.data;
  },

  // Search templates
  searchTemplates: async (query, page = 0, size = 20) => {
    const response = await api.get('/templates/public/search', {
      params: { query, page, size },
    });
    return response.data;
  },

  // Get templates by category
  getTemplatesByCategory: async (category, page = 0, size = 20) => {
    const response = await api.get(`/templates/public/category/${category}`, {
      params: { page, size },
    });
    return response.data;
  },

  // Get templates by forDevs filter
  getTemplatesByForDevs: async (forDevs, page = 0, size = 20) => {
    const response = await api.get(`/templates/public/forDevs/${forDevs}`, {
      params: { page, size },
    });
    return response.data;
  },

  // Get template by ID
  getTemplateById: async (id) => {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  },

  // Create new template (authenticated)
  createTemplate: async (templateData) => {
    const response = await api.post('/templates', templateData);
    return response.data;
  },

  // Update template (authenticated)
  updateTemplate: async (id, templateData) => {
    const response = await api.put(`/templates/${id}`, templateData);
    return response.data;
  },

  // Delete template (authenticated)
  deleteTemplate: async (id) => {
    const response = await api.delete(`/templates/${id}`);
    return response.data;
  },

  // Increment usage count
  incrementUsageCount: async (id) => {
    const response = await api.post(`/templates/${id}/use`);
    return response.data;
  },
};
