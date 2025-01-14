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
const typeorm_config_1 = require("../config/typeorm.config");
const ViswaOpsNumber_1 = require("../entities/ViswaOpsNumber");
exports.getViswaOpsNumbers = () => __awaiter(this, void 0, void 0, function* () {
    const viswaOpsNumberRepository = typeorm_config_1.AppDataSource.getRepository(ViswaOpsNumber_1.ViswaOpsNumber);
    const viswaOpsNumbers = yield viswaOpsNumberRepository.find();
    return viswaOpsNumbers.map((entry) => entry.phoneNumber);
});
