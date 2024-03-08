import { authenticate } from '@loopback/authentication';
import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import { Agency } from '../models';
import { AgencyRepository } from '../repositories';

@authenticate()
export class AgencyController {
  constructor(
    @repository(AgencyRepository)
    public agencyRepository: AgencyRepository,
  ) {}

  @post('/agencies')
  @response(200, {
    description: 'Agency model instance',
    content: {'application/json': {schema: getModelSchemaRef(Agency)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agency, {
            title: 'NewAgency',
            exclude: ['id', 'admin_id'],
          }),
        },
      },
    })
    agency: Omit<Agency, 'id'>,
  ): Promise<Agency> {
    agency.admin_id = 'admin';
    return this.agencyRepository.create(agency);
  }

  @get('/agencies')
  @response(200, {
    description: 'Array of Agency model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Agency, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Agency) filter?: Filter<Agency>): Promise<Agency[]> {
    return this.agencyRepository.find(filter);
  }
  @get('/agencies/{id}')
  @response(200, {
    description: 'Agency model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Agency, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Agency, {exclude: 'where'})
    filter?: FilterExcludingWhere<Agency>,
  ): Promise<Agency> {
    return this.agencyRepository.findById(id, filter);
  }

  @put('/agencies/{id}')
  @response(204, {
    description: 'Agency PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agency, {exclude: ['id', 'admin_id']}),
        },
      },
    })
    agency: Omit<Agency, 'id'>,
  ): Promise<void> {
    agency.admin_id = 'admin';
    await this.agencyRepository.replaceById(id, agency);
  }

  @del('/agencies/{id}')
  @response(204, {
    description: 'Agency DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.agencyRepository.deleteById(id);
  }
}
