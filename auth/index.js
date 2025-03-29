import express from 'express'
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

const app = express()
const port = 3000


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '0537e086323e379b1d638fd831eb1f8ab2dc2f06831feed82b1ad2f8ad292f03',
  baseURL: 'http://localhost:3000',
  clientID: 'Sej6LtuVXe1E1GKyXuQZenSKycsqGMmK',
  issuerBaseURL: 'https://dev-cv2iaacrgxu1e0uh.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


app.listen(port, () => {
  console.log(`https://localhost:${port}`)
})