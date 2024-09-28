const secret = new TextEncoder().encode('xxx');
const { jwtVerify } = require('jose')

const  verifyToken = async (token) => {
    if (!token) {
        throw new Error('Authorization token is missing');
    }
    try {
        const claims= await jwtVerify(token, secret);
        return { success: true, claims };
        // Payload contains the email, role, and phone
    } catch (err) {
        return { success: false };
    }
};

module.exports = {
    verifyToken
}