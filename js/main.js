// main.js
const API_BASE = 'https://yourusername.pythonanywhere.com/api'; // غيّر هذا لاحقاً

// دوال مساعدة للتعامل مع التوكن
function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function removeToken() {
    localStorage.removeItem('token');
}

// دالة لعمل طلب مع التوكن في الهيدر
async function fetchWithAuth(url, options = {}) {
    const token = getToken();
    if (!options.headers) options.headers = {};
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }
    options.headers['Content-Type'] = 'application/json';
    const response = await fetch(url, options);
    if (response.status === 401) {
        // توكن غير صالح، نعيد توجيه المستخدم إلى صفحة تسجيل الدخول
        removeToken();
        window.location.href = 'login.html';
        return null;
    }
    return response;
}

// دالة لعرض رسائل الخطأ
function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.style.display = 'block';
        errorDiv.innerText = message;
    }
}

// دالة لإخفاء رسائل الخطأ
function hideError(elementId) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) errorDiv.style.display = 'none';
}

// دالة لتسجيل الخروج
function logout() {
    removeToken();
    window.location.href = 'login.html';
}
