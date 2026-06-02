const DOUBAO_API = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
const DOUBAO_KEY = process.env.DOUBAO_KEY || 'ark-709df38e-1e1e-45eb-b1bf-9ff817332a79-0cd1e';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const body = await request.json();
    const response = await fetch(DOUBAO_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DOUBAO_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
