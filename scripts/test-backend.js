import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function testBackend() {
    console.log('🧪 Testing Backend API...');

    try {
        // 1. Health Check
        console.log('\nChecking Health...');
        const health = await axios.get('http://localhost:5000/health');
        console.log('✅ Health Check Passed:', health.data.message);

        // 2. Register User (Random email to avoid conflict)
        const email = `test${Math.floor(Math.random() * 10000)}@example.com`;
        console.log(`\nRegistering User (${email})...`);
        const register = await axios.post(`${API_URL}/auth/register`, {
            name: 'Test User',
            email: email,
            password: 'password123'
        });
        console.log('✅ Registration Passed');
        const token = register.data.data.token;

        // 3. Login User
        console.log('\nLogging in...');
        const login = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: 'password123'
        });
        console.log('✅ Login Passed');

        // 4. Get Profile
        console.log('\nGetting Profile...');
        const profile = await axios.get(`${API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Profile Fetch Passed:', profile.data.data.user.name);

        console.log('\n🎉 ALL TESTS PASSED!');
    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.response ? error.response.data : error.message);
    }
}

testBackend();
