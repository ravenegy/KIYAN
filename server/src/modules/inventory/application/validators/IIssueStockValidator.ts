import { Result } from '../../../../core';
import { IssueStockCommand } from '../commands/IssueStockCommand';

export interface IIssueStockValidator {
  validate(command: IssueStockCommand): Result<void>;
}
