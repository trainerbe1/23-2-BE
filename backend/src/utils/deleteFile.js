import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../log/log.js';

// Definisikan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path untuk folder uploads
const uploadDir = path.join(__dirname, '../public/uploads');

export const deleteFile = async (filename) => {
  const filePath = path.join(uploadDir, filename);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    logger.error(`Error menghapus file ${filename}: ${error.message}`);
    throw error;
  }
};
