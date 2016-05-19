	Module.getInstance().backspase = function(options){
		var active_char = document.getElementsByClassName('active')[0];
		var previous_char = document.getElementsByClassName('active')[0].previousSibling
		if(previous_char != null)
		{
			if(previous_char.className.split(' ')[0] == 'wet-line-start'){
				var previous_char_original_class_name = document.getElementsByClassName('active')[0].previousSibling.className.trim();
				active_char.parentNode.removeChild(active_char);
				previous_char.className = previous_char_original_class_name + ' ' + 'active';	
			}
			else
			{
				var previous_char_original_class_name = document.getElementsByClassName('active')[0].previousSibling.className.trim();
				active_char.parentNode.removeChild(active_char);
				previous_char.className = previous_char_original_class_name + ' ' + 'active';	
			}
		}
		else
		{

		}
		

	}

	var module = new Module.getInstance();
	module.addFunction('8', 'backspase');