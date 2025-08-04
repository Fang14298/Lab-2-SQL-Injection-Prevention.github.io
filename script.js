// Simulated database for demonstration
const mockUsers = [
    { id: 1, username: 'admin', password: 'admin123' },
    { id: 2, username: 'user1', password: 'password123' },
    { id: 3, username: 'test', password: 'test123' }
];

// Simulated vulnerable query execution
function executeQuery(query) {
    console.log('Executing vulnerable query:', query);
    
    // Simulate SQL injection vulnerability
    if (query.includes("' OR '1'='1")) {
        return {
            success: true,
            message: '⚠️ VULNERABLE: SQL Injection successful!',
            data: mockUsers, // Returns all users due to injection
            query: query,
            vulnerability: 'SQL Injection detected - all user data exposed!'
        };
    }
    
    // Normal query processing (simplified)
    const usernameMatch = query.match(/username = '([^']+)'/);
    const passwordMatch = query.match(/password = '([^']+)'/);
    
    if (usernameMatch && passwordMatch) {
        const username = usernameMatch[1];
        const password = passwordMatch[1];
        
        const user = mockUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
            return {
                success: true,
                message: '✅ Login successful',
                data: { id: user.id, username: user.username },
                query: query
            };
        }
    }
    
    return {
        success: false,
        message: '❌ Login failed - Invalid credentials',
        query: query
    };
}

// Simulated secure query execution
function executeSecureQuery(query, parameters) {
    console.log('Executing secure query:', query);
    console.log('Parameters:', parameters);
    
    // Simulate parameterized query (safe from SQL injection)
    const [username, password] = parameters;
    
    const user = mockUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        return {
            success: true,
            message: '✅ Login successful (Secure)',
            data: { id: user.id, username: user.username },
            query: query,
            parameters: parameters,
            security: 'Parameterized query prevents SQL injection'
        };
    } else {
        return {
            success: false,
            message: '❌ Login failed - Invalid credentials (Secure)',
            query: query,
            parameters: parameters,
            security: 'Parameterized query prevents SQL injection'
        };
    }
}

// DOM elements
const vulnerableBtn = document.getElementById('vulnerableBtn');
const secureBtn = document.getElementById('secureBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const resultArea = document.getElementById('result');

// Vulnerable query handler
vulnerableBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !password) {
        showResult('Please enter both username and password', 'error');
        return;
    }
    
    // Simulate vulnerable query construction
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    const result = executeQuery(query);
    displayResult(result, 'vulnerable');
});

// Secure query handler
secureBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !password) {
        showResult('Please enter both username and password', 'error');
        return;
    }
    
    // Simulate secure parameterized query
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const parameters = [username, password];
    
    const result = executeSecureQuery(query, parameters);
    displayResult(result, 'secure');
});

// Display result function
function displayResult(result, type) {
    let resultHtml = '';
    
    if (type === 'vulnerable') {
        resultHtml += '<div class="result-header">🔴 VULNERABLE QUERY RESULT:</div>\n\n';
    } else {
        resultHtml += '<div class="result-header">🟢 SECURE QUERY RESULT:</div>\n\n';
    }
    
    resultHtml += `Query: ${result.query}\n\n`;
    
    if (result.parameters) {
        resultHtml += `Parameters: [${result.parameters.join(', ')}]\n\n`;
    }
    
    resultHtml += `Status: ${result.message}\n\n`;
    
    if (result.vulnerability) {
        resultHtml += `⚠️ VULNERABILITY: ${result.vulnerability}\n\n`;
    }
    
    if (result.security) {
        resultHtml += `🛡️ SECURITY: ${result.security}\n\n`;
    }
    
    if (result.data) {
        if (Array.isArray(result.data)) {
            resultHtml += 'Data returned:\n';
            result.data.forEach(user => {
                resultHtml += `- ID: ${user.id}, Username: ${user.username}, Password: ${user.password}\n`;
            });
        } else {
            resultHtml += `Data: ${JSON.stringify(result.data, null, 2)}\n`;
        }
    }
    
    showResult(resultHtml, result.success ? 'success' : 'error');
}

// Show result in the result area
function showResult(message, type) {
    resultArea.innerHTML = message.replace(/\n/g, '<br>');
    resultArea.className = `result-area ${type}`;
}

// Add some helpful examples
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for example inputs
    usernameInput.addEventListener('focus', () => {
        if (!usernameInput.value) {
            usernameInput.placeholder = "(ลอง: admin' OR '1'='1' --)";
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '1') {
            e.preventDefault();
            vulnerableBtn.click();
        } else if (e.ctrlKey && e.key === '2') {
            e.preventDefault();
            secureBtn.click();
        }
    });
    
   
}); 