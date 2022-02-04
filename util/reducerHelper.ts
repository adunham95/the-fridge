import { IPost } from '../models/PostModel';

export function sortByDate(array: Array<IPost>) {
  return array.sort((a, b) => {
    return Date.parse(b.dateTime) - Date.parse(a.dateTime);
  });
}
