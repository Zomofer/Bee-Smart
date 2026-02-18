import { Producto } from '@/types/apiario';
import { getDatabase } from './database';

const db = getDatabase();

export const productoService = {
  async createProducto(prod: Omit<Producto, 'id_producto'>): Promise<number> {
    try {
      const result = await db.runAsync(
        `INSERT OR IGNORE INTO productos (nombre) VALUES (?)`,
        [prod.nombre]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Error creating producto:', error);
      throw error;
    }
  },

  async getAllProductos(): Promise<Producto[]> {
    try {
      const result = await db.getAllAsync<Producto>(
        'SELECT * FROM productos ORDER BY nombre ASC'
      );
      return result;
    } catch (error) {
      console.error('Error fetching productos:', error);
      throw error;
    }
  },

  async getProductoById(id: number): Promise<Producto | null> {
    try {
      const result = await db.getFirstAsync<Producto>(
        'SELECT * FROM productos WHERE id_producto = ?',
        [id]
      );
      return result || null;
    } catch (error) {
      console.error('Error fetching producto:', error);
      throw error;
    }
  },
};