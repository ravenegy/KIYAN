import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { SearchInventoryItemsQuery } from '../queries/SearchInventoryItemsQuery';
import { Result } from '../../../../core';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';

export interface ISearchInventoryItemsQueryHandler extends IQueryHandler<SearchInventoryItemsQuery, Result<PagedInventoryDto>> {}
