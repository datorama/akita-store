import { EntityState, ID } from '../api/config';
export declare class CRUD {
    /**
     *
     * @param {T} state
     * @param {EntityState[]} entities
     * @param idKey
     * @returns {T}
     * @private
     */
    _set<T extends EntityState>(state: T, entities: EntityState[], idKey: any): T;
    /**
     *
     * @param {T} state
     * @param {EntityState[]} entities
     * @param idKey
     * @returns {T}
     * @private
     */
    _add<T extends EntityState>(state: T, entities: EntityState[], idKey: any): T;
    /**
     *
     * @param {T} state
     * @param {ID[]} ids
     * @param newState
     * @returns {T}
     * @private
     */
    _update<T extends EntityState>(state: T, ids: ID[], newState: any): T;
    /**
     *
     * @param {T} state
     * @param {ID[] | null} ids
     * @returns {T}
     * @private
     */
    _remove<T extends EntityState>(state: T, ids: ID[] | null): T;
    /**
     *
     * @param {T} state
     * @param {ID} active
     * @returns {T}
     * @private
     */
    private _removeAll<T>(state, active?);
    /**
     *
     * @param {any[]} entities
     * @param {string} id
     * @returns {any}
     */
    private keyBy(entities, id?);
}
