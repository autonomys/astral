import { Field, ObjectType, Query, Resolver } from 'type-graphql';
import type { EntityManager } from 'typeorm';
import { Extrinsic, Event, Log } from '../../model';

@ObjectType()
export class ExtrinsicNamesResult {
  @Field(() => [String], { nullable: false })
  result!: string[];

  constructor(props: Partial<ExtrinsicNamesResult>) {
    Object.assign(this, props);
  }
}

@ObjectType()
export class EventNamesResult {
  @Field(() => [String], { nullable: false })
  result!: string[];

  constructor(props: Partial<EventNamesResult>) {
    Object.assign(this, props);
  }
}

@ObjectType()
export class LogNamesResult {
  @Field(() => [String], { nullable: false })
  result!: string[];

  constructor(props: Partial<LogNamesResult>) {
    Object.assign(this, props);
  }
}

@Resolver()
export class CustomResolver {
  constructor(private readonly tx: () => Promise<EntityManager>) { }

  @Query(() => ExtrinsicNamesResult)
  async extrinsicNamesQuery(): Promise<ExtrinsicNamesResult> {
    const manager = await this.tx();
    // execute custom SQL query
    const result = await manager.getRepository(Extrinsic).query(
      `SELECT ARRAY_AGG(DISTINCT name) as result
      FROM Extrinsic`);

    return result[0];
  }

  @Query(() => EventNamesResult)
  async eventsNamesQuery(): Promise<EventNamesResult> {
    const manager = await this.tx();
    // execute custom SQL query
    const result = await manager.getRepository(Event).query(
      `SELECT ARRAY_AGG(DISTINCT name) as result
      FROM Event`);

    return result[0];
  }

  @Query(() => LogNamesResult)
  async logTypesQuery(): Promise<LogNamesResult> {
    const manager = await this.tx();
    // execute custom SQL query
    const result = await manager.getRepository(Log).query(
      `SELECT ARRAY_AGG(DISTINCT kind) as result
      FROM Log`);

    return result[0];
  }
}
