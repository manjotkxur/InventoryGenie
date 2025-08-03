import fetchWithAuth from '../utils/fetchWithAuth';

export const getDashboardSummary = async () => {
  try {
    const res = await fetchWithAuth('http://localhost:5000/api/analytics/getDashboardSummary');
    if (!res.ok) throw new Error('Failed to fetch dashboard summary');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(' Dashboard Summary Error:', err.message);
    return null;
  }
};
