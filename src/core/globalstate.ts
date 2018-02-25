/**
 * Akita global state
 */
import {Subject} from "rxjs/Subject";

export class AkitaGlobals {
  
  /**
   * How many transactions block
   */
  batchTransactions: number = 0;
  
  /**
   * Emit when the last transaction committed
   */
  batchTransaction: Subject<boolean>;
  
}

export let globalState: AkitaGlobals = new AkitaGlobals();

export function getGlobalState(): any {
  return globalState;
}