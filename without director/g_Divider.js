	///////////////////////////////////
	/*          CUSTOM CLASS         */
	///////////////////////////////////
/**
	* @name Divider
	* @version 1.0.0
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
	* @class
	* @classdesc this class is need to separating character by character or to concate them into one word
	* @namespace Divider
	* @constructs Divider
	* @example word.innerHTML = divider.concat(word);
	*/
var Divider = (function()
{
	function Divider()
	{
		
	/**
		* @function divide 
		* @desc separating word to a single characters in container
		* @param {Object} word - container that contain string with word that must be exploded
		* @return {String} - string with html code that containe separated characters
		* @mamberof Divider
		* @instance
		*/
		this.divide = function(word)
		{
			var content = word.innerHTML;
			
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
		* @function concat
		* @desc joining all separate characters to a one string
		* @mamberof Divider
		* @instance
		* @param {Object} word - container that contain separated characters with word that must be exploded
		* @return {String} - string with word
		*/
		this.concat = function(word)
		{
			if(word != undefined)
			{
				var content = word.innerHTML;

				// thanks for Human Being http://stackoverflow.com/users/1835198/human-being 
				// http://stackoverflow.com/questions/13911681/remove-html-tags-from-a-javascript-string
				var rex = /(<([^>]+)>)/ig;

				content = content.replace(rex , "");

				return content;
			}
			else
			{
				return '';
			}
		}
		
	/**
		* @function bisect
		* @desc divide a massive of characters in the word to two parts
		* @mamberof Divider
		* @instance
		* @param {Object} word - container that contain separated characters with word that must be exploded
		* @return {Array} - string with word
		*/
		this.bisect = function(word)
		{
			var result = new Array();
			result[0] = '';
			result[1] = '';
			var j = 0;
			if(word != undefined)
			{
				for(var i=0; i<=(word.childNodes.length-1); i++)
				{
					var some = word.childNodes[i].className.split(' ').indexOf('active');
					result[j] += word.childNodes[i].outerHTML;
					if(some >= 0)
					{
						j=1;
					}
				}
				return result;				
			}
			else
			{
				return result;
			}
		}
	}
	
	return Divider;
})()