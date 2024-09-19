// app.js

const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const https = require('https');

const app = express();

// Middleware
app.use(helmet());  // Security headers
app.use(express.json());  // Parsing JSON

// HTTPS Setup
const privateKey = fs.readFileSync('security/certificates/private.key', 'utf8');
const certificate = fs.readFileSync('security/certificates/certificate.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

// Authentication route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Check if user exists and validate password (hashing)
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.passwordHash)) {
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ error: 'Invalid credentials' });
});

// Secure route example
app.get('/secure-data', authenticateToken, (req, res) => {
    res.json({ data: 'Sensitive Data' });
});

// Token authentication middleware
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Token missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Start HTTPS server
https.createServer(credentials, app).listen(3000, () => {
    console.log('Secure server running on port 3000');
});