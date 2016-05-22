	///////////////////////////////////
	/**         SINGELTON           **/
	///////////////////////////////////

/**
	* @name Key_Scope
	* @version 1.0.0
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @class
	* @classdesc it singelton which contain current key combinations
	* @example var key_scope = Key_Scope.getInstance();
	*/
	var Key_Scope = (function () {

    var instance;

    function createInstance() 
    {
    /**
    	* @private
    	*/
    	var key_map = new Array();

    /**
    	* @private
    	*/
    	var key_flag = false;

		/**
			* @private
			* @function
			* @name addKeyToMap
			* @description adding key code to key map
			* @param {int} key - key code frome key event
			*/
		  function addKeyToMap(key) {
		    if(key_map.length == 0)
		    {
		     	key_map.push(key);
		    }
		    else
		    {
			    for (var i = 0; i <= key_map.length; i++) 
			     {
			      if(key_map[i] == key) 
			      {
			        key_flag = true;
			      }
			    }
			    if(key_flag == false)
			    {
			     	key_map.push(key);
			    }
			    key_flag = false;
		    }
		  }

		/**
			* @private
			* @function
			* @name removeKeyFromMap
			* @description removing key code to key map
			* @param {int} key - key code frome key event
			*/
		  function removeKeyFromMap(key) {
		    for (var i = 0; i <= key_map.length; i++) 
		    {
		      if (key_map[i] == key) 
		      {
		        key_map.splice(i, 1);
		      }
		    }
		  }

		/**
			* @public
			* @function
			* @name keyDown
			* @description catching code frome event and adding it to key map, on some action 
			* @param {object} e - event which contain code of pressed button
			*/
		  function keyDown(e)  {
		    var key_num;
		    if (window.event) // IE   
		    { 
		      key_num = e.keyCode;
		    	// e.preventDefault(); e.stopPropagation();      
		    } 
		    else if (e.which) // Netscape/Firefox/Opera
		    {           
		      key_num = e.which;
		    	// e.preventDefault(); e.stopPropagation();
		    }
		    addKeyToMap(key_num);
		  }

		/**
			* @public
			* @function
			* @name keyUp
			* @description catching code frome event and removing it to key map, on some action 
			* @param {object} e - event which contain code of pressed button
			*/
		  function keyUp(e) {
		    var key_num;
		    if (window.event) // IE  
		    {         
		      key_num = e.keyCode;
		    	// e.preventDefault(); e.stopPropagation();
		    } 
		    else if (e.which) // Netscape/Firefox/Opera 
		    {          
		      key_num = e.which;
		    	// e.preventDefault(); e.stopPropagation();
		    }
		    removeKeyFromMap(key_num);
		  }

		/**
			* @public
			* @function
			* @name getKeyMap
			* @description return key map 
			* @return {Array} - key map content
			*/
		  function getKeyMap()
		  {
		  	return key_map.sort();
		  }

		 /**
			* @public
			* @function
			* @name getStringKeyMap
			* @description return key map like a string
			* @return {String} - key map content
			*/
		  function getStringKeyMap()
		  {
		  	return key_map.sort().toString();
		  }

		/**
			* @public
			* @function
			* @name clearKeyMap
			* @description refreshing key map
			*/
		  function clearKeyMap()
		  {
		  	key_map = [];
		  }
 		    
		  return {
		    keyDown : keyDown,
		    keyUp : keyUp,
		    getKeyMap: getKeyMap,
		    clearKeyMap: clearKeyMap,
		    getStringKeyMap: getStringKeyMap
		  };

    }

 		return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
	})();