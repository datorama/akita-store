import { EntityState, ID } from '../api/config';

export class CRUD {
  /**
   *
   * @param {T} state
   * @param {EntityState[]} entities
   * @param idKey
   * @returns {T}
   * @private
   */
  _set<T extends EntityState>(state: T, entities: EntityState[], idKey): T {
    const toHashMap = this.keyBy(entities, idKey);
    return {
      ...(state as any),
      entities: toHashMap,
      ids: entities.map(entity => entity[idKey])
    };
  }

  /**
   *
   * @param {T} state
   * @param {EntityState[]} entities
   * @param idKey
   * @returns {T}
   * @private
   */
  _add<T extends EntityState>(state: T, entities: EntityState[], idKey): T {
    let addedEntities = {};
    let addedIds = [];
    
    entities.forEach(entity => {
      const entityId = entity[idKey];
      
      if (state.entities[entityId] === undefined) {
        addedEntities[entityId] = entity;
        addedIds.push(entityId);
      }
    });
    return {
      ...(state as any),
      entities: {
        ...state.entities,
        ...addedEntities
      },
      ids: [...state.ids, ...addedIds]
    };
  }

  /**
   *
   * @param {T} state
   * @param {ID[]} ids
   * @param newState
   * @returns {T}
   * @private
   */
  _update<T extends EntityState>(state: T, ids: ID[], newState): T {
    const updatedEntities = ids.reduce((acc, id) => {
      const newEntity = state.entities[id].assign(newState);
      acc[id] = newEntity;
      return acc;
    }, {});

    return {
      ...(state as any),
      entities: {
        ...state.entities,
        ...updatedEntities
      }
    };
  }

  /**
   *
   * @param {T} state
   * @param {ID[] | null} ids
   * @returns {T}
   * @private
   */
  _remove<T extends EntityState>(state: T, ids: ID[] | null): T {
    if (!ids) return this._removeAll(state);

    const removed = ids.reduce((acc, id) => {
      const { [id]: entity, ...rest } = acc;
      return rest;
    }, state.entities);

    return {
      ...(state as any),
      entities: removed,
      ids: state.ids.filter(current => ids.indexOf(current) === -1)
    };
  }

  /**
   *
   * @param {T} state
   * @param {ID} active
   * @returns {T}
   * @private
   */
  private _removeAll<T extends EntityState>(state: T, active?: ID): T {
    const newState = {
      ...(state as any),
      entities: {},
      ids: []
    };
    if (active) {
      newState.active = active;
    }

    return newState;
  }

  /**
   *
   * @param {any[]} entities
   * @param {string} id
   * @returns {any}
   */
  private keyBy(entities: any[], id = 'id') {
    return entities.reduce((acc, entity) => {
      acc[entity[id]] = entity;
      return acc;
    }, {});
  }
}
