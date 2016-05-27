  ///////////////////////////////////
	/**         OBSERVERS           **/
	///////////////////////////////////
/**
	* @name Key_Observer
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
	* @class
	* @classdesc it is reaction of observer on key event
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
			var previouse_element = document.getElementsByClassName('active')[0];
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
				if(document.getElementsByClassName('parent').length == 0)
				{
					
					// so we must to delete cursor on first
					deletePrevioseCursor();
					
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
					// adding word to the line 
					data.line[index][data.current_line[index]].appendChild(word);
				}
				else
				{
					// deactive previose char
					previouse_element.className = class_generator
																				.setPrefix('wet-')
																				.mainClass(data.symbol_buffer[index].value)
																				.space()
																				.subClass(data.symbol_buffer[index].value)
																				.generate();
					// find ready for children word
					word = document.getElementsByClassName('parent')[0];
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
					// adding char object to the word
					word.appendChild(character_holder); 
				}
			}
			// if you typing a space button:
			else if(scope.getKeyMap().indexOf(32) >= 0)
			{
				// prepare previose element for next work
				divider.concat();
				
				deletePrevioseCursor();

				deletePrevioseParent();
				
				// creating a space object
				var space = document.createElement('span');
				// generating a special class for it
				space.className = class_generator
														.setPrefix('wet-')
														.subClass(" ")
														.generate() 
														+ ' active'; 
				// adding space contant
				space.innerHTML = " ";
				// adding space objecto to an active line
				data.line[index][data.current_line[index]].appendChild(space);
			}
				// clearing buffer
				data.symbol_buffer[index].value = '';
		}
		
		// enter emulation, using adding new line
		if(scope.getKeyMap() == 13 ) //  enter
		{
			// deleting previose cursor
			deletePrevioseCursor();
			
			deletePrevioseParent();
			
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
		
	/**
		* @private
		* @function
		* @name deletePrevioseCursor
		* @description it is need to delete previose cursor and it protect of making unnecessary multicursors
		*/
		function deletePrevioseCursor()
		{
			// element with class 'active' 
			var active_element = document.getElementsByClassName("active")[0]; 
			
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
		* @description it is need to delete 'perent' class from object it gives oportunity to know in which exact container
		* is word lie
		*/
		function deletePrevioseParent()
		{
			// active word 
			var parent = document.getElementsByClassName('parent')[0];
			
			// make a standart class for word 
			if(parent != undefined)
			{
				parent.className = "wet-word";
			}
		}
	}