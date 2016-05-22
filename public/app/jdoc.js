'use strict'
	///////////////////////////////////
	/**         MAIN CLASS          **/
	///////////////////////////////////
/**
	* @name Editor
	* @version 1.0.0
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @class
	* @augments Observable
	* @classdesc this class is creating editor object
	* @example var spoiler = new Spoiler('spoiler','opened', 1);
	* @param {String} className - class of div wich containe spoiler child elements.
	*/
	var Editor = (function()
	{
		// constructor
		function Editor(name, options){
			if(name != undefined)
			{
				// innitialization global variables for 
			/**
				* @public
				*/	
				this.editor_name = name;
			/**
				* @public
				*/	
				this.container= new Array();
			/**
				* @public
				*/	
				this.work_space = new Array();
			/**
				* @public
				*/	
				this.symbol_buffer = new Array();
			/**
				* @public
				*/	
				this.console = new Array();
			/**
				* @public
				*/
				this.line = new Array();
			/**
				* @public
				*/
				this.current_line = new Array();

				// inheritation of observable
				if(Observable != undefined)
				{
					Observable.apply(this, arguments);
					this.subscribe(Key_Observer);
				}


				// unic code for each editor by this class 
				for (var i = 0; i < document.getElementsByClassName(this.editor_name).length; i++) 
				{

					// main container
					this.container[i] = document.getElementsByClassName(this.editor_name)[i];
					this.container[i].style.position = 'relative';

					// textare tag for given symbols 
					this.symbol_buffer[i] = document.createElement('textarea');
					this.symbol_buffer[i].className = 'symbol_buffer';
					this.symbol_buffer[i].cols = '1';
					this.symbol_buffer[i].rows = '1';
					this.symbol_buffer[i].style.opacity = '0';
					this.container[i].appendChild(this.symbol_buffer[i]);

					// working space 
					this.work_space[i] = document.createElement('div');
					this.work_space[i].className = 'result';
					this.work_space[i].style.border = '1px solid #000';
					this.work_space[i].style.height = '500px';
					function disableselect(e) {return false}
					this.work_space[i].onselectstart = function (){return false};
					this.work_space[i].onmousedown = disableselect;
					this.container[i].appendChild(this.work_space[i]);

					// initializing first line
					this.line[i] = new Array();
					this.current_line[i] = 1;
					this.line[i][this.current_line[i]] = document.createElement('div');
					this.line[i][this.current_line[i]].className = 'line';
					this.line[i][this.current_line[i]].setAttribute('line_number', this.current_line[i]);
					this.work_space[i].appendChild(this.line[i][this.current_line[i]]);

					// console in right conor of component
					if(options.console == true)
					{
						this.console[i] = document.createElement('div');
						this.console[i].className = 'console';
						this.console[i].style.border = '1px solid #000';
						this.console[i].style.position = 'absolute';
						this.console[i].style.top = '0px';
						this.console[i].style.right = '0px';
						this.console[i].style.width = '200px';
						this.console[i].style.height = '50px';
						this.container[i].appendChild(this.console[i]);
					}

				/**
					* @event work_space#onclick
					*/
					this.work_space[i].object = this;
					this.work_space[i].index = i;
					this.work_space[i].key_scope = Key_Scope.getInstance();
					this.work_space[i].onclick = function()
					{
						this.object.symbol_buffer[this.index].focus();
						//console.log(window.getSelection());
					}


				/**
					* @event symbol_buffer#onclick
					* @param {object} e - event wich will contain key code
					*/
					this.symbol_buffer[i].object = this;
					this.symbol_buffer[i].index = i;
					this.symbol_buffer[i].key_scope = Key_Scope.getInstance();
					this.symbol_buffer[i].onkeydown = function(e)
					{
						// observer innitialithation 
						if(Observable != undefined)
						{
							this.object.publish(this.object, this.key_scope, this.index, e, 'pressed');
						}
					};

				/**
					* @event symbol_buffer#onkeyup
					* @param {object} e - event wich will contain key code
					*/
					this.symbol_buffer[i].onkeyup = function(e)
					{
						if(Observable != undefined)
						{
							this.object.publish(this.object, this.key_scope, this.index, e, 'relised');
						}
					};

				/**
					* @event symbol_buffer#onblur
					*/
					this.symbol_buffer[i].onblur = function()
					{
						this.key_scope.clearKeyMap();
					}

				};
			}
			else
			{
				console.log('sorry but you have not add any name to editors name field');
			}
		}

		return Editor;

	})()
	///////////////////////////////////
	/**         BUILDER             **/
	///////////////////////////////////
