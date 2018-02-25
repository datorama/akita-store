import { Store } from "./store";
import { Observable } from "rxjs/Observable";
export declare class Query<S> {
    protected store: Store<S>;
    constructor(store: Store<S>);
    /**
     * Select a slice from the store
     *
     * this.query.select(state => state.entities)
     *
     * @param {(store: T) => R} project
     * @returns {Observable<R>}
     */
    select<R>(project: (store: S) => R): Observable<R>;
    /**
     * Get the current state
     * @return {S}
     */
    get(): S;
}
