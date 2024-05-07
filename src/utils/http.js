function createHeaders(token = null) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

export async function get(url, token = null) {
    const headers = createHeaders(token);
    const response = await fetch(url, {
        method: 'GET',
        headers
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function post(url, data, token = null) {
    const headers = createHeaders(token);
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        return response.json().then(data => {
            const errors = data.errors;
            let errorMessage = '';
            for (const field in errors) {
                errorMessage += `${field}: ${errors[field]}\n`;
            }
            throw new Error(errorMessage)
        })
    }
    return response.json();
}