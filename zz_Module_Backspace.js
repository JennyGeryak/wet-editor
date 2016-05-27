	
/**
  * @name backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
  * @desc this module need to emulate "backspase" key features
  */
	Module.getInstance().backspase = function(options){
		
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
          if(previous_char != null)
          {
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
	module.addFunction('8', 'backspase');