	///////////////////////////////////
	/**         OBSERVABLE          **/
	///////////////////////////////////

/**
	* @name Observable
	* @class
	* @classdesc standart subject for obsrver 
	* @example this.subscribe({some observer});
	*/
	var Observable = function()
	{

		this.subscribers = new Array();

	/**
		* @public
		* @function
		* @name subscribe
		* @description for subscribing observers
		* @param {Object} observer - object wich containe observer instans
		*/
		this.subscribe = function(observer)
		{
			this.subscribers.push(observer);
		}

	/**
		* @public
		* @function
		* @name unsubscribe
		* @description for unsubscribing observers
		* @param {Object} observer - object wich containe observer instans
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
		* @description calling observers constructors
		* @param {Object} data - some objects collection to do some actions with
		* @param {int} counter - index of sub object in data collection
		*/
		this.publish = function(data, scope, index, event, condition)
		{
			for (var i = 0; i < this.subscribers.length; i++) {
				this.subscribers[i](data, scope, index, event, condition);
			};
		}

	}