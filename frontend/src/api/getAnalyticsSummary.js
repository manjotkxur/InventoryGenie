import fetchWithAuth from '../utils/fetchWithAuth';

export const getAnalyticsSummary = async () => {
  try {
    const data = await fetchWithAuth('http://localhost:5000/api/analytics/getSummary');
    if (!data) {
      throw new Error('No data returned from fetchWithAuth');
    }
    return data;
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return null;
  }
};