	///////////////////////////////////
	/*         OBSERVABLE            */
	///////////////////////////////////

/**
  * @name Observable
  * @class
  * @classdesc standart subject for obsrver. 
  * @namespace Observable
  * @constructs 
  * @example this.subscribe({some observer});
  */

  var Observable = function()
  {

    this.subscribers = new Array();

  /**
    * @public
    * @function
    * @name subscribe
    * @desc need for subscribing observers.
    * @mamberof Observable
    * @instance
    * @param {Object} observer - object wich containe observer instans.
    */
    this.subscribe = function(observer)
    {
      this.subscribers.push(observer);
    }

  /**
    * @public
    * @function
    * @name unsubscribe
    * @desc need for unsubscribing observers.
    * @mamberof Observable
    * @instance
    * @param {Object} observer - object wich containe observer instans.
    */
    this.unsubscribe = function(observer)
    {
      for (var i = 0; i < this.subscribers.length; i++) 
      {
        if (this.subscribers[i] === observer) 
        {
          this.subscribers[i].splice(i, 1);
          return;
        };
      };
    }

  /**
    * @public
    * @function
    * @name publish
    * @desc calling observers constructors.
    * @mamberof Observable
    * @instance
    * @param {Object} data - some objects collection to do some actions with.
    * @param {int} counter - index of sub object in data collection.
    */
    this.publish = function(data, scope, index, event, condition)
    {
      for (var i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](data, scope, index, event, condition);
      };
    }

  }