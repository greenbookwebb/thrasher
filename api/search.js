import axios from 'axios';

const accessToken = 'cojH8jQqn4cF36PceSsnXySHxnoR9h1FDOmI-ACXHY4SBn5tWhEfiqIO_izcqQQr';

const apiUrl = 'https://api.genius.com/search?q=';

export default async function search(q) {
  const url = apiUrl + q;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
