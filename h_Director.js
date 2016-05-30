	///////////////////////////////////
	/*          CUSTOM CLASS         */
	///////////////////////////////////
/**
	* @name Director
	* @version 1.0.0
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
	* @class
	* @classdesc class that help to make some ro
	* @namespace Director
	* @constructs Director
	* @example 
	*/
var Director = (function()
{
	function Director()
	{
		
	/**
		* @function deletePreviouseCursor 
		* @desc separating word to a single characters in container
		* @param {Array} cursors - container that contain string with word that must be exploded
		* @mamberof Director
		* @instance
		*/
		this.deletePreviouseCursor = function(cursors)
		{
      // element with class 'active'
      var active_element = concrete_entity.getElementsByClassName("active")[0];
      
      // if element is exist than change his class to native without 'active' mark
      if(active_element != undefined)
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
  
  return Director;
})()