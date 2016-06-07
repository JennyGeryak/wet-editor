	///////////////////////////////////
	/*          CUSTOM CLASS         */
	///////////////////////////////////
/**
  * @name Director
  * @version 1.0.0
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @class
  * @classdesc This class need for manipulating objects on code editors work space.
  * @param {object} concrete_entity - object with work space.
  * @param {String} prefix - prefix for elements classes.
  * @param {String} active - cursors active class name.
  * @namespace Director
  * @constructs Director
  * @example director.getCursorEntity('active');
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
    * @desc inspect editor for an active words.
    * @return {bool} - if we have some active word.
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
    * @desc chacking is cursor plased on start of line.
    * @param {String} cursor_marker - marker of cursor.
    * @return {bool} - entity of previouse for active element.
    * @mamberof Director
    * @instance
    */
    this.isCursorFirstOnALine = function(cursor_marker)
    { 
      var active_char = this.getCursorEntity(cursor_marker);
      
      var previouse_char = active_char.previousSibling || false;
      
      console.log(previouse_char);
      
      if(!previouse_char)
      {
        if(active_char.className.split(" ").indexOf(this.prefix+ "line-start") >= 0)
        {
          console.log('cool');
          return true;
        }
        else
        {
          console.log('notcool');
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
    * @desc chacking, is cursor placed before word.
    * @param {object} cursor_marker - marker of active element.
    * @return {bool}
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
    * @desc chacking element, is it start one.
    * @param {object} element - html element for checking.
    * @return {bool}
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
    * @desc chacking element is signifer.
    * @param {object} element - html element for checking.
    * @return {bool}
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
    * @desc chacking element is it word.
    * @param {object} element - html element for checking.
    * @return {bool}
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
    * @desc chacking element is it word.
    * @param {object} element - html element for checking
    * @return {bool}
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
    * @desc checking element is it character.
    * @param {object} element - html element for checking.
    * @return {bool}
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
    
  /**
    * @function isCursoreBeforeWord
    * @desc checking element is it before word.
    * @param {object} element - html element for checking.
    * @return {bool}
    * @mamberof Director
    * @instance
    */
    this.isCursoreBeforeWord = function(element)
    { 
      var equivalent = this.prefix + 'word';
      
      if(element)
      {
        if(element.nextSibling.className.split(" ").indexOf(equivalent) >= 0)
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
    * @desc geting cursor entity from code.
    * @param {String} cursor_marker - marker of active element.
    * @return {object} - entity of active element.
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
    * @desc getting entity that goes before element.
    * @param {String} cursor_marker - marker of active element.
    * @return {object} - entity of previouse elemtnt of active element.
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
    * @desc getting parent word entity if it hase.
    * @return {object} - entity of parent word.
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
    * @desc searching for an last element of word.
    * @param {object} word - entity of word.
    * @return {object} - entity of last element of word.
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
    
  /**
    * @function getCursorPosition 
    * @desc returning position of cursor inside of word or etc.
    * @param {object} cursor - cursor entity.
    * @return {number} - index of cursor.
    * @mamberof Director
    * @instance
    */
    this.getCursorPosition = function(cursor)
    { 
      var active_char_index = 0;
      
      // searching a position ow the word 
      for(var i=0; i<cursor.parentElement.childNodes.length-1; i++)
      {
        var char_class = cursor.parentElement.childNodes[i].className;
        var char_classes = char_class.split(" ");
        if(char_classes.indexOf('active') >= 0)
        {
          break;
        }
        active_char_index++;
      }
      
      return active_char_index;
    }
    // alternative: 
    // var i = Array.prototype.indexOf.call(e.childNodes, someChildEl);  > ie9

  /**
    * @function getAllAfter 
    * @desc return array of elements, that lie after current element
    * @param {object} element - after that element we starting to searching another
    * @return {Array} - elements that will be cutted from a linne
    * @mamberof Director
    * @instance
    */
    this.getAllAfter = function(element)
    { 
      var elements = [];
      
      while(element.nextSibling)
      {
        element = element.nextSibling
        
        elements.push(element.outerHTML);
      }
      
      return elements;
    }
//////////////////
// Getting section 
//////////////////

//////////////////
// Make section 
//////////////////
    
  /**
    * @function makeItParentWord 
    * @desc making a word an a parent word.
    * @param {object} before_entity - element what must became a parent word.
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
    * @desc give the class name of word.
    * @param {object} element - element that must became a word.
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
    * @desc activate a cursor for an element.
    * @param {object} element - html element for wich will be generated class name 
      with "active" ending.
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
        else if(element.className == this.prefix + 'word')
        {
          element.className = this.prefix + 'word ' + 'parent';
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
    * @param {object} element - html element for wich will be generated class name.
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
        }
        else
        {
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
    * @desc give class according an element.
    * @param {object} element - html element for wich will be generated class name. 
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
    * @desc deactivating cursor if it on word space.
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
    * @desc delete some element.
    * @param {object} element - html element wich will be deleted.
    * @mamberof Director
    * @instance
    */
    this.delete = function(element)
    { 
      element.parentNode.removeChild(element);
    }

  /**
    * @function plus 
    * @desc add some element after this, if this have a next element.
    * @param {object} element - element after wich will be added content.
    * @param {String} content - content wich will be added after element.
    * @mamberof Director
    * @instance
    */
    this.plus = function(element, content)
    {
      // cool string for adding something after active elements
      element.parentNode.insertBefore(content, element.nextSibling);
    }
    
  /**
    * @function deleteAllAfter 
    * @desc delete elements, that lie after current element
    * @param {object} element - after that element we starting to deleting
    * @mamberof Director
    * @instance
    */
    this.deleteAllAfter = function(element)
    { 
      var elements =[];
      
      while(element.nextSibling)
      {
        element = element.nextSibling;
        
        elements.push(element);
        
      }
      
      for(var i = 0; i<elements.length; i++)
      {
        this.delete(elements[i]);
      }
    }
    
  /**
    * @function cutAllAfter 
    * @desc cut elements, that lie after current element
    * @param {object} element - after that element we starting to cuted
    * @mamberof Director
    * @instance
    */
    this.cutAllAfter = function(element)
    { 
      var elements = [];
      
      while(element.nextSibling)
      {
        element = element.nextSibling;
        
        elements.push(element);
        
        this.delete(element);
      }
      
      for(var i = 0; i<elements.length; i++)
      {
        this.delete(elements[i]);
        
        elements[i] = elements[i].outerHTML;
      }
      
      return elements;
    }
    
/////////////////
// Delete section 
/////////////////
    
///////////////////
// Creating section 
///////////////////
  /**
    * @function create 
    * @desc create some element.
    * @param {String} type - wich element must be created.
    * @param {String} content - text wich will be in content when it will be created. 
    * @param {String} status - is element active or not.
    * @return {object} - entity of created object.
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
      else if(type == 'space')
      {
        return this.createSpace(status);
      }
      else if(type == 'line')
      {
        return this.createLine(content, status);
      }
      
    }
    
  /**
    * @function createLineStart 
    * @desc create start element.
    * @param {String} content - text wich will be in content when it will be created. 
    * @param {String} status - is element active or not.
    * @return {object} - entity of created object.
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
    * @desc create word entity.
    * @param {String} content - text wich will be in content when it will be created.
    * @param {String} status - is element active or not.
    * @return {object} - entity of created object.
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
        
        // childs content
        var word_content = document.createTextNode(content);
        // childs container
        var character_holder = document.createElement('span');
        // generating of character class 
      }
      else
      {
        word.className = 'wet-word';
        
        var character_holder = content;
      }
      if(status == 'active')
      {
        character_holder.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(content)
                                    .space()
                                    .subClass(content)
                                    .generate() 
                                    + 'active'; 
        // adding new character in container
        character_holder.appendChild(word_content);
        // adding character object to the word 
        word.appendChild(character_holder);
      }
      else
      {

        // adding character object to the word 
        word.innerHTML = character_holder;
      }


        
      return word;    
    }
    
  /**
    * @function createChar 
    * @desc create character entity.
    * @param {String} content - text wich will be in content when it will be created.
    * @param {String} status - is element active or not. 
    * @return {object} - entity of created object.
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
    
  /**
    * @function createSpace 
    * @desc create space entity.
    * @param {String} status - is element active or not. 
    * @return {object} - entity of created object.
    * @mamberof Director
    * @instance
    */
    this.createSpace = function(status)
    {
      // creating a space object
      var space = document.createElement('span');
      // generating of character class 
      if(status == 'active')
      {
        space.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(' ')
                                    .space()
                                    .subClass(' ')
                                    .space()
                                    .generate() 
                                    + 'active'; 
      }
      else
      {
        space.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(' ')
                                    .space()
                                    .subClass(' ')
                                    .generate(); 
      }
      // adding new character in container
      space.innerHTML = " ";
        
      return space;    
    }
    
  /**
    * @function createLine
    * @desc create line entity.
    * @param {String} content - text wich will be in content when it will be created. 
    * @param {number} index - lines index number. 
    * @return {object} - entity of created object.
    * @mamberof Director
    * @instance
    */
    this.createLine = function(content, index)
    {
      var line = document.createElement('li');
      
      line.className = this.prefix + 'line';
      
      line.setAttribute('line_number', index);
      
      if(typeof(content) == 'string')
      {
        line.innerHTML = content;
      }
      else
      {
        line.appendChild(content);
      }
        
      return line;    
    }
    
///////////////////
// Creating section 
///////////////////
    
  }  
  return Director;
})() 