/**
	* @name Char_Class_Generator
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @class
	* @classdesc this class is returning string for elements class
	* @example class_generator
						.setPrefix('wet-')
						.mainClass(data.symbol_buffer[index].value)
						.space()
						.subClass(data.symbol_buffer[index].value)
						.generate() 
	*/
	var Char_Class_Generator = function()
	{
		var char = '';
		var code = '';
		var result_class = '';
		var prefix = '';

	/**
		* @public
		* @function
		* @name mainClass
		* @description adding main class
		* @param {String} user_char - char from cher buffer 
		*/
		function mainClass(user_char)
		{

			char = user_char;
			// converting char type variable to dec code
			code = char.charCodeAt(0);

			// adding class to result variable
			if((code <= 47)||((code >= 58)
			&&(code <= 64))||((code >= 91)
			&&(code <= 96))||((code >= 122)
			&&(code <= 126)))
			{
				result_class = prefix + 'signifier';
			}
			else if((code >= 48)&&(code <= 57))
			{
				result_class = prefix + 'numeral';
			}
			else if(((code >= 65)&&(code <= 90))
						||((code >= 97)&&(code <= 122)))
			{
				result_class = prefix + 'character';
			}
			return this;
		}

	/**
		* @public
		* @function
		* @name subClass
		* @description adding subclass to main 
		* @param {String} user_char - char from cher buffer 
		*/
		function subClass(user_char)
		{
			char = user_char;
			code = char.charCodeAt(0);

			// signifires and uppercase code map 
			var codes = [
				{'start_code':32, 'end_code':32, 'desc':'space'}, //
				{'start_code':33, 'end_code':33, 'desc':'exclamation'}, // !
				{'start_code':34, 'end_code':34, 'desc':'quotation '}, // "
				{'start_code':35, 'end_code':35, 'desc':'hash'}, // #
				{'start_code':36, 'end_code':36, 'desc':'dollar'}, // $
				{'start_code':37, 'end_code':37, 'desc':'percent'}, // %
				{'start_code':38, 'end_code':38, 'desc':'ampersand'}, // &
				{'start_code':39, 'end_code':39, 'desc':'apostrophe'}, // '
				{'start_code':40, 'end_code':40, 'desc':'left_parenthesis'}, // (
				{'start_code':41, 'end_code':41, 'desc':'right_parenthesis'}, // )
				{'start_code':42, 'end_code':42, 'desc':'asterix'}, // *
				{'start_code':43, 'end_code':43, 'desc':'plus'}, // +
				{'start_code':44, 'end_code':44, 'desc':'comma'}, // ,
				{'start_code':45, 'end_code':45, 'desc':'hyphen'}, // - 
				{'start_code':46, 'end_code':46, 'desc':'period'}, // .
				{'start_code':47, 'end_code':47, 'desc':'slash'}, // /
				{'start_code':58, 'end_code':58, 'desc':'colon'}, // :
				{'start_code':59, 'end_code':59, 'desc':'semicolon'}, // ;
				{'start_code':60, 'end_code':60, 'desc':'less_than'}, // <
				{'start_code':61, 'end_code':61, 'desc':'equals'}, // =
				{'start_code':62, 'end_code':62, 'desc':'greater_than'}, // >
				{'start_code':63, 'end_code':63, 'desc':'question'}, // ?
				{'start_code':64, 'end_code':64, 'desc':'at'}, // @
				{'start_code':65, 'end_code':90, 'desc':'uppercase'}, // upp
				{'start_code':91, 'end_code':91, 'desc':'left_square_vrecket'}, // [
				{'start_code':92, 'end_code':92, 'desc':'backslash'}, // \
				{'start_code':93, 'end_code':93, 'desc':'right_square_vrecket'}, // ]
				{'start_code':94, 'end_code':94, 'desc':'caret'}, // ^
				{'start_code':95, 'end_code':95, 'desc':'underscore'}, // _
				{'start_code':96, 'end_code':96, 'desc':'grave_accent'}, // `
				{'start_code':123, 'end_code':123, 'desc':'left_curly_brace'}, // {
				{'start_code':124, 'end_code':124, 'desc':'vertical_bar'}, // |
				{'start_code':125, 'end_code':125, 'desc':'left_curly_brace'}, // }
				{'start_code':126, 'end_code':126, 'desc':'tilda'}, // ~ 
			];
			// adding subclass to result class 
			for (var i = 0; i < codes.length; i++) {
				if((code == codes[i].start_code))
				{
					result_class += prefix + codes[i].desc;
				}
				else if(((code >= codes[i].start_code)&&(code <= codes[i].start_code)))
				{
					result_class += prefix + codes[i].desc;
				}
				else
				{
					result_class += '';
				}
			};
			return this;
		}

	/**
		* @public
		* @function
		* @name setPrefix
		* @description setting prefix, which will be adding to every class
		* @param {String} user_prefix - prefix for class
		*/
		function setPrefix(user_prefix)
		{
			prefix = user_prefix || "";
			return this;
		}

	/**
		* @public
		* @function
		* @name space
		* @description addpace between classes
		*/
		function space()
		{
			result_class += ' ';
			return this;
		}

	/**
		* @public
		* @function
		* @name generate
		* @description builder function
		*/
		function generate()
		{
			return result_class;
		}

		return{
			mainClass: mainClass,
			subClass: subClass,
			generate: generate,
			setPrefix: setPrefix,
			space: space
		}
	}
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
///////////////////////////////////
	/**         OBSERVERS           **/
	///////////////////////////////////

	var Key_Observer = function(data, scope, index, event, condition)
	{	
		// initialization of new character class generator 
		var class_generator = new Char_Class_Generator('wet-');
		var hotkey = new Module.getInstance();

		

		// if controlling key pressed 
		// need to disabled browser hotkeys 
		if(scope.getKeyMap()[0] < '46'){//16
			event.preventDefault(); event.stopPropagation(); 
		}

	/**
		* @private
		* @function
		* @name deletePrevioseCursor
		* @description it is need to delete previose cursor 
		*/
		function deletePrevioseCursor(){
			if(document.getElementsByClassName('active')[0] != undefined){
				var previose = document.getElementsByClassName('active')[0] || '';
				var class_array = previose.className.split(" ");
				previose.className = '';
				for (var i = 0; i < class_array.length-1; i++) {
					previose.className += class_array[i];
					previose.className += ' ';

				};
			}
		}


		// if that key pressed on new line
		if(data.line[index][data.current_line[index]].innerHTML == '')
		{
			// deleting previose cursor 
			deletePrevioseCursor();

			// creating start span element on line begins 
			var first_symbol = document.createElement('span');
			first_symbol.origin_class_name = 'wet-line-start';
			first_symbol.className = first_symbol.origin_class_name + ' active';
			var first_symbol_content = document.createTextNode(' ');
			first_symbol.appendChild(first_symbol_content);

			// adding starting teg for a line 
			data.line[index][data.current_line[index]].innerHTML = data.line[index][data.current_line[index]].innerHTML 
																														+ first_symbol.outerHTML;

		}

		// if pressed key is not null 
		if(data.symbol_buffer[index].value != '')
		{
			// deleting previose cursor 
			deletePrevioseCursor();

			// creating span for regular character or symbol
			var symbol = document.createElement('span');
			symbol.origin_class_name = class_generator
																.setPrefix('wet-')
																.mainClass(data.symbol_buffer[index].value)
																.space()
																.subClass(data.symbol_buffer[index].value)
																.generate();
			symbol.className = symbol.origin_class_name + ' active';
			var symbol_content = document.createTextNode(data.symbol_buffer[index].value);
			symbol.appendChild(symbol_content);

			// adding character with a span tag and special class
			data.line[index][data.current_line[index]].innerHTML = data.line[index][data.current_line[index]].innerHTML 
																														+ symbol.outerHTML;
			// clearing buffer
			data.symbol_buffer[index].value = '';
		}
		// enter emulation, using adding new line
		if(scope.getKeyMap() == 13 ) //  enter
		{
			// deleting previose cursor
			deletePrevioseCursor();
			// index of created line
			data.current_line[index]++;
			// adding new line
			data.line[index][data.current_line[index]] = document.createElement('div');
			data.line[index][data.current_line[index]].className = 'line';
			data.line[index][data.current_line[index]].setAttribute('line_number', data.current_line[index]);
			data.work_space[index].appendChild(data.line[index][data.current_line[index]]);
		}
	
		// if key is pressed or relissed add event to singleton
		if(condition == 'pressed')
		{
			hotkey.setOptions({
				'object': data,
				'index': index
			});
			hotkey.runFunction(scope.getStringKeyMap());
			scope.keyDown(event);
			// event.preventDefault(); event.stopPropagation(); 
		}
		else if(condition == 'relised')
		{
			hotkey.runFunction(scope.getStringKeyMap());
			scope.keyUp(event);
			// event.preventDefault(); event.stopPropagation(); 
		}		

		// adding pressed keys combinations to console
		if(data.console[index] != undefined)
		{
			data.console[index].innerHTML = (scope.getKeyMap());

		}
	}
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
	
