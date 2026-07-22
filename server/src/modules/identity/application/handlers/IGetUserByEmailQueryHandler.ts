import { Result, IQueryHandler } from '../../../../core';
import { GetUserByEmailQuery } from '../queries';
import { UserDto } from '../dto';

export interface IGetUserByEmailQueryHandler extends IQueryHandler<GetUserByEmailQuery, Result<UserDto>> {
}
