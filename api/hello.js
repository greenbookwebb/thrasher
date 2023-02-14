export default function handler(req, res) {
    const { name = 'World' } = req.query;
    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Replace * with your desired origin
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET' // Replace with your desired HTTP methods
        },
        body: JSON.stringify(
          'Hello, world!'
        )
      };
    
      return res.send(response);
    
  }
  