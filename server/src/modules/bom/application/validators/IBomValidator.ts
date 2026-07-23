import { CreateBomCommand } from '../commands/CreateBomCommand';
import { AddBomComponentCommand } from '../commands/AddBomComponentCommand';
import { Result } from '../../../../core/results/Result';

export interface IBomValidator {
  validateCreateBom(command: CreateBomCommand): Result<void>;
  validateAddBomComponent(command: AddBomComponentCommand): Result<void>;
}
