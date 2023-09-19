import fs from 'fs/promises';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const fileContents = await fs.readFile('./data/vehicles.json', 'utf-8');
      const vehicleData = JSON.parse(fileContents);
      res.status(200).json(vehicleData);
    } catch (error) {
      res.status(500).json({ error: 'Error al leer los datos' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
