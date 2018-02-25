/**
 * Akita global state
 */
import { Subject } from "rxjs/Subject";
export declare class AkitaGlobals {
    /**
     * How many transactions block
     */
    batchTransactions: number;
    /**
     * Emit when the last transaction committed
     */
    batchTransaction: Subject<boolean>;
}
export declare let globalState: AkitaGlobals;
export declare function getGlobalState(): any;
