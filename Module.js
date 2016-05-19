	///////////////////////////////////
	/**         SINGLETON		    **/
	///////////////////////////////////	

/**
    * @name Module
    * @author Ivan Kaduk
    * @copyright Ivan Kaduk 2016.
    * @class
    * @classdesc it is solution that helps to create additional mudules more easy and implement it to application
    * @example     Module.getInstance().modules_name = function(options)
                    {
                        // some code
                    }

                    var module = new Module.getInstance();
                    module.addFunction('8', 'modules_name');
    *
    */


	var Module = (function()
	{
		var instance;

    function createInstance() 
    {
        // 	var key_assotiation = [
        // 		{'key_combination':'27','function_name':'unselect'}, // esc
    				// {'key_combination':'9','function_name':'tab'}, // tab
    				// // {'key_combination':'16','function_name':'shift'}, // shift
    				// // {'key_combination':'17','function_name':'control'},
    				// // {'key_combination':'18','function_name':'alt'},
    				// // {'key_combination':'8','function_name':'backspase'}, // <==
    				// // {'key_combination':'46','function_name':'delete'}, // <==
    				// {'key_combination':'36','function_name':'home'},
    				// {'key_combination':'35','function_name':'end'},
    				// {'key_combination':'37','function_name':'left_arrow'}, // <-
    				// {'key_combination':'39','function_name':'right_arrow'}, // ->
    				// {'key_combination':'38','function_name':'up_arrow'}, // ^
    				// {'key_combination':'40','function_name':'dovn_arrow'} // \/
        // 	];

        // collection of hotkeys and according to them functions 
    	var key_assotiation = {'8':{ 'function_name':'backspase' }, '9':{'function_name':'tab'}};
        // array for functions arguments
    	var options ;

    /**
        * @public
        * @function
        * @name addFunction
        * @description this method need for adding new functions and hotkeys for them
        * @param {String} key_combination - string of the key combination
        * @param {String} function_name - function which will be added to a module
        */
    	function addFunction(key_combination, function_name)
    	{
    		key_assotiation[key_combination] = { 'function_name':function_name };
    	}

    /**
        * @public
        * @function
        * @name dump
        * @description list of all hotkeys and functions
        * @return {Array} - array of hotkeys and functions
        */
    	function dump()
    	{
    		console.log(key_assotiation);
            return key_assotiation;
    	}

    /**
        * @public
        * @function
        * @name runFunction
        * @description this function initializing the function according pressed hotkey
        * @param {String} combination - combination of keys converted to a string 
        */
    	function runFunction(combination)
    	{
    		if(combination > 0)
    		{
	    		if (key_assotiation[combination] != undefined )
	    		{
	    			this[key_assotiation[combination]['function_name']](options) || '';
	    		};

    		}
    	}

    /**
        * @public
        * @function
        * @name setOptions
        * @description adding arguments before function will be initialized
        * @param {Array} user_options - array of arguments for function
        */
    	function setOptions(user_options)
    	{
    		options = user_options;
    	}

    	return {
    		addFunction: addFunction,
    		dump: dump,
    		runFunction: runFunction,
    		key_assotiation: key_assotiation,
    		setOptions: setOptions
    	}

		}

		return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
	})()