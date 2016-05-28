	///////////////////////////////////
	/*           SINGLETON		       */
	///////////////////////////////////	

/**
    * @name Module
    * @author Ivan Kaduk
    * @copyright Ivan Kaduk 2016.
		* @License cc-by-nc-sa 4.0
    * @class
    * @classdesc it is solution that helps to create additional mudules more easy and implement it to application
		* @namespace Module
		* @constructs Module
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
		* @private
		* @function
		* @name deletePrevioseCursor
		* @desc it is need to delete previose cursor and it protect of making unnecessary multicursors
		* @mamberof Module
		* @inner
		*/
		function deletePrevioseCursor(concrete_entity)
		{
			// element with class 'active' 
			var active_element = concrete_entity.getElementsByClassName("active")[0]; 
			
			var class_generator = new Char_Class_Generator('wet-');
			
			// if element is exist than change his class to native without 'active' mark
			if(active_element != undefined)
			{
				active_element.className = class_generator
																	.setPrefix('wet-')
																	.mainClass(active_element.innerHTML)
																	.space()
																	.subClass(active_element.innerHTML)
																	.generate();
			}
		}
		
	/**
		* @private
		* @function
		* @name deletePrevioseParent
		* @desc it is need to delete 'perent' class from object it gives oportunity to know in which exact container
		* is word lie
		* @mamberof Module
		* @inner
		*/
		function deletePrevioseParent(concrete_entity)
		{
			// active word 
			var parent = concrete_entity.getElementsByClassName('parent')[0];
			
			// make a standart class for word 
			if(parent != undefined)
			{
				parent.className = "wet-word";
			}
		}

    /**
        * @public
        * @function addFunction
        * @desc this method need for adding new functions and hotkeys for them
				* @mamberof Module
				* @instance
        * @param {String} key_combination - string of the key combination
        * @param {String} function_name - function which will be added to a module
        */
    	function addFunction(key_combination, function_name)
    	{
    		key_assotiation[key_combination] = { 'function_name':function_name };
    	}

    /**
        * @public
        * @function dump
        * @desc list of all hotkeys and functions
				* @mamberof Module
				* @instance
        * @return {Array} - array of hotkeys and functions
        */
    	function dump()
    	{
    		console.log(key_assotiation);
        return key_assotiation;
    	}

    /**
        * @public
        * @function runFunction
        * @desc this function initializing the function according pressed hotkey
				* @mamberof Module
				* @instance
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
        * @function setOptions
        * @desc adding arguments before function will be initialized
				* @mamberof Module
				* @instance
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
    		setOptions: setOptions,
				deletePrevioseCursor: deletePrevioseCursor,
				deletePrevioseParent: deletePrevioseParent				
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