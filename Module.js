	///////////////////////////////////
	/**         SINGLETON					  **/
	///////////////////////////////////	

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

    	var key_assotiation = {'8':{ 'function_name':'backspase' }, '9':{'function_name':'tab'}};

    	var options ;

    	function addFunction(key_combination, function_name)
    	{
    		key_assotiation[key_combination] = { 'function_name':function_name };
    	}

    	function dump()
    	{
    		console.log(key_assotiation);
    	}

    	function runFunction(combination)
    	{
    		//console.log((this[key_assotiation[combination]]));
    		if(combination > 0)
    		{
	    		if (key_assotiation[combination] != undefined )
	    		{
	    			console.log('cool');
	    			this[key_assotiation[combination]['function_name']](options) || '';
	    		};

    		}
    	}

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