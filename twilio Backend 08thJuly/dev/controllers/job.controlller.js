"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const job_1 = require("../entities/job");
const typeorm_config_1 = require("../config/typeorm.config");
const jobRepository = typeorm_config_1.AppDataSource.getRepository(job_1.Job);
exports.getJobs = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const jobs = yield jobRepository.find();
        res.status(200).json(jobs);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.createJob = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { title, description, status } = req.body;
    try {
        const job = jobRepository.create({ title, description, status });
        yield jobRepository.save(job);
        res.status(201).json(job);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
