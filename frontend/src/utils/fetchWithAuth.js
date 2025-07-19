
export const fetchWithAuth = async (url, options = {}, login, logout) => {
  let token = localStorage.getItem('accesstoken');
  if (!token || token === 'undefined' || token === 'null') {
  console.warn('Invalid access token in localStorage');
  logout?.();
  return new Response(null, { status: 401, statusText: 'Token missing or malformed' });
}

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  console.log(`🔁 Response from ${url}:`, res.status);

  if (res.status === 401) {
    console.warn('Access token expired or invalid. Attempting refresh...');

    try {
      const refreshRes = await fetch('http://localhost:5000/api/users/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });

      console.log(' Refresh token response status:', refreshRes.status);
      const data = await refreshRes.json();
      console.log('Refresh response body:', data);

      if (refreshRes.ok && data.accesstoken) {
        console.log(' New access token received:', data.accesstoken);
        localStorage.setItem('accesstoken', data.accesstoken);
        login(data.accesstoken);

        res = await fetch(url, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${data.accesstoken}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        console.log(` Retried response from ${url}:`, res.status);
      } else {
        console.error('Failed to refresh token. Logging out.');
        logout();
      }
    } catch (err) {
      console.error('Refresh token request failed:', err);
      logout();
    }
  }

  return res;
};

export default fetchWithAuth;
