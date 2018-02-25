export declare class Entity {
    /**
     *
     * @param {{}} props
     */
    merge(props?: {}): void;
    /**
     * When we peforming update we want to keep the entity type,
     * otherwise it will be a plain object
     * @param {{}} props
     * @returns {E}
     */
    assign(props?: {}): any;
    /**
     * @returns {string}
     */
    toJSON(): this;
}
