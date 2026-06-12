export default {
  async fetch(request) {
    // Libera preflight CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': '*',
        }
      });
    }

    // Repassa a query string para a SerpApi
    const url = new URL(request.url);
    const serpUrl = 'https://serpapi.com/search.json' + url.search;

    const resp = await fetch(serpUrl);
    const data = await resp.text();

    return new Response(data, {
      status: resp.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
