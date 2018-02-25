import { Observable } from 'rxjs/Observable';
/**
 * The Root Store that every sub store needs to inherit and
 * invoke `super` with the initial state.
 */
export declare class Store<S> {
    /** Manage the store with BehaviorSubject */
    private _store;
    /**
     * Actions waiting for the end of the batch
     */
    private pendingTransactionActions;
    /**
     *
     * Initial the store with the state
     *
     * @param initialState
     */
    constructor(initialState: any);
    /**
     * Select a slice from the store
     *
     * this.store.select(state => state.entities)
     *
     * @param {(store: T) => R} project
     * @returns {Observable<R>}
     */
    _select<R>(project: (store: S) => R): Observable<R>;
    /**
     *
     * Get the raw state value
     *
     * @returns {S}
     */
    value(): S;
    /**
     *
     * Update the store with a new value
     *
     * @param {(state: S) => S} newStateFn
     */
    setState(newStateFn: (state: S) => S): void;
    /**
     *
     * @param {S} state
     */
    private dispatch(state);
    /**
     *
     *
     * @returns {Observable<S>}
     * @private
     */
    private readonly _store$;
    private watchTransaction();
    /**
     *
     * @param newState
     * @private
     */
    private _addMiddlewares(newState);
}
