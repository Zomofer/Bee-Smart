import { Produccion } from '@/types/apiario';
import { getDatabase } from './database';

const db = getDatabase();

export const produccionService = {
  async createProduccion(prod: Omit<Produccion, 'id_produccion'>): Promise<number> {
    try {
      const result = await db.runAsync(
        `INSERT INTO produccion (fecha_cosecha, cantidad, observaciones, id_colmena, id_apiario, id_producto)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          prod.fecha_cosecha,
          prod.cantidad,
          prod.observaciones || null,
          prod.id_colmena,
          prod.id_apiario,
          prod.id_producto,
        ]
      );
      return result.lastInsertRowId;
    } catch (error) {
      console.error('Error creating produccion:', error);
      throw error;
    }
  },

  async getProduccionByColmena(id_colmena: number): Promise<Produccion[]> {
    try {
      const result = await db.getAllAsync<Produccion>(
        'SELECT * FROM produccion WHERE id_colmena = ? ORDER BY fecha_cosecha DESC',
        [id_colmena]
      );
      return result;
    } catch (error) {
      console.error('Error fetching produccion:', error);
      throw error;
    }
  },

  async getProduccionByApiario(id_apiario: number): Promise<Produccion[]> {
    try {
      const result = await db.getAllAsync<Produccion>(
        'SELECT * FROM produccion WHERE id_apiario = ? ORDER BY fecha_cosecha DESC',
        [id_apiario]
      );
      return result;
    } catch (error) {
      console.error('Error fetching produccion:', error);
      throw error;
    }
  },

  async getAllProduccion(): Promise<Produccion[]> {
    try {
      const result = await db.getAllAsync<Produccion>(
        'SELECT * FROM produccion ORDER BY fecha_cosecha DESC',
        []
      );
      return result;
    } catch (error) {
      console.error('Error fetching all produccion:', error);
      throw error;
    }
  },

  async getProduccionById(id: number): Promise<Produccion | null> {
    try {
      const result = await db.getFirstAsync<Produccion>(
        'SELECT * FROM produccion WHERE id_produccion = ?',
        [id]
      );
      return result || null;
    } catch (error) {
      console.error('Error fetching produccion:', error);
      throw error;
    }
  },

  async updateProduccion(id: number, prod: Partial<Produccion>): Promise<void> {
    try {
      const updates: string[] = [];
      const values: any[] = [];

      if (prod.fecha_cosecha !== undefined) {
        updates.push('fecha_cosecha = ?');
        values.push(prod.fecha_cosecha);
      }
      if (prod.cantidad !== undefined) {
        updates.push('cantidad = ?');
        values.push(prod.cantidad);
      }
      if (prod.observaciones !== undefined) {
        updates.push('observaciones = ?');
        values.push(prod.observaciones);
      }
      if (prod.id_colmena !== undefined) {
        updates.push('id_colmena = ?');
        values.push(prod.id_colmena);
      }
      if (prod.id_apiario !== undefined) {
        updates.push('id_apiario = ?');
        values.push(prod.id_apiario);
      }
      if (prod.id_producto !== undefined) {
        updates.push('id_producto = ?');
        values.push(prod.id_producto);
      }

      if (updates.length === 0) return;
      values.push(id);
      const query = `UPDATE produccion SET ${updates.join(', ')} WHERE id_produccion = ?`;
      await db.runAsync(query, values);
    } catch (error) {
      console.error('Error updating produccion:', error);
      throw error;
    }
  },

  async deleteProduccion(id: number): Promise<void> {
    try {
      await db.runAsync('DELETE FROM produccion WHERE id_produccion = ?', [id]);
    } catch (error) {
      console.error('Error deleting produccion:', error);
      throw error;
    }
  },
};