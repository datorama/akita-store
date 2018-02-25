import { Observable } from 'rxjs/Observable';
export declare const workerMap: (fn: Function) => <T>(source: Observable<T>) => Observable<{}>;
