import request from 'supertest';
import app from '../app.js'; 

describe('Tests funcionales - adoption.router.js', () => {

  let createdAdoptionId = '';

  it('POST /api/adoption debería agregar una adopción', async () => {
    const adoptionMock = {
      userId: 'usuarioMockId',
      petId: 'mascotaMockId',
      adoptionDate: '2025-04-26'
    };

    const res = await request(app)
      .post('/api/adoption')
      .send(adoptionMock);

    expect(res.statusCode).toBe(201); 
    expect(res.body.status).toBe('success');
    expect(res.body.payload).toHaveProperty('_id');

    createdAdoptionId = res.body.payload._id; 
  });

  it('GET /api/adoption debería devolver todas las adopciones', async () => {
    const res = await request(app).get('/api/adoption');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.payload)).toBe(true);
  });

  it('GET /api/adoption/:id debería devolver una adopción específica', async () => {
    const res = await request(app).get(`/api/adoption/${createdAdoptionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.payload).toHaveProperty('_id', createdAdoptionId);
  });

  it('PUT /api/adoption/:id debería actualizar una adopción', async () => {
    const updatedData = {
      adoptionDate: '2025-05-01'
    };

    const res = await request(app)
      .put(`/api/adoption/${createdAdoptionId}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.payload.adoptionDate).toBe('2025-05-01');
  });

  it('DELETE /api/adoption/:id debería eliminar una adopción', async () => {
    const res = await request(app)
      .delete(`/api/adoption/${createdAdoptionId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
  });

  it('GET /api/adoption/:id debería devolver 404 si la adopción no existe', async () => {
    const res = await request(app).get(`/api/adoption/${createdAdoptionId}`);
    expect(res.statusCode).toBe(404); // Si tu router maneja 404 para no encontrado
  });

});
