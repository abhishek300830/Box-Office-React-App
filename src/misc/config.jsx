const API_BASE_URL = 'https://api.tvmaze.com';

async function apiGet(queryString) {
   const result = await fetch(`${API_BASE_URL}${queryString}`).then(
      Response => {
         return Response.json();
      }
   );
   return result;
}

export { apiGet };
