import {Store} from "./store";
import {Observable} from "rxjs/Observable";

export class Query<S> {
  constructor(protected store: Store<S>) {}
  
  /**
   * Select a slice from the store
   *
   * this.query.select(state => state.entities)
   *
   * @param {(store: T) => R} project
   * @returns {Observable<R>}
   */
  select<R>(project: (store: S) => R): Observable<R> {
    return this.store._select(project);
  }
  
  /**
   * Get the current state
   * @return {S}
   */
  get(): S {
    return this.store.value();
  }
  
}
