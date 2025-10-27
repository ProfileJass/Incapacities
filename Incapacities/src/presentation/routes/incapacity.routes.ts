import { Router } from 'express';
import { IncapacityController } from '../controllers/IncapacityController';
import { validateBody, validateParam } from '../middlewares/validation.middleware';
import { CreateIncapacitySchema, UpdateIncapacitySchema, UUIDSchema } from '../validators/schemas';

export const createIncapacityRouter = (controller: IncapacityController): Router => {
  const router = Router();

  router.post(
    '/',
    validateBody(CreateIncapacitySchema),
    controller.createIncapacity
  );

  router.get(
    '/',
    controller.getAllIncapacities
  );

  router.get(
    '/user/:userId',
    validateParam(UUIDSchema, 'userId'),
    controller.getIncapacitiesByUser
  );

  router.put(
    '/:id',
    validateParam(UUIDSchema, 'id'),
    validateBody(UpdateIncapacitySchema),
    controller.updateIncapacity
  );

  return router;
};
