import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {AkitaImmutabilityError} from "../core/error";
import {isInTransactionBatch, transactionCommit} from "../core/transaction.util";
import {compose} from "../core/utils";

function logger({storeName, currentState, newState}) {
  console.group(storeName);
  console.log(`%c prev state `, 'font-weight: bold; color: darkgrey', currentState);
  console.log(`%c next state `, 'font-weight: bold; color: hotpink', newState);
  console.groupEnd();
  return newState;
}

const PRE_MIDDLEWARES = [logger];

/**
 * The Root Store that every sub store needs to inherit and
 * invoke `super` with the initial state.
 */
export class Store<S> {
  /** Manage the store with BehaviorSubject */
  private _store: BehaviorSubject<S>;
  
  /**
   * Actions waiting for the end of the batch
   */
  private pendingTransactionActions = [];
  
  /**
   *
   * Initial the store with the state
   *
   * @param initialState
   */
  constructor(initialState) {
    this._store = new BehaviorSubject(initialState);
  }
  
  /**
   * Select a slice from the store
   *
   * this.store.select(state => state.entities)
   *
   * @param {(store: T) => R} project
   * @returns {Observable<R>}
   */
  _select<R>(project: (store: S) => R): Observable<R> {
    return this._store$.pipe(map(project), distinctUntilChanged());
  }
  
  /**
   *
   * Get the raw state value
   *
   * @returns {S}
   */
  value(): S {
    return this._store.getValue();
  }
  
  /**
   *
   * Update the store with a new value
   *
   * @param {(state: S) => S} newStateFn
   */
  setState(newStateFn: (state: S) => S) {
    
    if (isInTransactionBatch()) {
      // subscribe to the transaction end only once
      if (!this.pendingTransactionActions.length) {
        this.watchTransaction();
      }
      this.pendingTransactionActions.push(newStateFn);
    }
    else {
      const prevState = this.value();
      const newState = newStateFn(prevState);
      
      // make sure the new state is immutable
      if (prevState === newState) {
        throw new AkitaImmutabilityError(prevState);
      }
      
      this.dispatch(newState);
    }
  }
  
  /**
   *
   * @param {S} state
   */
  private dispatch(state: S) {
    this._store.next(state);
  }
  
  /**
   *
   *
   * @returns {Observable<S>}
   * @private
   */
  private get _store$() {
    return this._store.asObservable();
  }
  
  private watchTransaction() {
    transactionCommit()
      .subscribe(() => {
        const prevState = this.value();
        const newState = compose(...this.pendingTransactionActions)(prevState);
        this.pendingTransactionActions = [];
        this.dispatch(newState);
      });
  }
  
  /**
   *
   * @param newState
   * @private
   */
  private _addMiddlewares(newState) {
    PRE_MIDDLEWARES.forEach(middleware =>
      middleware({
        newState,
        currentState: this.value(),
        storeName: this.constructor.name
      })
    );
  }
}