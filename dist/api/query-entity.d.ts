import { EntityStore } from './entity-store';
import { EntityState, HashMap, ID } from './config';
import { Observable } from 'rxjs/Observable';
import { Query } from "./query";
export declare class QueryEntity<S extends EntityState, E> extends Query<S> {
    constructor(store: EntityStore<S, E>);
    /**
     * Select the collection as array
     *
     * this.store.selectAll();
     * Observable[Entity, Entity, Entity, Entity]
     *
     * Or as map:
     *
     * this.store.selectAll(true);
     *
     * Observable<{1: Entity, 2: Entity}>
     *
     * @returns {Observable<E[]> | Observable<HashMap<E>>}
     */
    selectAll(asMap?: false): Observable<E[]>;
    selectAll(asMap: true): Observable<HashMap<E>>;
    selectAll(asMap?: boolean): Observable<E[] | HashMap<E>>;
    /**
     * Get the collection as array
     *
     * [Entity, Entity, Entity]
     *
     * Or as map:
     *
     * { 1: Entity, 2: Entity }
     *
     * @returns {E[] | HashMap<E>}
     */
    getAll(asMap?: false): E[];
    getAll(asMap: true): HashMap<E>;
    getAll(asMap?: boolean): E[] | HashMap<E>;
    /**
     * Return the entity or a slice from the entity
     * this.pagesStore.selectEntity(1)
     * this.pagesStore.selectEntity(1, entity => entity.config.date)
     *
     * @param {ID} id
     * @param {(selectEntity: E) => R} project
     * @returns {Observable<R>}
     */
    selectEntity<R>(id: ID): Observable<E>;
    selectEntity<R>(id: ID, project: (entity: E) => R): Observable<R>;
    /**
     * Get the entity by id
     *
     * this.store.getEntity(1);
     *
     * @param id
     * @returns {any}
     */
    getEntity(id: ID): E;
    /**
     * Select the active id
     * @returns {Observable<number | string>}
     */
    selectActiveId(): Observable<ID>;
    /**
     * Select the active element
     * @returns {Observable<E>}
     */
    selectActive(): Observable<E>;
    /**
     * Get the active id
     * @returns {ID}
     */
    getActiveId(): ID;
    /**
     * Get the active element
     * @returns {E}
     */
    getActive(): E;
    /**
     * Select an selectEntity by id
     *
     * @param {number} id
     * @returns {Observable<any>}
     */
    private _byId(id);
    /**
     *
     * Get the entities as observable
     *
     * @returns {Observable<HashMap<E>>}
     */
    private _entitiesAsMap();
}
