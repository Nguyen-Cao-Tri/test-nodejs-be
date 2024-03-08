import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Billing} from '../models';
import {BillingRepository} from '../repositories';

export class BillingController {
  constructor(
    @repository(BillingRepository)
    public billingRepository : BillingRepository,
  ) {}

  @post('/billings')
  @response(200, {
    description: 'Billing model instance',
    content: {'application/json': {schema: getModelSchemaRef(Billing)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Billing, {
            title: 'NewBilling',
            exclude: ['id'],
          }),
        },
      },
    })
    billing: Omit<Billing, 'id'>,
  ): Promise<Billing> {
    return this.billingRepository.create(billing);
  }

  

  @get('/billings')
  @response(200, {
    description: 'Array of Billing model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Billing, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Billing) filter?: Filter<Billing>,
  ): Promise<Billing[]> {
    return this.billingRepository.find(filter);
  }

 
  @get('/billings/{id}')
  @response(200, {
    description: 'Billing model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Billing, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Billing, {exclude: 'where'}) filter?: FilterExcludingWhere<Billing>
  ): Promise<Billing> {
    return this.billingRepository.findById(id, filter);
  }

  @put('/billings/{id}')
  @response(204, {
    description: 'Billing PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() billing: Billing,
  ): Promise<void> {
    await this.billingRepository.replaceById(id, billing);
  }

  @del('/billings/{id}')
  @response(204, {
    description: 'Billing DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.billingRepository.deleteById(id);
  }
}
