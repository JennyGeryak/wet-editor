'use strict'
	///////////////////////////////////
	/*          MAIN CLASS           */
	///////////////////////////////////
/**
	* @name Editor
	* @version 1.0.1
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
	* @class
	* @namespace Editor
	* @augments Observable
	* @constructs
	* @classdesc this class is creating editor object
	* @example var spoiler = new Spoiler('spoiler','opened', 1);
	* @param {String} className - class of div wich containe spoiler child elements.
	*/
	var Editor = (function()
	{
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
					this.symbol_buffer[i].onkeydown = function(event)
					{
						// observer innitialithation 
						if(Observable != undefined)
						{
							this.object.publish(this.object, this.key_scope, this.index, event, 'pressed');
						}
					};

				/**
					* @event symbol_buffer#onkeyup
					* @param {object} e - event wich will contain key code
					*/
					this.symbol_buffer[i].onkeyup = function(event)
					{
						if(Observable != undefined)
						{
							this.object.publish(this.object, this.key_scope, this.index, event, 'relised');
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
	/*          BUILDER              */
	///////////////////////////////////
/**
	* @name Char_Class_Generator
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
	* @class
	* @namespace Char_Class_Generator
	* @constructs 
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
		* @mamberof Char_Class_Generator
		* @instance
		* @desc adding main class
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
		* @mamberof Char_Class_Generator
		* @instance
		* @desc adding subclass to main 
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
		* @mamberof Char_Class_Generator
		* @instance
		* @desc setting prefix, which will be adding to every class
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
		* @mamberof Char_Class_Generator
		* @instance
		* @desc addpace between classes
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
		* @mamberof Char_Class_Generator
		* @instance
		* @desc builder function
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
	/*         OBSERVABLE            */
	///////////////////////////////////

/**
	* @name Observable
	* @class
	* @classdesc standart subject for obsrver 
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
		* @desc for subscribing observers
		* @mamberof Observable
		* @instance
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
		* @desc for unsubscribing observers
		* @mamberof Observable
		* @instance
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
		* @desc calling observers constructors
		* @mamberof Observable
		* @instance
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
	/*          OBSERVERS            */
	///////////////////////////////////
/**
	* @name Key_Observer
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
	* @class
	* @classdesc it is reaction of observer on key event
	* @namespace Key_Observer
	* @constructs
	* @param {Editor} data - getting main object
	* @param {Key_Scope} scope - key map singelton 
	* @param {int} index - index of current active editor element
	* @param {event} event - object that contain event data
	* @param {String} condition - condition of key: pressed or released 
	*/
	var Key_Observer = function(data, scope, index, event, condition)
	{	
		// initialization of new character class generator 
		var class_generator = new Char_Class_Generator('wet-');
		
		// initialization of module that make action according pressed keys
		var hotkey = new Module.getInstance();
		
		// current entity of editor
		var concrete_entity = data.container[index];
		
		// initialization of words exloser 
		var divider = new Divider();

		// if controlling key pressed 
		// need to disabled browser hotkeys 
		if(scope.getKeyMap()[0] < '46'){//16
			event.preventDefault(); event.stopPropagation(); 
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
			// detecting previouse element with 'active' class name
			var previouse_element = concrete_entity.getElementsByClassName('active')[0];
			var previouse_element_class = previouse_element ? previouse_element.className.split(" ")[0] : ''; 
			
			// this an exception element that dont have auto generative class 
			// that is why whe need to give our own
			if((previouse_element_class == 'wet-line-start'))
			{
				previouse_element.className = 'wet-line-start';
			}
			
			// now we press an character button:
			if(class_generator.mainClass(data.symbol_buffer[index].value).generate() == "character")
			{
				// but our word dont created
				// then we will create it
				if(concrete_entity.getElementsByClassName('parent').length == 0)
				{
					// geting activ character after what we planing to paste new one
					var active_char = concrete_entity.getElementsByClassName('active')[0];
					// create a word object 
					var word = document.createElement('span');
					// say to it that it will be have a children in it
					word.className = 'wet-word parent';
					// childs content
					var content = document.createTextNode(data.symbol_buffer[index].value);
					// childs container
					var character_holder = document.createElement('span');
					// generating of character class 
					character_holder.className = class_generator
																			.setPrefix('wet-')
																			.mainClass(data.symbol_buffer[index].value)
																			.space()
																			.subClass(data.symbol_buffer[index].value)
																			.generate() 
																			+ 'active'; 
					// adding new character in container
					character_holder.appendChild(content);
					// adding character object to the word 
					word.appendChild(character_holder);
					// so we must to delete cursor on first
					deletePrevioseCursor();
					// adding word to the line 
					data.line[index][data.current_line[index]].appendChild(word);
				}
				else
				{
					
					// geting activ character after what we planing to paste new one
					var active_char = concrete_entity.getElementsByClassName('active')[0];
					// deactive previose char
					previouse_element.className = class_generator
																				.setPrefix('wet-')
																				.mainClass(data.symbol_buffer[index].value)
																				.space()
																				.subClass(data.symbol_buffer[index].value)
																				.generate();
					// find ready for children word
					word = concrete_entity.getElementsByClassName('parent')[0];
					// childs content
					var content = document.createTextNode(data.symbol_buffer[index].value);
					// childs container
					var character_holder = document.createElement('span');
					// generating of character class 
					character_holder.className = class_generator
																			.setPrefix('wet-')
																			.mainClass(data.symbol_buffer[index].value)
																			.space()
																			.subClass(data.symbol_buffer[index].value)
																			.generate() 
																			+ 'active'; 
					// adding charecter to container
					character_holder.appendChild(content);
					
					// so we must to delete cursor on first
					deletePrevioseCursor();
					
					// if cursor lie on the end of word we simpli adding char in the ond of word
					if(active_char.nextSibling == null)
					{
						word.appendChild(character_holder);
					}
					// if cursore lie in the middle of word, we adding after active element 
					else if(active_char.nextSibling != null)
					{
						active_char.parentNode.insertBefore(character_holder,active_char.nextSibling);
					}
				}
			}
			
			// clearing buffer
			data.symbol_buffer[index].value = '';
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
		
	/**
		* @private
		* @function
		* @name deletePrevioseCursor
		* @desc it is need to delete previose cursor and it protect of making unnecessary multicursors
		* @mamberof Key_Observer
		* @inner
		*/
		function deletePrevioseCursor()
		{
			// element with class 'active' 
			var active_element = concrete_entity.getElementsByClassName("active")[0]; 
			
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
		* @mamberof Key_Observer
		* @inner
		*/
		function deletePrevioseParent()
		{
			// active word 
			var parent = concrete_entity.getElementsByClassName('parent')[0];
			
			// make a standart class for word 
			if(parent != undefined)
			{
				parent.className = "wet-word";
			}
		}
	}
	///////////////////////////////////
	/*          SINGELTON            */
	///////////////////////////////////

/**
	* @name Key_Scope
	* @version 1.0.0
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
	* @class
	* @classdesc it singelton which contain current key combinations
	* @namespace Key_Scope
	* @constructs Key_Scope
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
			* @desc adding key code to key map
			* @mamberof Key_Scope
			* @instance
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
			* @desc removing key code to key map
			* @mamberof Key_Scope
			* @instance
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
			* @desc catching code frome event and adding it to key map, on some action 
			* @mamberof Key_Scope
			* @instance
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
			* @desc catching code frome event and removing it to key map, on some action 
			* @mamberof Key_Scope
			* @instance
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
			* @desc return key map 
			* @mamberof Key_Scope
			* @instance
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
			* @desc return key map like a string
			* @mamberof Key_Scope
			* @instance
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
			* @desc refreshing key map
			* @mamberof Key_Scope
			* @instance
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
	///////////////////////////////////
	/*          CUSTOM CLASS         */
	///////////////////////////////////
/**
	* @name Divider
	* @version 1.0.0
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
	* @class
	* @classdesc this class is need to separating character by character or to concate them into one word
	* @namespace Divider
	* @constructs Divider
	* @example word.innerHTML = divider.concat(word);
	*/
var Divider = (function()
{
	function Divider()
	{
		
	/**
		* @function divide 
		* @desc separating word to a single characters in container
		* @param {Object} word - container that contain string with word that must be exploded
		* @return {String} - string with html code that containe separated characters
		* @mamberof Divider
		* @instance
		*/
		this.divide = function(word)
		{
			var content = word.innerHTML;
			
			var final_content = '';
			
			var array_of_chars = content.split('');
			
			var class_generator = new Char_Class_Generator('wet-');
			
			for(var i = 0; i < array_of_chars.length; i++)
			{
				final_content += '<span class="'
												+ class_generator
													.setPrefix('wet-')
													.mainClass(array_of_chars[i])
													.space()
													.subClass(array_of_chars[i])
													.generate()
												+ '">'
												+ array_of_chars[i]
												+ '</span>';
			}
			
			return final_content;
		}

	/**
		* @function concat
		* @desc joining all separate characters to a one string
		* @mamberof Divider
		* @instance
		* @param {Object} word - container that contain separated characters with word that must be exploded
		* @return {String} - string with word
		*/
		this.concat = function(word)
		{
			if(word != undefined)
			{
				var content = word.innerHTML;

				// thanks for Human Being http://stackoverflow.com/users/1835198/human-being 
				// http://stackoverflow.com/questions/13911681/remove-html-tags-from-a-javascript-string
				var rex = /(<([^>]+)>)/ig;

				content = content.replace(rex , "");

				return content;
			}
			else
			{
				return '';
			}
		}
	}
	
	return Divider;
})()

	///////////////////////////////////
	/*           MAIN SCRIPT         */
	///////////////////////////////////

	var first = new Editor('someeditor', {
		console:true
	});

	var second = new Editor('someeditor_another', {
		console:false
	});

	
/**
  * @function backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
  * @desc this module need to emulate "backspase" key features
	* @param {object} options.object - entity of editors object
	* @param {int} options.index - index of current editor element on document
	* @memberof Module
	* @instance
  */
	Module.getInstance().backspase = function(options){
		
		// standart block of initialization of dependencies		
		var class_generator = new Char_Class_Generator('wet-');
		
		var concrete_entity = options.object.container[options.index];
		
		var divider = new Divider();
		
		// getting active element that must be deleted
		var active_char = concrete_entity.getElementsByClassName('active')[0];

		// getting previose element thet will be active after key pressed
		var previous_char = concrete_entity.getElementsByClassName('active')[0].previousSibling;
		
		// anylizing what before active element
		// and if it has previouse elements:  
		if(previous_char != null)
		{
			// if previouse element is start of line:
			if(previous_char.className.split(' ')[0] == 'wet-line-start')
			{
				// getting original class name of the previous element
				var previous_char_original_class_name = concrete_entity
																								.getElementsByClassName('active')[0]
																								.previousSibling
																								.className
																								.trim();

				// deleting active element
				active_char.parentNode.removeChild(active_char);

				// making previous element to be an active 
				previous_char.className = previous_char_original_class_name + ' ' + 'active';	
			}
			// if it is a word:
			else if(previous_char.className.split(' ')[0] == 'wet-word')
			{
				// saing that this word now is parent
				previous_char.className = 'wet-word parent';
				
				word = concrete_entity.getElementsByClassName('parent')[0];
				// explode one word to a diferent characters 
				word.innerHTML = divider.divide(word);
				
				// take last character in this word
				var previouse_word_char = previous_char
																	.childNodes[previous_char.childNodes.length-1];
				
				// making previouse character as active one
				previouse_word_char.className = class_generator
																				.setPrefix('wet-')
																				.mainClass(previouse_word_char.innerHTML)
																				.space()
																				.subClass(previouse_word_char.innerHTML)
																				.generate()
																				+ ' active';
				// deleting active element
				active_char.parentNode.removeChild(active_char);
			}
			else
			{
				// getting original class name of the previous element
				var previous_char_original_class_name = concrete_entity
																								.getElementsByClassName('active')[0]
																								.previousSibling
																								.className
																								.trim();

				// deleting active element
				active_char.parentNode.removeChild(active_char);

				// making previous element to be an active 
				previous_char.className = previous_char_original_class_name + ' ' + 'active';	
			}
		}
		// deleting word when it not on start of line
		else if((concrete_entity.getElementsByClassName('parent')[0] != undefined)
					&&(concrete_entity.getElementsByClassName('parent')[0].previousSibling.className != 'wet-line-start'))
		{
			var word = concrete_entity.getElementsByClassName('parent')[0]; 
			var before_word = word.previousSibling;
			before_word.className = class_generator
															.setPrefix('wet-')
															.mainClass(before_word.innerHTML)
															.space()
															.subClass(before_word.innerHTML)
															.generate()
															+ ' active';
			word.parentNode.removeChild(word);
			
		}		
		// deleting word when it is on start of line
		else if((concrete_entity.getElementsByClassName('parent')[0] != undefined)
					&&(concrete_entity.getElementsByClassName('parent')[0].previousSibling.className == 'wet-line-start'))
		{
			var word = concrete_entity.getElementsByClassName('parent')[0]; 
			var before_word = word.previousSibling;
			before_word.className = 'wet-line-start active';
			word.parentNode.removeChild(word);
		}
		else
		{
      // deleting a line and going to the previous
			if(active_char.className.split(" ")[0] == 'wet-line-start')
			{
				var parent_s = active_char.parentNode;
        var previous_line = parent_s.previousSibling;
                
        if(previous_line != null)
        {
					parent_s.parentNode.removeChild(parent_s);
					// !!!!!!!!!! change this.current_line 
					// deleting 'enter' pseudo sign
					options.object.current_line[options.index] = options.object.current_line[options.index] - 1;
					
					// last word on previouse line
					word = previous_line.childNodes[previous_line.childNodes.length-1];
					
					// if last element in previouse line not a word
					if(word.className.split(" ")[0] != 'wet-signifier')
					{
						// exploded content
						word.innerHTML = divider.divide(word);
					}
					
					// make active last char of word 
					previous_line.childNodes[previous_line.childNodes.length-1].className = previous_line
																																									.childNodes[previous_line.childNodes.length-1]
																																									.className + ' ' + 'active';            
					// getting active element that must be deleted
          var active_char = concrete_entity.getElementsByClassName('active')[0];
          // getting previose element thet will be active after key pressed
          var previous_char = concrete_entity.getElementsByClassName('active')[0].previousSibling;
					// if we have previouse element:
          if(previous_char != null)
          {
						// if previouse element is word:
						if(active_char.className.split(' ')[0] == 'wet-word')
						{
							// marking it as parent
							active_char.className = 'wet-word parent';
							// generating class for the last child in it
							active_char.childNodes[active_char.childNodes.length-1].className = class_generator
																																											.setPrefix('wet-')
																																											.mainClass(active_char.childNodes[active_char.childNodes.length-1].innerHTML)
																																											.space()
																																											.subClass(active_char.childNodes[active_char.childNodes.length-1].innerHTML)
																																											.generate()
																																											+ ' active';
							
						}
          }
        }        
			}
		}
	}

	var module = new Module.getInstance();
	module.addFunction('8', 'backspase');
	
/**
  * @function left_arrow
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
  * @desc this module need to emulate "left arrow" key features
	* @param {object} options.object - entity of editors object
	* @param {int} options.index - index of current editor element on document
	* @memberof Module
	* @instance
  */
	Module.getInstance().left_arrow = function(options){
		
		// standart block of initialization of dependencies		
		var class_generator = new Char_Class_Generator('wet-');
		
		var concrete_entity = options.object.container[options.index];
		
		var divider = new Divider();
		
		// getting active element that must be deactivated
		var active_char = concrete_entity.getElementsByClassName('active')[0];

		// getting previose element thet will be active after key pressed
		var previous_char = concrete_entity.getElementsByClassName('active')[0].previousSibling;
		
		// anylizing what before active element
		// and if it has previouse elements:  
		if(previous_char != null)
		{
			// if previouse element is start of line:
			if(previous_char.className.split(' ')[0] == 'wet-line-start')
			{

				// deactivating active element
				active_char.className = class_generator
																.setPrefix('wet-')
																.mainClass(active_char.innerHTML)
																.space()
																.subClass(active_char.innerHTML)
																.generate();

				// making previous element to be an active 
				previous_char.className = class_generator
																.setPrefix('wet-')
																.mainClass(active_char.innerHTML)
																.space()
																.subClass(active_char.innerHTML)
																.generate()
																+ " active";
			}
			// if it is a word:
			else if(previous_char.className.split(' ')[0] == 'wet-word')
			{
				// saing that this word now is parent
				previous_char.className = 'wet-word parent';
				
				word = concrete_entity.getElementsByClassName('parent')[0];
				
				// explode one word to a diferent characters 
				word.innerHTML = divider.divide(word);
				
				// take last character in this word
				var previouse_word_char = previous_char
																	.childNodes[previous_char.childNodes.length-1];
				
				// making previouse character as active one
				previouse_word_char.className = class_generator
																				.setPrefix('wet-')
																				.mainClass(previouse_word_char.innerHTML)
																				.space()
																				.subClass(previouse_word_char.innerHTML)
																				.generate()
																				+ ' active';
				// deactivate active element
				active_char.className = class_generator
												.setPrefix('wet-')
												.mainClass(active_char.innerHTML)
												.space()
												.subClass(active_char.innerHTML)
												.generate();
			}
			else
			{
				// getting original class name of the previous element
				var previous_char_original_class_name = concrete_entity
																								.getElementsByClassName('active')[0]
																								.previousSibling
																								.className
																								.trim();

				// deactivate active element
				active_char.className = class_generator
												.setPrefix('wet-')
												.mainClass(active_char.innerHTML)
												.space()
												.subClass(active_char.innerHTML)
												.generate();

				// making previous element to be an active 
				previous_char.className = previous_char_original_class_name + ' ' + 'active';	
			}
		}
		// deactivate word when it not on start of line
		else if((concrete_entity.getElementsByClassName('parent')[0] != undefined)
					&&(concrete_entity.getElementsByClassName('parent')[0].previousSibling.className != 'wet-line-start'))
		{
			var word = concrete_entity.getElementsByClassName('parent')[0]; 
			var before_word = word.previousSibling;
			before_word.className = class_generator
															.setPrefix('wet-')
															.mainClass(before_word.innerHTML)
															.space()
															.subClass(before_word.innerHTML)
															.generate()
															+ ' active';
			active_char.className = class_generator
															.setPrefix('wet-')
															.mainClass(active_char.innerHTML)
															.space()
															.subClass(active_char.innerHTML)
															.generate();
			word.innerHTML = divider.concat(word);	
			word.className = 'wet-word';			
		}		
		// deactivate word when it is on start of line
		else if((concrete_entity.getElementsByClassName('parent')[0] != undefined)
					&&(concrete_entity.getElementsByClassName('parent')[0].previousSibling.className == 'wet-line-start'))
		{
			var word = concrete_entity.getElementsByClassName('parent')[0]; 
			var before_word = word.previousSibling;
			before_word.className = 'wet-line-start active';
			active_char.className = class_generator
															.setPrefix('wet-')
															.mainClass(active_char.innerHTML)
															.space()
															.subClass(active_char.innerHTML)
															.generate();
			word.innerHTML = divider.concat(word);
			word.className = 'wet-word';
		}
		else
		{
      // deactivate a line and going to the previous line
			if(active_char.className.split(" ")[0] == 'wet-line-start')
			{
				var parent_s = active_char.parentNode;
        var previous_line = parent_s.previousSibling;
                
        if(previous_line != null)
        {
					parent_s.parentNode.removeChild(parent_s);
					// !!!!!!!!!! change this.current_line 
					// deactivate 'enter' pseudo sign
					options.object.current_line[options.index] = options.object.current_line[options.index] - 1;

					word = previous_line.childNodes[previous_line.childNodes.length-1];
					
					// if last element in previouse line not a word
					if(word.className.split(" ")[0] != 'wet-signifier')
					{
						// explode content
						word.innerHTML = divider.divide(word);
					}
					
					// make active last char of word 
					previous_line.childNodes[previous_line.childNodes.length-1].className = previous_line
																																									.childNodes[previous_line.childNodes.length-1]
																																									.className + ' ' + 'active';            
					// getting active element that must be deactivated
          var active_char = concrete_entity.getElementsByClassName('active')[0];
          // getting previose element thet will be active after key pressed
          var previous_char = concrete_entity.getElementsByClassName('active')[0].previousSibling;
					// if we are not at start of previouse line:
          if(previous_char != null)
          {
						// if the last entity of line is word 
						if(active_char.className.split(' ')[0] == 'wet-word')
						{
							active_char.className = 'wet-word parent';
							active_char.childNodes[active_char.childNodes.length-1].className = class_generator
																																											.setPrefix('wet-')
																																											.mainClass(active_char.childNodes[active_char.childNodes.length-1].innerHTML)
																																											.space()
																																											.subClass(active_char.childNodes[active_char.childNodes.length-1].innerHTML)
																																											.generate()
																																											+ ' active';
							
						}
          }
        }
			}
		}
	}

	var module = new Module.getInstance();
	module.addFunction('37', 'left_arrow');
	
/**
  * @function backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
  * @desc this module need to emulate "space" key features
	* @param {object} options.object - entity of editors object
	* @param {int} options.index - index of current editor element on document
	* @memberof Module
	* @instance
  */
	Module.getInstance().space = function(options)
	{
		// standart block of initialization of dependencies		
		var class_generator = new Char_Class_Generator('wet-');
		
		var concrete_entity = options.object.container[options.index];
		
		var divider = new Divider();
		
		// prepare previose element for next work
		var word = concrete_entity.getElementsByClassName('parent')[0];
				
		this.deletePrevioseCursor(concrete_entity);
		
		// if we are in parent word:
		// MUST BE FIXED BECAUSE IT PUSHING OUT SPACE
		if(word != undefined)
		{
			word.innerHTML = divider.concat(word);
		}

		this.deletePrevioseParent(concrete_entity);
				
		// creating a space object
		var space = document.createElement('span');
		// generating a special class for it
		space.className = class_generator
												.setPrefix('wet-')
												.mainClass(" ")
												.space()
												.subClass(" ")
												.generate() 
												+ ' active'; 
		// adding space contant
		space.innerHTML = " ";
		// adding space objecto to an active line
		options.object.line[options.index][options.object.current_line[options.index]].appendChild(space);
	}
	

	var module = new Module.getInstance();
	module.addFunction('32', 'space');
	
/**
  * @function enter
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
  * @desc this module need to emulate "enter" key features
	* @param {object} options.object - entity of editors object
	* @param {int} options.index - index of current editor element on document
	* @memberof Module
	* @instance
  */
	Module.getInstance().enter = function(options)
	{
		// standart block of initialization of dependencies		
		var class_generator = new Char_Class_Generator('wet-');
		
		var concrete_entity = options.object.container[options.index];
		
		var divider = new Divider();
		
		// prepare previose element for next work
		this.deletePrevioseCursor(concrete_entity);
			
		var word = concrete_entity.getElementsByClassName('parent')[0];
		
		// if we are in parent word:
		// MUST BE FIXED BECAUSE IT PUSHING OUT ENTER SIGN
		if(word)
		{
			word.innerHTML = divider.concat(word);				
		}
			
		this.deletePrevioseParent(concrete_entity);
			
		// index of created line
		options.object.current_line[options.index]++;
		console.log(options.object);
		// adding new line
		var line = options.object.line[options.index][options.object.current_line[options.index]];
		options.object.line[options.index][options.object.current_line[options.index]] = document.createElement('div');
		options.object.line[options.index][options.object.current_line[options.index]].className = 'line';
		options.object.line[options.index][options.object.current_line[options.index]].setAttribute('line_number', options.object.current_line[options.index]);
		options.object.work_space[options.index].appendChild(options.object.line[options.index][options.object.current_line[options.index]]);
	}
	

	var module = new Module.getInstance();
	module.addFunction('13', 'enter');