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
	function Director(concrete_entity)
	{
		this.concrete_entity = concrete_entity;
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
      var active_element = concrete_entity.getElementsByClassName("active")[0] || false;
      
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
    
	/**
		* @function isThereAnyActiveWords 
		* @desc inspect editor for an active words
		* @param {String} word_active_marker - marker of word that is active
    * @return {bool} - if we have some active word 
		* @mamberof Director
		* @instance
		*/
    this.isThereAnyActiveWords = function(word_active_marker)
    {
      var word = this.concrete_entity.getElementsByClassName(word_active_marker)[0] || false;
      
      if(word)
      {
        return word;
      }
      else
      {
        return false;
      }
    }

  /**
		* @function getCursorEntity 
		* @desc searching for an cursor element
		* @param {Array} cursor_marker - marker of active element
    * @return {object} - entity of active element
		* @mamberof Director
		* @instance
		*/
    this.getCursorEntity = function(cursor_marker)
    {
      var active_char = this
                        .concrete_entity
                        .getElementsByClassName(cursor_marker)[0] || false;
      if(active_char)
      {
        return active_char;
      }
      else
      {
        return false;
      }
    }
  
  /**
		* @function getBeforeCursorEntity
		* @desc searching for an previouse cursor element
		* @param {Array} cursor_marker - marker of active element
    * @return {object} - entity of previouse for active element
		* @mamberof Director
		* @instance
		*/
    this.getBeforeCursorEntity = function(cursor_entity)
    {      
      var previouse_char = cursor_entity.previousSibling || false;
      
      if(previouse_char)
      {
        return previouse_char;
      }
      else
      {
        return false;
      }
    }
    
  /**
		* @function isCursorFirstOnALine 
		* @desc searching for an previouse cursor element
		* @param {Array} cursor_marker - marker of active element
    * @return {bool} - entity of previouse for active element
		* @mamberof Director
		* @instance
		*/
    this.isCursorFirstOnALine = function(cursor_marker)
    { 
      var active_char = this.getCursorEntity(cursor_marker);
      
      var previouse_char = active_char.previousSibling || false;
      
      if(previouse_char.className.split(" ").indexOf("wet-line-start") >= 0)
      {
        return true;
      }
      else
      {
        return false;
      }

    } 
    
  /**
		* @function isCursorBeforeWord 
		* @desc searching for an previouse cursor element
		* @param {object} cursor_marker - marker of active element
    * @return {bool} - entity of previouse for active element
		* @mamberof Director
		* @instance
		*/
    this.isCursorBeforeWord = function(cursor_entity)
    { 
      
      var previouse_char = cursor_entity.previousSibling || false;
      
      if(previouse_char.className.split(" ").indexOf("wet-word") >= 0)
      {
        return true;
      }
      else
      {
        return false;
      }

    }
    
  /**
		* @function isCursorBeforeWord 
		* @desc searching for an previouse cursor element
		* @param {object} cursor_marker - marker of active element
    * @return {bool} - entity of previouse for active element
		* @mamberof Director
		* @instance
		*/
    this.makeItParentWord = function(before_entity)
    { 
      if(before_entity)
      {
        before_entity.className = 'wet-word parent';
      }
      else
      {
        
      }
    }
    
    
  }  
  return Director;
})()