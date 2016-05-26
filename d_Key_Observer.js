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
					if(document.getElementsByClassName("active")[0] != undefined)
					{
						document.getElementsByClassName('active')[0].className = class_generator
																																.setPrefix('wet-')
																																.mainClass(document.getElementsByClassName('active')[0].innerHTML)
																																.space()
																																.subClass(document.getElementsByClassName('active')[0].innerHTML)
																																.generate();
					}
		}
		
		function deletePrevioseParent(){
			if(document.getElementsByClassName('parent')[0] != undefined)
			{
				document.getElementsByClassName('parent')[0].className = "wet-word";
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
			var previouse_element = document.getElementsByClassName('active')[0];
			var previouse_element_class = previouse_element ? previouse_element.className.split(" ")[0] : ''; 
			if((previouse_element_class == 'wet-line-start'))
			{
				previouse_element.className = 'wet-line-start';
			}
			if(class_generator.mainClass(data.symbol_buffer[index].value).generate() == "character")
			{
				if(document.getElementsByClassName('parent').length == 0)
				{
					
					deletePrevioseCursor();
					
					var word = document.createElement('span');
					word.className = 'wet-word parent';
					var content = document.createTextNode(data.symbol_buffer[index].value);
					var character_holder = document.createElement('span');
					character_holder.className = class_generator
																			.setPrefix('wet-')
																			.mainClass(data.symbol_buffer[index].value)
																			.space()
																			.subClass(data.symbol_buffer[index].value)
																			.generate() 
																			+ 'active'; 
					character_holder.appendChild(content);
					word.appendChild(character_holder); 
					data.line[index][data.current_line[index]].appendChild(word);
				}
				else
				{
					previouse_element.className = class_generator
																				.setPrefix('wet-')
																				.mainClass(data.symbol_buffer[index].value)
																				.space()
																				.subClass(data.symbol_buffer[index].value)
																				.generate();
					word = document.getElementsByClassName('parent')[0];
					var content = document.createTextNode(data.symbol_buffer[index].value);
					var character_holder = document.createElement('span');
					character_holder.className = class_generator
																			.setPrefix('wet-')
																			.mainClass(data.symbol_buffer[index].value)
																			.space()
																			.subClass(data.symbol_buffer[index].value)
																			.generate() 
																			+ 'active'; 
					character_holder.appendChild(content);
					word.appendChild(character_holder); 
				}
			}
			else if(scope.getKeyMap().indexOf(32) >= 0)
			{
				deletePrevioseCursor();
				
				deletePrevioseParent();
				
				var space = document.createElement('span');
				space.className = class_generator
														.setPrefix('wet-')
														.subClass(" ")
														.generate() 
														+ ' active'; 
				space.innerHTML = " ";
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
	}