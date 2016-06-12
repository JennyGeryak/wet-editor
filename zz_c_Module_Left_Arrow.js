	 
/**
  * @function left_arrow
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to emulate "left arrow" key features.
  * @param {object} options.object - entity of editors object.
  * @param {int} options.index - index of current editor element on document.
  * @memberof Module
  * @instance
  */
Module.getInstance().left_arrow = function(options)
{
  // standart block of initialization of dependencies
  var class_generator = new Char_Class_Generator('wet-');

  var concrete_entity = options.object.container[options.index];

  var divider = new Divider();
  
  var director = new Director(concrete_entity, 'wet-', 'active');
  
  // getting active element that must be deactivated
  var active_element = director.getCursorEntity("active");
  
  // getting previose element thet will be active after key pressed
  var previous_element = director.getBeforeEntity(active_element);

  // anylizing what before active element
  // and if it has previouse elements:  
  if(previous_element != false)
  {
    // if previouse element is start of line:
    if(director.isStart(previous_element))
    {
      // deactivating active element
      director.deactivate(active_element);
      // making previous element to be an active
      director.activate(previous_element);
    }
    // if it is a word:
    else if(director.isWord(previous_element))
    {
      // saing that this word now is parent
      director.makeItParentWord(previous_element);
      word = director.getParentWord();
      
      // explode one word to a diferent characters
      word.innerHTML = divider.divide(word);
      
      // take last character in this word
      var previouse_word_char = director.getLastElement(previous_element);
      
      // making previouse character as active one
      director.activate(previouse_word_char);
      
      // deactivate active element
      director.deactivate(active_element);
    }
    else
    {
      // deactivate active element
      director.deactivate(active_element);
      
      // making previous element to be an active
      director.activate(previous_element);
      
    }
  }
  
  // deactivate word when it not on start of line
  else if((director.getParentWord() != false)
          &&(director.getParentWord().previousSibling.className != 'wet-line-start'))
  {
    var word = director.getParentWord();
    
    var before_word = director.getBeforeEntity(word);
    
    // when first element is active:
    if(before_word.className.split(" ").indexOf('active') >= 0)
    {
      director.makeItWord(word);
      
      word.innerHTML = divider.concat(word);
      
      this.left_arrow(options);
      
    }
    else
    {
      director.activate(before_word);

      director.deactivate(active_element);

      word.innerHTML = divider.concat(word);	

      word.className = 'wet-word';	
      
    }
    
  }
  // deactivate word when it is on start of line
  else if((director.getParentWord() != false)
          &&(director.getParentWord().previousSibling.className == 'wet-line-start'))
  {
    var word = director.getParentWord();
    
    var before_word = director.getBeforeEntity(word);
    
    director.activate(before_word);
    
    director.deactivate(active_element);
    
    word.innerHTML = divider.concat(word);
    
    director.makeItWord(word);
  }
  else
  {
    // deactivate a line and going to the previous line
    if(director.isCursorFirstOnALine('active'))
    {      
      var parent_s = active_element.parentNode;
      
      var previous_line = director.getBeforeEntity(parent_s);
      
      if(previous_line != false)
      {
        director.deactivate(active_element);

        // !!!!!!!!!! change this.current_line
        // deactivate 'enter' pseudo sign
        options.object.current_line[options.index]--;
        word = previous_line.childNodes[previous_line.childNodes.length-1];
        
        
        // if last element in previouse line not a word
        if(director.isSignifier(word) == false)
        {
          // explode content
          word.innerHTML = divider.divide(word);
        }
        // make active last char of word
        var last_word_in_line = director.getLastElement(previous_line);
        
        // if last element in a line is a word, then make it perent with active last 
        // child:
        if(director.isWord(last_word_in_line))
        {
          director.makeItParentWord(last_word_in_line);
          
          var last_char_in_word = director.getLastElement(last_word_in_line);
            
          director.activate(last_char_in_word);
        }
        // if not, than just activate it
        else
        {
          director.activate(last_word_in_line);
        }
        
        
        // getting active element that must be deactivated
        var active_element = director.getCursorEntity('active');
        
        // getting previose element thet will be active after key pressed
        var previous_element = director.getBeforeEntity(active_element);
        
        // if we are not at start of previouse line:
        if(previous_element != false)
        {
          // if the last entity of line is word
          if(director.isWord(active_element))
          {
            director.makeItParentWord(active_element)
            
            var last_char_in_word = director.getLastElement(active_element);
            console.log(last_char_in_word);
            
            director.activate(last_char_in_word);
            
          }
        }
      }
    }
  }
}

var module = new Module.getInstance();
module.addFunction('37', 'left_arrow');