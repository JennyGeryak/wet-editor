	///////////////////////////////////
	/**         CUSTOM CLASS        **/
	///////////////////////////////////
/**
	* @name Divider
	* @version 1.0.0
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
	* @class
	* @classdesc this class is need to separating character by character or to concate them into one word
	* @example word.innerHTML = divider.concat(word);
	*/
var Divider = (function()
{
	function Divider()
	{
		
	/**
		* @public
		* @function
		* @name divide
		* @description separating word to a single characters in container
		* @param {Object} word - container that contain string with word that must be exploded
		* @return {String} - string with html code that containe separated characters
		*/
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

	/**
		* @public
		* @function
		* @name concat
		* @description joining all separate characters to a one string
		* @param {Object} word - container that contain separated characters with word that must be exploded
		* @return {String} - string with word
		*/
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