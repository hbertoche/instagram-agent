import axios from 'axios';
import { Content, GenerateContentRequest, SelectOptionRequest, Analytics } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contentService = {
  async generateContent(request: GenerateContentRequest): Promise<Content> {
    const response = await api.post<Content>('/api/generate', request);
    return response.data;
  },

  async selectOption(request: SelectOptionRequest): Promise<Content> {
    const response = await api.post<Content>('/api/select', request);
    return response.data;
  },

  async getHistory(): Promise<Content[]> {
    const response = await api.get<Content[]>('/api/history');
    return response.data;
  },

  async getAnalytics(): Promise<Analytics> {
    const response = await api.get<Analytics>('/api/analytics');
    return response.data;
  },
};
