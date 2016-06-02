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
	function Director(concrete_entity, prefix, active)
	{
		this.concrete_entity = concrete_entity;
    
    this.prefix = prefix;
    
    this.active = active;
    
    this.class_generator = new Char_Class_Generator(this.prefix);
    
//////////////////////
// Comparative section 
//////////////////////
    
  /**
    * @function isThereAnyActiveWords 
    * @desc inspect editor for an active words
    * @param {String} word_active_marker - marker of word that is active
    * @return {bool} - if we have some active word 
    * @mamberof Director
    * @instance
    */
    this.isThereAnyActiveWords = function()
    {
      var word = this.concrete_entity.getElementsByClassName('parent')[0] || false;
      
      if(word)
      {
        return true;
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
      if(previouse_char)
      {
        if(previouse_char.className.split(" ").indexOf(this.prefix+ "line-start") >= 0)
        {
          return true;
        }
        else
        {
          return false;
        }
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
      
      var previouse_char = cursor_entity.previousSibling;
      
      var index = previouse_char.className.split(" ").indexOf(this.prefix + "word");
      
      if(index >= 0)
      {
        return true;
      }
      else
      {
        return false;
      }

    }
    
    
  /**
    * @function isStart 
    * @desc chacking element is it start one
    * @param {object} element - html for checking
    * @return {bool} - is it start element or not
    * @mamberof Director
    * @instance
    */
    this.isStart = function(element)
    { 
      if(element)
      {
        if(element.className.split(" ")[0] == this.prefix + 'line-start')
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }

  /**
    * @function isSignifier 
    * @desc chacking element is it start one
    * @param {object} element - html for checking
    * @return {bool} - is it start element or not
    * @mamberof Director
    * @instance
    */
    this.isSignifier = function(element)
    { 
      if(element)
      {
        if(element.className.split(" ").indexOf(this.prefix + 'signifier') >= 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }

  /**
    * @function isWord
    * @desc chacking element is it start one
    * @param {object} element - html for checking
    * @return {bool} - is it start element or not
    * @mamberof Director
    * @instance
    */
    this.isWord = function(element)
    { 
      if(element)
      {
        if(element.className.split(" ").indexOf(this.prefix + 'word') >= 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }

  /**
    * @function isParentWord
    * @desc chacking element is it start one
    * @param {object} element - html for checking
    * @return {bool} - is it start element or not
    * @mamberof Director
    * @instance
    */
    this.isParentWord = function(element)
    { 
      if(element)
      {
        if(element.className.split(" ").indexOf('parent') >= 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }

  /**
    * @function isCharacter
    * @desc chacking element is it start one
    * @param {object} element - html for checking
    * @return {bool} - is it start element or not
    * @mamberof Director
    * @instance
    */
    this.isCharacter = function(element)
    { 
      var equivalent = this.prefix + 'character';
      
      if(element)
      {
        if(element.className.split(" ").indexOf(equivalent) >= 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }
    
//////////////////////
// Comparative section 
//////////////////////
    
//////////////////
// Getting section 
//////////////////
    
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
        console.log('getCursorEntity - has error');
        return false;
      }
    }

  /**
    * @function getBeforeEntity
    * @desc searching for an previouse cursor element
    * @param {Array} cursor_marker - marker of active element
    * @return {object} - entity of previouse for active element
    * @mamberof Director
    * @instance
    */
    this.getBeforeEntity = function(entity)
    {      
      var previouse = entity.previousSibling || false;
      
      if(previouse)
      {
        return previouse;
      }
      else
      {
        return false;
      }
    }
    
  /**
    * @function getParentWord 
    * @desc searching for an parent word
    * @return {object} - entity of parent word
    * @mamberof Director
    * @instance
    */
    this.getParentWord = function()
    { 
      var parent = this
                  .concrete_entity
                  .getElementsByClassName('parent')[0] 
                  || false;
      if(parent)
      {
        return parent;
      }
      else
      {
        return false;
      }
    }
    
  /**
    * @function getLastElement 
    * @desc searching for an last element of word
    * @return {object} - entity of last element of word
    * @mamberof Director
    * @instance
    */
    this.getLastElement = function(word)
    { 
      var element = word.childNodes[word.childNodes.length-1] || false;
      
      if(element)
      {
        return element;
      }
      else
      {
        return false;
      }
    }
  
//////////////////
// Getting section 
//////////////////

//////////////////
// Make section 
//////////////////
    
  /**
    * @function makeItParentWord 
    * @desc making a word an a parent word
    * @param {object} element - element what must became a parent word
    * @return {bool} - entity of previouse for active element
    * @mamberof Director
    * @instance
    */
    this.makeItParentWord = function(before_entity)
    { 
      if(before_entity)
      {
        before_entity.className = this.prefix + 'word parent';
      }
    }
    
  /**
    * @function makeItWord 
    * @desc give the class name of word
    * @param {object} element - element what must became a word
    * @mamberof Director
    * @instance
    */
    this.makeItWord = function(element)
    { 
      if(element)
      {
        element.className = this.prefix + 'word';
      }
    }
    
  /**
    * @function activate 
    * @desc activate a cursor for an element
    * @param {object} element - html element for wich will be generated class name with "active" ending
    * @mamberof Director
    * @instance
    */
    this.activate = function(element)
    { 
      if(element)
      {
        if(element.className == this.prefix + 'line-start')
        {
          element.className = this.prefix + 'line-start ' + this.active;
        }
        else
        {
          element.className = this.class_generator
                                  .setPrefix('wet-')
                                  .mainClass(element.innerHTML)
                                  .space()
                                  .subClass(element.innerHTML)
                                  .space()
                                  .generate()
                                  + this.active;  
          
        }
      }
      else
      {
        console.log('activate - has error');
        return false;
      }
    }
    
  /**
    * @function deactivate 
    * @desc deactivate a cursor for an element
    * @param {object} element - html element for wich will be generated class name
    * @mamberof Director
    * @instance
    */
    this.deactivate = function(element)
    { 
      var element_class = this.prefix + "line-start";
      
      if(!(typeof(element)=='string'))
      {
        if(element.className.split(' ')[0] == element_class)
        {
          element.className = this.prefix + "line-start";
          
          console.log('sd');
        }
        else
        {
          console.log('assd');
          element.className = this.class_generator
                                  .setPrefix(this.prefix)
                                  .mainClass(element.innerHTML)
                                  .space()
                                  .subClass(element.innerHTML)
                                  .generate();  
        }
      }
      else
      {
        var new_element = concrete_entity.getElementsByClassName(element)[0];
        new_element = this.class_generator
                          .setPrefix(this.prefix)
                          .mainClass(element.innerHTML)
                          .space()
                          .subClass(element.innerHTML)
                          .generate(); 
      }
    }

  /**
    * @function setClass 
    * @desc give class according an element 
    * @param {object} element - html element for wich will be generated class name 
    * @mamberof Director
    * @instance
    */
    this.setClass = function(element)
    { 
      if(element)
      {
        element.className = this.class_generator
                                .setPrefix(this.prefix)
                                .mainClass(element.innerHTML)
                                .space()
                                .subClass(element.innerHTML)
                                .generate();  
      }
      else
      {
        console.log('deactivate - has error');
        return false;
      }
    }
    
//////////////////
// Make section 
//////////////////
    
//////////////////
// Delete section 
//////////////////
    
  /**
    * @function deactivatePreviouse
    * @desc separating word to a single characters in container
    * @mamberof Director
    * @instance
    */
    this.deactivatePreviouse = function()
    {
			// element with class 'active' 
			var active_element = concrete_entity.getElementsByClassName(this.active)[0]; 
			
			var class_generator = new Char_Class_Generator(this.prefix);
			
			// if element is exist than change his class to native without 'active' mark
			if(active_element != undefined)
			{
        if(active_element.className.split(" ").indexOf(this.prefix + 'line-start') >= 0)
        {
          active_element.className = this.prefix + 'line-start';
        }
        else
        {
          active_element.className = class_generator
                                    .setPrefix(this.prefix)
                                    .mainClass(active_element.innerHTML)
                                    .space()
                                    .subClass(active_element.innerHTML)
                                    .generate();
          
        }
			}
    }

  /**
    * @function delete 
    * @desc delete some element
    * @param {object} element - html element wich will be deleted
    * @mamberof Director
    * @instance
    */
    this.delete = function(element)
    { 
      element.parentNode.removeChild(element);
    }

  /**
    * @function plus 
    * @desc add some element after this, if this have a next element
    * @param {object} element - element after wich will be added content
    * @param {String} content - content wich will be added after element
    * @mamberof Director
    * @instance
    */
    this.plus = function(element, content)
    {
      // cool string for adding something after active elements
      element.parentNode.insertBefore(content, element.nextSibling);
    }
    
/////////////////
// Delete section 
/////////////////
    
///////////////////
// Creating section 
///////////////////
  /**
    * @function create 
    * @desc create some element
    * @param {object} type - wich element must be created
    * @param {String} content - text wich will be in content when it will be created 
    * @param {String} status - is element active or not 
    * @return {object} - entity of created object
    * @mamberof Director
    * @instance
    */
    this.create = function(type, content, status)
    { 
      if(type == 'line-start')
      {
        return this.createLineStart(content, status);
      }
      else if(type == 'word')
      {
        return this.createWord(content, status);
      }
      else if(type == 'char')
      {
        return this.createChar(content, status);
      }
    }
    
  /**
    * @function createLineStart 
    * @desc create start element
    * @param {String} content - text wich will be in content when it will be created 
    * @param {String} status - is element active or not 
    * @return {object} - entity of created object
    * @mamberof Director
    * @instance
    */
    this.createLineStart = function(content, status)
    {
      var first_symbol = document.createElement('span');
        
      first_symbol.className = this.prefix + 'line-start';
        
      if(status == 'active')
      {
        first_symbol.className += ' ' + this.active;
      }
        
      var first_symbol_content = document.createTextNode(content);
        
      first_symbol.appendChild(first_symbol_content);
      
      return first_symbol;     
    }

  /**
    * @function createWord 
    * @desc create word entity
    * @param {String} content - text wich will be in content when it will be created 
    * @param {String} status - is element active or not 
    * @return {object} - entity of created object
    * @mamberof Director
    * @instance
    */
    this.createWord = function(content, status)
    {
      // create a word object 
      var word = document.createElement('span');
      // say to it that it will be have a children in it
      if(status == 'active')
      {
        word.className = 'wet-word parent';
      }
      else
      {
        word.className = 'wet-word';
      }
      // childs content
      var word_content = document.createTextNode(content);
      // childs container
      var character_holder = document.createElement('span');
      // generating of character class 
      if(status == 'active')
      {
        character_holder.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(content)
                                    .space()
                                    .subClass(content)
                                    .generate() 
                                    + 'active'; 
      }
      else
      {
        character_holder.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(content)
                                    .space()
                                    .subClass(content)
                                    .generate(); 
      }

      // adding new character in container
      character_holder.appendChild(word_content);
      // adding character object to the word 
      word.appendChild(character_holder);
        
      return word;    
    }
    
  /**
    * @function createChar 
    * @desc create word entity
    * @param {String} content - text wich will be in content when it will be created 
    * @param {String} status - is element active or not 
    * @return {object} - entity of created object
    * @mamberof Director
    * @instance
    */
    this.createChar = function(content, status)
    {
      var char = document.createTextNode(content);
      // childs container
      var character_holder = document.createElement('span');
      // generating of character class 
      if(status == 'active')
      {
        character_holder.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(content)
                                    .space()
                                    .subClass(content)
                                    .generate() 
                                    + 'active'; 
      }
      else
      {
        character_holder.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(content)
                                    .space()
                                    .subClass(content)
                                    .generate(); 
      }
      // adding new character in container
      character_holder.appendChild(char);
        
      return character_holder;    
    }
    
///////////////////
// Creating section 
///////////////////
    
  }  
  return Director;
})() 