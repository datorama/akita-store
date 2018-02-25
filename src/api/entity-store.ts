import { CRUD as _CRUD } from '../core/crud';
import {ActiveState, EntityState, ID} from './config';
import {coerceArray} from '../core/utils';
import {Store} from "./store";

/**
 * Inject the class once to the store, so we can leverage the same instance
 */
const CRUD = new _CRUD();

/**
 * The Root Store that every sub store needs to inherit and
 * invoke `super` with the initial state.
 */
export class EntityStore<S extends EntityState<E>, E> extends Store<S> {
  
  /** CRUD operations */
  private _crud = CRUD;

  /**
   *
   * Initial the store with the state
   *
   * @param initialState
   */
  constructor(initialState, private idKey = 'id') {
    super(initialState);
  }

  /**
   * Replace current collection with provided collection
   *
   * this.store.set([Entity, Entity]);
   * this.store.set(Entity);
   *
   * @param {E[] | E} entities
   */
  set(entities: E[] | E) {
    this.setState(state => this._crud._set(state, coerceArray(entities), this.idKey));
  }
  
  /**
   * Add or Update an entitiy in the collection
   *
   * this.store.createOrUpdate(ID, Entity);
   *
   * @param ID id
   * @param E entity
   */
  createOrUpdate(id: ID, entity: E) {
    const currState = this.value();
    const hasEntity = !!currState.entities[id];
    if (hasEntity) {
      this.update(id, entity);
    }
    else {
      this.add(entity);
    }
  }
  
  /**
   * Add an entitiy/s to the collection
   *
   * this.store.add([Entity, Entity]);
   * this.store.add(Entity);
   *
   * @param {E[]} entities
   */
  add(entities: E[] | E) {
    this.setState(state => this._crud._add(state, coerceArray(entities), this.idKey));
  }

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
  update(id: ID | ID[] | null, newState: Partial<E>) {
    const ids = id == null ? this.value().ids : coerceArray(id as any);
    this.setState(state => this._crud._update(state, ids, newState));
  }

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
  remove(id?: ID | ID[]) {
    const ids = id ? coerceArray(id) : null;
    this.setState(state => this._crud._remove(state, ids));
  }

  /**
   *
   * Set the active entity
   *
   * @param {number} id
   */
  setActive(id: ID) {
    this.setState(state => {
      return {
        ...(state as any),
        active: id
      };
    });
  }
  
}

/**
 *
 * @returns {EntityState}
 */
export const getInitialState = () =>
  ({
    entities: {},
    ids: []
  } as EntityState);

/**
 *
 * @returns {EntityState}
 */
export const getInitiaActivelState = () =>
  ({
    active: null
  } as ActiveState);
