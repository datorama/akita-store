import { ActiveState, EntityState, ID } from './config';
import { Store } from "./store";
/**
 * The Root Store that every sub store needs to inherit and
 * invoke `super` with the initial state.
 */
export declare class EntityStore<S extends EntityState<E>, E> extends Store<S> {
    private idKey;
    /** CRUD operations */
    private _crud;
    /**
     *
     * Initial the store with the state
     *
     * @param initialState
     */
    constructor(initialState: any, idKey?: string);
    /**
     * Replace current collection with provided collection
     *
     * this.store.set([Entity, Entity]);
     * this.store.set(Entity);
     *
     * @param {E[] | E} entities
     */
    set(entities: E[] | E): void;
    /**
     * Add or Update an entitiy in the collection
     *
     * this.store.createOrUpdate(ID, Entity);
     *
     * @param ID id
     * @param E entity
     */
    createOrUpdate(id: ID, entity: E): void;
    /**
     * Add an entitiy/s to the collection
     *
     * this.store.add([Entity, Entity]);
     * this.store.add(Entity);
     *
     * @param {E[]} entities
     */
    add(entities: E[] | E): void;
    /**
     *
     * Update entity/entities in the collection
     *
     * this.store.update(3, {
     *   name: 'New Name'
     * });
     *
     * this.store.update([1,2,3], {
     *   name: 'New Name'
     * });
     *
     *
     * this.store.update(null, {
     *   name: 'New Name'
     * });
     *
     * @param id
     * @param newState
     */
    update(id: ID | ID[] | null, newState: Partial<E>): void;
    /**
     *
     * Remove one/multi entities from the collection
     *
     * this.store.remove(5);
     *
     * this.store.remove([1,2,3]);
     *
     * this.store.remove();
     *
     * @param id
     */
    remove(id?: ID | ID[]): void;
    /**
     *
     * Set the active entity
     *
     * @param {number} id
     */
    setActive(id: ID): void;
}
/**
 *
 * @returns {EntityState}
 */
export declare const getInitialState: () => EntityState<any>;
/**
 *
 * @returns {EntityState}
 */
export declare const getInitiaActivelState: () => ActiveState;
