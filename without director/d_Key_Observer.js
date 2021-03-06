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

			// adding starting tag for a line 
			data.line[index][data.current_line[index]].innerHTML = data.line[index][data.current_line[index]].innerHTML 
																														+ first_symbol.outerHTML;
		}

		// if pressed key is not null 
		if(data.symbol_buffer[index].value != '')
		{
			// detecting previouse element with 'active' class name
			var previouse_element = concrete_entity.getElementsByClassName('active')[0];
			var previouse_element_class = previouse_element ? previouse_element.className.split(" ")[0] : ''; 
      
      var next_element = concrete_entity.getElementsByClassName('active')[0].nextSibling;
			
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
				// then we will create it:
				if(concrete_entity.getElementsByClassName('parent').length == 0)
				{
          if(next_element == null)
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
          // if we before a word
          else if((next_element != null)&&(next_element.className.split(" ").indexOf('wet-word') >= 0))
          {
            var word_before_active = concrete_entity.getElementsByClassName('active')[0].nextSibling;
            var content_of_word = divider.divide(word_before_active);
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
            word_before_active.innerHTML = character_holder.outerHTML + content_of_word;
            word_before_active.className = "wet-word parent";
            deletePrevioseCursor();
          }
				}
        // if we in the word
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
            // cool string for adding something after active elements 
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
        if(active_element.className.split(" ").indexOf('wet-line-start') >= 0)
        {
          active_element.className = 'wet-line-start';
        }
        else
        {
          active_element.className = class_generator
                                    .setPrefix('wet-')
                                    .mainClass(active_element.innerHTML)
                                    .space()
                                    .subClass(active_element.innerHTML)
                                    .generate();
          
        }
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
  
  /////////////////////////////////
  //       SNIPETS LIBRARY       //
  /////////////////////////////////
  
  // 1. cool string for adding something after active elements 
  // active_char.parentNode.insertBefore(character_holder,active_char.nextSibling);