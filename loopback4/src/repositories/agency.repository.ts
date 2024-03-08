import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Agency, AgencyRelations} from '../models';

export class AgencyRepository extends DefaultCrudRepository<
  Agency,
  typeof Agency.prototype.id,
  AgencyRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Agency, dataSource);
  }
}
