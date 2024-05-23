import axios from 'axios';

const API_URL = 'http://localhost:3001/tasks';

export default async function handler(req, res) {
  const { method, body, query } = req;
  const { id } = query;

  try {
    switch (method) {
      case 'GET':
        const response = await axios.get(API_URL);
        res.status(200).json(response.data);
        break;
      case 'POST':
        const postResponse = await axios.post(API_URL, body);
        res.status(201).json(postResponse.data);
        break;
      case 'PUT':
        const putResponse = await axios.put(`${API_URL}/${id}`, body);
        res.status(200).json(putResponse.data);
        break;
      case 'DELETE':
        await axios.delete(`${API_URL}/${id}`);
        res.status(204).end();
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
