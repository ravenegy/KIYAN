import { Result, IQueryHandler } from '../../../../core';
import { GetUserByUsernameQuery } from '../queries';
import { UserDto } from '../dto';

export interface IGetUserByUsernameQueryHandler extends IQueryHandler<GetUserByUsernameQuery, Result<UserDto>> {
}