/**
  * @name backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @desc this module need to emulate "backspase" key features
  */
	Module.getInstance().backspase = function(options){

		// getting active element that must be deleted
		var active_char = document.getElementsByClassName('active')[0];

		// getting previose element thet will be active after key pressed
		var previous_char = document.getElementsByClassName('active')[0].previousSibling;

		if(previous_char != null)
		{
			if(previous_char.className.split(' ')[0] == 'wet-line-start'){

				// getting original class name of the previous element
				var previous_char_original_class_name = document.getElementsByClassName('active')[0].previousSibling.className.trim();

				// deleting active element
				active_char.parentNode.removeChild(active_char);

				// making previous element to be an active 
				previous_char.className = previous_char_original_class_name + ' ' + 'active';	
			}
			else
			{

				// getting original class name of the previous element
				var previous_char_original_class_name = document.getElementsByClassName('active')[0].previousSibling.className.trim();

				// deleting active element
				active_char.parentNode.removeChild(active_char);

				// making previous element to be an active 
				previous_char.className = previous_char_original_class_name + ' ' + 'active';	
			}
		}
		else
		{
			if(active_char.className.split(" ")[0] == 'wet-line-start')
			{
				var parent_s = active_char.parentNode;
				console.log(parent_s);
				parent_s.parentNode.removeChild(parent_s);
				// !!!!!!!!!! change this.current_line 
			}
		}
	}

	var module = new Module.getInstance();
	module.addFunction('8', 'backspase');