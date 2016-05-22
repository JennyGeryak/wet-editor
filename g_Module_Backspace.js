	
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