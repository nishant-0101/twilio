"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const conversation_routes_1 = __importDefault(require("./routes/conversation.routes"));
const twilio_routes_1 = __importDefault(require("./routes/twilio.routes"));
const typeorm_config_1 = require("./config/typeorm.config");
dotenv.config();
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_PORT = process.env.DB_PORT || '3306';
process.env.DB_USERNAME = process.env.DB_USERNAME || 'root';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'adhavan123';
process.env.DB_NAME = process.env.DB_NAME || 'twilio_test';
const app = express_1.default();
app.use(cors_1.default({
    origin: 'http://localhost:4200',
    credentials: true // Enable cookies and other credentials
}));
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).send({ error: 'Invalid JSON' });
    }
    next();
});
console.log('Initializing Data Source with the following settings:');
console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);
console.log('Username:', process.env.DB_USERNAME);
console.log('Password:', process.env.DB_PASSWORD);
console.log('Database:', process.env.DB_NAME);
typeorm_config_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
app.use(body_parser_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use('/jobs', job_routes_1.default);
app.use('/conversation', conversation_routes_1.default);
app.use('/twilio', twilio_routes_1.default);
exports.default = app;
