import { Result, IQueryHandler } from '../../../../core';
import { GetUserByIdQuery } from '../queries';
import { UserDto } from '../dto';

export interface IGetUserByIdQueryHandler extends IQueryHandler<GetUserByIdQuery, Result<UserDto>> {
}
