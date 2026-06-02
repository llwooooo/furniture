const IMAGE_API = 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
const DOUBAO_KEY = process.env.DOUBAO_KEY || 'ark-709df38e-1e1e-45eb-b1bf-9ff817332a79-0cd1e';

export const config = {
  runtime: 'nodejs',
  maxDuration: 60,
};

/**
 * 代理豆包图像生成 API
 * POST: 提交生图请求，转发到豆包 API 并返回结果
 */
export default async function handler(request) {
  try {
    // 只处理 POST 请求
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();

    console.log('Image API Request:', JSON.stringify({
      model: body.model,
      promptLength: body.prompt?.length,
      hasImage: !!body.image,
      size: body.size,
    }));

    const response = await fetch(IMAGE_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DOUBAO_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Image API Error:', JSON.stringify(data, null, 2));
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
