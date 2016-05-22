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