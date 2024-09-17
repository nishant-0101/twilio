import { AppDataSource } from '../config/typeorm.config';
import { ViswaOpsNumber } from '../entities/ViswaOpsNumber';

export const getViswaOpsNumbers = async (): Promise<string[]> => {
  const viswaOpsNumberRepository = AppDataSource.getRepository(ViswaOpsNumber);
  const viswaOpsNumbers = await viswaOpsNumberRepository.find();
  return viswaOpsNumbers.map((entry) => entry.phoneNumber);
};
