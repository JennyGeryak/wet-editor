	
/**
  * @function backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to emulate "backspase" key features
  * @param {object} options.object - entity of editors object
  * @param {int} options.index - index of current editor element on document
  * @memberof Module
  * @instance
  */
Module.getInstance().backspase = function(options)
{
  // standart block of initialization of dependencies		
  var class_generator = new Char_Class_Generator('wet-');
  var concrete_entity = options.object.container[options.index];
  var divider = new Divider();
  var director = new Director(concrete_entity, 'wet-', 'active');
  
  // getting active element that must be deleted
  var active_char = director.getCursorEntity('active');

  // getting previose element thet will be active after key pressed
  var previous_entity = director.getBeforeEntity(active_char);
  
  // anylizing what before active element
  // and if it has previouse elements:  
  if(previous_entity)
  {
    // if before element is a word:
    if(director.isCursorBeforeWord(active_char))
    {
      // saing that this word now is parent
      director.makeItParentWord(previous_entity);
      var word = director.getParentWord();
      
      // explode one word to a diferent characters 
      word.innerHTML = divider.divide(word);
      
      // take last character in this word
      var previouse_word_char = director.getLastElement(word);
      
      // making previouse character as active one
      director.activate(previouse_word_char);
      
      // deleting active element
      director.delete(active_char);
    }
    // if it simply deliting an elements in the word
    else
    {
      // deleting active element
      director.delete(active_char);

      // making previous element to be an active 
      director.activate(previous_entity);
    }
  }
  // deleting word when it not on start of line
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!
  else if((director.getParentWord() != false)
          &&(director.getParentWord().previousSibling.className != 'wet-line-start'))
  {
    var word = director.getParentWord();
    var before_word = director.getBeforeEntity(word);
    director.activate(before_word);
    director.delete(word);
  }		
  // deleting word when it is on start of line
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  else if((director.getParentWord() != false)
          &&(director.getParentWord().previousSibling.className == 'wet-line-start'))
  {
    var word = director.getParentWord(); 
    var before_word = director.getBeforeEntity(word);
    before_word.className = 'wet-line-start active';
    director.delete(word);
  }
  else
  {
    // deleting a line and going to the previous
    if(director.isStart(active_char))
    {
      var parent_s = active_char.parentNode;
      var previous_line = director.getBeforeEntity(parent_s);
      if(previous_line != false)
      {
        
        director.delete(parent_s);
        
        // !!!!!!!!!! change this.current_line 
        // deleting 'enter' pseudo sign
        options.object.current_line[options.index]--;
        
        // last word on previouse line
        word = previous_line.childNodes[previous_line.childNodes.length-1];
        
        // if last element in previouse line not a word
        if(!director.isSignifier(word))
        {
          // exploded content
          word.innerHTML = divider.divide(word);
        }
        // make active last word of line 
        var last_word_on_previose_line = director.getLastElement(previous_line);
        director.activate(last_word_on_previose_line);
        
        // getting active element that must be deleted
        var active_char = director.getCursorEntity('active');
        
        // getting previose element thet will be active after key pressed
        var previous_char = director.getBeforeEntity(active_char);
        
        // if we have previouse element:
        if(previous_char != false)
        {
          // if active element is word:
          if(director.isWord(active_char))
          {
            // marking it as parent
            active_char.className = 'wet-word parent';
            
            // generating class for the last child in it              
            var last_char_index = active_char.childNodes.length-1;
            var last_char_of_word = active_char.childNodes[last_char_index];
            director.activate(last_char_of_word);
          }
        }
      }        
    }
  }
}

var module = new Module.getInstance();
module.addFunction('8', 'backspase');