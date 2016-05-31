	
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
    
    var director = new Director(concrete_entity);
		
		// getting active element that must be deleted
		var active_char = director.getCursorEntity('active');

		// getting previose element thet will be active after key pressed
		var previous_entity = director.getBeforeEntity(active_char);
		
		// anylizing what before active element
		// and if it has previouse elements:  
		if(previous_entity)
		{
			// if previouse element is start of line:
			if(director.isCursorFirstOnALine('active'))
			{
				// getting original class name of the previous element
				var previous_char_original_class_name = concrete_entity
																								.getElementsByClassName('active')[0]
																								.previousSibling
																								.className
																								.trim();

				// deleting active element 
				director.delete(active_char);

				// making previous element to be an active 
				previous_entity.className = 'wet-line-start' + ' ' + 'active';	
			}
			// if before element is a word:
			else if(director.isCursorBeforeWord(active_char))
			{
				// saing that this word now is parent
				director.makeItParentWord(previous_entity);
				
				word = director.getParentWord();
				// explode one word to a diferent characters 
				word.innerHTML = divider.divide(word);
				
				// take last character in this word
				var previouse_word_char = director.getLastElementInWord(word);
				
				// making previouse character as active one
        director.activate(previouse_word_char);
        
				// deleting active element
				director.delete(active_char);
			}
      // if it simply deliting an elements in the word
			else
			{
				// deleting active element
				director.delete(active_char);

				// making previous element to be an active 
        director.activate(previous_entity);
			}
		}
		// deleting word when it not on start of line
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!
		else if((director.getParentWord() != false)
					&&(director.getParentWord().previousSibling.className != 'wet-line-start'))
		{
			var word = director.getParentWord(); 
      
			var before_word = director.getBeforeEntity(word);
      
      director.activate(before_word);
      
			director.delete(word);
			
		}		
		// deleting word when it is on start of line
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
		else if((director.getParentWord() != false)
					&&(director.getParentWord().previousSibling.className == 'wet-line-start'))
		{
			var word = director.getParentWord(); 
      
			var before_word = director.getBeforeEntity(word);
      
			before_word.className = 'wet-line-start active';
      
			director.delete(word);
		}
		else
		{
      // deleting a line and going to the previous
			if(director.isStart(active_char))
			{
				var parent_s = active_char.parentNode;
        var previous_line = director.getBeforeEntity(parent_s);
                
        if(previous_line != false)
        {
					director.delete(parent_s);
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
          var active_char = director.getCursorEntity('active');
          // getting previose element thet will be active after key pressed
          var previous_char = director.getBeforeEntity(active_char);
					// if we have previouse element:
          if(previous_char != false)
          {
						// if active element is word:
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