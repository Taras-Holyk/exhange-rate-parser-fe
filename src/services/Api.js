import { apiUrl } from './../environments/environtment';

class ApiService {
  static getHeaders() {
    let headers = {
      'Content-Type': 'application/json'
    };

    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  static get(url) {
    return fetch(`${apiUrl}/${url}`, {
        method: 'GET',
        headers: this.getHeaders()
      })
      .then(response => {
        if(response.ok) return response.json();
        throw new Error(`Request rejected with status ${response.status}`);
      })
      .catch(error => null);
  }

  static post(url, data) {
    return fetch(`${apiUrl}/${url}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      })
      .then(response => {
        if(response.ok) return response.json();
        throw new Error(`Request rejected with status ${response.status}`);
      })
      .catch(error => null);
  }
}

export default ApiService;
