	
/**
  * @name backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
  * @desc this module need to emulate "backspase" key features
  */
	Module.getInstance().backspase = function(options){
		
		var class_generator = new Char_Class_Generator('wet-');
		
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
			else if(previous_char.className.split(' ')[0] == 'wet-word')
			{
				previous_char.className = 'wet-word parent';
				var previouse_word_char = previous_char.childNodes[previous_char.childNodes.length-1];
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
				var previous_char_original_class_name = document.getElementsByClassName('active')[0].previousSibling.className.trim();

				// deleting active element
				active_char.parentNode.removeChild(active_char);

				// making previous element to be an active 
				previous_char.className = previous_char_original_class_name + ' ' + 'active';	
			}
		}
		else if((document.getElementsByClassName('parent')[0] != undefined)
					&&(document.getElementsByClassName('parent')[0].previousSibling.className)!= 'wet-line-start')
		{
			var word = document.getElementsByClassName('parent')[0]; 
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
		else if((document.getElementsByClassName('parent')[0] != undefined)
					&&(document.getElementsByClassName('parent')[0].previousSibling.className)== 'wet-line-start')
		{
			console.log('sds');
		}
		else
		{
      // deleting a line and going to the previous
			if(active_char.className.split(" ")[0] == 'wet-line-start')
			{
				var parent_s = active_char.parentNode;
        var previous_line = parent_s.previousSibling;
                
				console.log(previous_line);
        if(previous_line != null)
        {
            parent_s.parentNode.removeChild(parent_s);
            // !!!!!!!!!! change this.current_line 
            // deleting enter pseudo sign
            options.object.current_line[options.index] = options.object.current_line[options.index] - 1;
            console.log(previous_line.childNodes[previous_line.childNodes.length-1]);
            previous_line.childNodes[previous_line.childNodes.length-1].className = previous_line.childNodes[previous_line.childNodes.length-1].className + ' ' + 'active';
            
            // getting active element that must be deleted
            var active_char = document.getElementsByClassName('active')[0];
            // getting previose element thet will be active after key pressed
            var previous_char = document.getElementsByClassName('active')[0].previousSibling;
            if(previous_char != null)
            {
                if(previous_char.className.split(' ')[0] == 'wet-line-start')
                {
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
        }        
			}
		}
	}

	var module = new Module.getInstance();
	module.addFunction('8', 'backspase');