import { Request, Response } from 'express';
import { Job } from '../entities/job';
import { AppDataSource } from '../config/typeorm.config';

const jobRepository = AppDataSource.getRepository(Job);

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await jobRepository.find();
    res.status(200).json(jobs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createJob = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;

  try {
    const job = jobRepository.create({ title, description, status });
    await jobRepository.save(job);
    res.status(201).json(job);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
