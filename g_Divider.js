var Divider = (function()
{
	function Divider()
	{
		this.divide = function(word)
		{
			content = word.innerHTML;
			
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
		
		this.concat = function(word)
		{
			content = word.innerHTML;
			
			// thanks for Human Being http://stackoverflow.com/users/1835198/human-being 
			// http://stackoverflow.com/questions/13911681/remove-html-tags-from-a-javascript-string
			var rex = /(<([^>]+)>)/ig;
			
    	content = content.replace(rex , "");
			
			return content;
		}
	}
	
	return Divider;
})()