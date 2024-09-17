"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const job_1 = require("../entities/job");
const dotenv = __importStar(require("dotenv"));
const Conversation_1 = require("../entities/Conversation");
const UserMapping_1 = require("../entities/UserMapping");
const ViswaOpsNumber_1 = require("../entities/ViswaOpsNumber");
const SurveyorMaster_1 = require("../entities/SurveyorMaster");
const NominationDetails_1 = require("../entities/NominationDetails");
// Load environment variables from .env file
dotenv.config();
console.log('Database Host:', process.env.DB_HOST);
console.log('Database Port:', process.env.DB_PORT);
console.log('Database User:', process.env.DB_USERNAME);
console.log('Database Password:', process.env.DB_PASSWORD);
console.log('Database Name:', process.env.DB_NAME);
exports.AppDataSource = new typeorm_1.DataSource({
    "type": 'mysql',
    "host": "127.0.0.1",
    "port": parseInt('3306'),
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "entities": [user_1.User, job_1.Job, Conversation_1.Conversation, UserMapping_1.UserMapping, ViswaOpsNumber_1.ViswaOpsNumber, SurveyorMaster_1.SurveyorMaster, NominationDetails_1.NominationDetails],
    "logging": false,
    // "logger": "file",
    "synchronize": true,
    "extra": {
        connectionLimit: 1000,
        waitForConnections: false
    }
});
