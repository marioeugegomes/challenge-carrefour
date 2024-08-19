/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'apps/shared/database/entities/transaction.entity';
import StatusEnum from 'apps/shared/database/enums/status.enum';
import { KafkaEnum } from 'apps/shared/enum/kafka-config.enum';
import { Repository, Between } from 'typeorm';


@Injectable()
export class AppService {

  constructor(@Inject(KafkaEnum.Name) private readonly client: ClientKafka,
  @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>) {
    
  }
    
  async onModuleInit(){
    this.client.subscribeToResponseOf('transaction');
    await this.client.connect();
  }

  async createTransaction(body) {
    const transaction = await this.transactionRepository.create({
      ...body,
      transactionStatus: StatusEnum.PENDING
    });
    const transactionObj = await this.transactionRepository.save(transaction)
    // eslint-disable-next-line prefer-const
    let transactKafka = await this.client.send('transaction',  JSON.stringify(transactionObj));
    return transactKafka;
  }

  async getTransaction() {
    const transaction = await this.transactionRepository.find();
    return transaction;
  }

  async getTransactionsForPeriod(from, to) {
    const transactions = await this.transactionRepository.findBy({
        created_at:  Between(
          new Date(from),
          new Date(to),
       )
    });
    return transactions;
  }

  async getBalanceForPeriod(from, to) {
    const transactionsCredit = await this.transactionRepository.sum("value", {
        created_at:  Between(
          new Date(from),
          new Date(to),
       ),
       accountExternalIdDebit: null
    });

    const transactionsDebit = await this.transactionRepository.sum("value", {
        created_at:  Between(
          new Date(from),
          new Date(to),
       ),
       accountExternalIdCredit: null
    });

    return transactionsCredit - transactionsDebit;
  }
}
