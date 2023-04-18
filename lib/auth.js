import cookie from 'cookie';

export const authenticated = (fn) => async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const auth = cookies.auth ? JSON.parse(cookies.auth) : null;

  if (!auth || !auth.email) {
    return res.status(401).json({ message: 'Sorry, you are not authenticated' });
  }

  return await fn(req, res);
};