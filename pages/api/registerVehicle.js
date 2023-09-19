import fs from 'fs/promises';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { brand, model, year, vehicleImage } = req.body;

      const vehicleData = {
        brand,
        model,
        year,
        vehicleImage,
      };

      
      let existingData = [];
      try {
        const fileContents = await fs.readFile('./data/vehicles.json', 'utf-8');
        existingData = JSON.parse(fileContents);
      } catch (error) {
        
      }

      
      existingData.push(vehicleData);

      
      await fs.writeFile('./data/vehicles.json', JSON.stringify(existingData, null, 2));

      res.status(200).json({ message: 'Registro exitoso' });
    } catch (error) {
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
