/* tslint:disable */
/* eslint-disable */

import {BookResponse} from "./book-response";

export interface PageResponseBookResponse {
  aontent?: Array<BookResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElement?: number;
  totalPages?: number;
}
