import {Entity, model, property} from '@loopback/repository';

@model()
export class Billing extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  transaction_id: string;

  @property({
    type: 'date',
  })
  billig_date?: Date;

  @property({
    type: 'number',
  })
  amount?: number;

  @property({
    type: 'string',
  })
  payment_method?: string;


  constructor(data?: Partial<Billing>) {
    super(data);
  }
}

export interface BillingRelations {
  // describe navigational properties here
}

export type BillingWithRelations = Billing & BillingRelations;
