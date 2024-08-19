/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const database_module_1 = __webpack_require__(8);
const transaction_entity_1 = __webpack_require__(9);
const kafka_config_enum_1 = __webpack_require__(11);
const app_controller_1 = __webpack_require__(12);
const app_service_1 = __webpack_require__(13);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            database_module_1.DatabaseModule,
            microservices_1.ClientsModule.register([
                {
                    name: kafka_config_enum_1.KafkaEnum.Name,
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: kafka_config_enum_1.KafkaEnum.ClientID,
                            brokers: [kafka_config_enum_1.KafkaEnum.Broker1],
                        },
                        consumer: {
                            groupId: kafka_config_enum_1.KafkaEnum.GroupId
                        }
                    }
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([transaction_entity_1.Transaction]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(7);
const transaction_entity_1 = __webpack_require__(9);
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    logging: true,
                    type: 'postgres',
                    host: '127.0.0.1',
                    port: 5432,
                    username: 'postgres',
                    password: 'postgres',
                    database: 'postgres',
                    entities: [transaction_entity_1.Transaction],
                    migrations: ['./migrations/*.ts'],
                    synchronize: true,
                }),
            }),
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Transaction = void 0;
const typeorm_1 = __webpack_require__(10);
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], Transaction.prototype, "accountExternalIdDebit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], Transaction.prototype, "accountExternalIdCredit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "tranferTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], Transaction.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], Transaction.prototype, "transactionStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Transaction.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Transaction.prototype, "updated_at", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)()
], Transaction);
exports.Transaction = Transaction;


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KafkaEnum = void 0;
var KafkaEnum;
(function (KafkaEnum) {
    KafkaEnum["ClientID"] = "transaction";
    KafkaEnum["Broker1"] = "localhost:9092";
    KafkaEnum["GroupId"] = "transaction-consumer";
    KafkaEnum["Name"] = "TRANSACTION_SERVICE";
})(KafkaEnum = exports.KafkaEnum || (exports.KafkaEnum = {}));


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(2);
const app_service_1 = __webpack_require__(13);
const create_transaction_dto_1 = __webpack_require__(15);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async listTransaction() {
        try {
            return this.appService.getTransaction();
        }
        catch (e) {
            console.log('error -------', e);
        }
    }
    async listTransactionPeriod(from, to) {
        try {
            return this.appService.getTransactionsForPeriod(from, to);
        }
        catch (e) {
            console.log('error -------', e);
        }
    }
    async listBalancePeriod(from, to) {
        try {
            return this.appService.getBalanceForPeriod(from, to);
        }
        catch (e) {
            console.log('error -------', e);
        }
    }
    async createTransaction(body) {
        try {
            return this.appService.createTransaction(body);
        }
        catch (e) {
            console.log('error -------', e);
        }
    }
};
__decorate([
    (0, common_1.Get)('list-transaction'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "listTransaction", null);
__decorate([
    (0, common_1.Get)('list-transactions-period/:from/:to'),
    __param(0, (0, common_1.Param)('from')),
    __param(1, (0, common_1.Param)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "listTransactionPeriod", null);
__decorate([
    (0, common_1.Get)('balance/:from/:to'),
    __param(0, (0, common_1.Param)('from')),
    __param(1, (0, common_1.Param)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "listBalancePeriod", null);
__decorate([
    (0, common_1.Post)('create-transaction'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_transaction_dto_1.CreateTransctionDto !== "undefined" && create_transaction_dto_1.CreateTransctionDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createTransaction", null);
AppController = __decorate([
    (0, swagger_1.ApiTags)('Transactions'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const transaction_entity_1 = __webpack_require__(9);
const status_enum_1 = __webpack_require__(14);
const kafka_config_enum_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(10);
let AppService = class AppService {
    constructor(client, transactionRepository) {
        this.client = client;
        this.transactionRepository = transactionRepository;
    }
    async onModuleInit() {
        this.client.subscribeToResponseOf('transaction');
        await this.client.connect();
    }
    async createTransaction(body) {
        const transaction = await this.transactionRepository.create(Object.assign(Object.assign({}, body), { transactionStatus: status_enum_1.default.PENDING }));
        const transactionObj = await this.transactionRepository.save(transaction);
        let transactKafka = await this.client.send('transaction', JSON.stringify(transactionObj));
        return transactKafka;
    }
    async getTransaction() {
        const transaction = await this.transactionRepository.find();
        return transaction;
    }
    async getTransactionsForPeriod(from, to) {
        const transactions = await this.transactionRepository.findBy({
            created_at: (0, typeorm_2.Between)(new Date(from), new Date(to))
        });
        return transactions;
    }
    async getBalanceForPeriod(from, to) {
        const transactionsCredit = await this.transactionRepository.sum("value", {
            created_at: (0, typeorm_2.Between)(new Date(from), new Date(to)),
            accountExternalIdDebit: null
        });
        const transactionsDebit = await this.transactionRepository.sum("value", {
            created_at: (0, typeorm_2.Between)(new Date(from), new Date(to)),
            accountExternalIdCredit: null
        });
        return transactionsCredit - transactionsDebit;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(kafka_config_enum_1.KafkaEnum.Name)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientKafka !== "undefined" && microservices_1.ClientKafka) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], AppService);
exports.AppService = AppService;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["PENDING"] = "pending";
    StatusEnum["APPROVED"] = "approved";
    StatusEnum["REJECTED"] = "rejected";
})(StatusEnum || (StatusEnum = {}));
exports["default"] = StatusEnum;


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTransctionDto = void 0;
const swagger_1 = __webpack_require__(2);
const class_validator_1 = __webpack_require__(16);
class CreateTransctionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransctionDto.prototype, "accountExternalIdDebit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransctionDto.prototype, "accountExternalIdCredit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTransctionDto.prototype, "tranferTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTransctionDto.prototype, "value", void 0);
exports.CreateTransctionDto = CreateTransctionDto;


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ANTI-FRAUD')
        .setDescription('CODECHALLENGE API ANTI-FRAUD')
        .setVersion('1.0')
        .addTag('code')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();

})();

/******/ })()
;