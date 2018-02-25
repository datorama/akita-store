export class Entity {
  
  /**
   *
   * @param {{}} props
   */
  merge(props = {}) {
    Object.assign(this, props);
  }
  
  /**
   * When we peforming update we want to keep the entity type,
   * otherwise it will be a plain object
   * @param {{}} props
   * @returns {E}
   */
  assign(props = {}) {
    const constructor: any = this.constructor;
    const instance = new constructor();
    Object.assign(instance, this, props);
    
    return instance;
  }

  /**
   * @returns {string}
   */
  toJSON() {
    return this;
  }
}
