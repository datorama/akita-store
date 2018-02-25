/**
 * Interface for objects
 *
 * const dashboards: HashMap<Dashboard> = {
 *   1: Dashboard
 * }
 */
export interface HashMap<T> {
    [id: string]: T;
}
/**
 *  The Entity State is a predefined generic interface for a given selectEntity collection
 *  with the following interface:
 *
 *  `ids`: An array of all the primary ids in the collection
 *  `entities`: A dictionary of entities in the collection indexed by the primary id
 */
export interface EntityState<T = any> {
    entities?: HashMap<T>;
    ids?: (number | string)[];
    /** This is for stores that doesn't implements the EntityState interface */
    [key: string]: any;
}
/**
 * Interface for stores that needs an selectActive selectEntity indication
 */
export interface ActiveState {
    active: number | string;
}
/** Entity id interface */
export declare type ID = number | string;
