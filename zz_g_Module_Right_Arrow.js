/**
  * @function right_arrow
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to emulate "right arrow" key features.
  * @param {object} options.object - entity of editors object.
  * @param {int} options.index - index of current editor element on document.
  * @memberof Module
  * @instance
  */
Module.getInstance().right_arrow = function(options)
{
  // standart block of initialization of dependencies		
  var class_generator = new Char_Class_Generator('wet-');
  var concrete_entity = options.object.container[options.index];
  var divider = new Divider();
  var director = new Director(concrete_entity, "wet-", "active");
  var word = director.getParentWord();
  var cursore_entity = director.getCursorEntity('active');
  var after_cursore = director.getNextEntity(cursore_entity);
  var before_cursore = director.getBeforeEntity(cursore_entity);
  var cursore_parent = cursore_entity.parentNode;
  
  // if next element - signifire:
  if(director.isSignifier(after_cursore))
  {
    director.deactivate(cursore_entity);
    
    director.activate(after_cursore);
  }  
  // if next element - character:
  else if(director.isCharacter(after_cursore))
  {
    director.deactivate(cursore_entity);
    
    director.activate(after_cursore);
  }
  // if next element - word:
  else if(director.isWord(after_cursore))
  {
    director.makeItParentWord(after_cursore);
    
    after_cursore.innerHTML = divider.divide(after_cursore);
    
    director.activate(after_cursore.childNodes[0]);
    
    director.deactivate(cursore_entity);
  }
  // if next element - false:
  else if(after_cursore == false)
  {
    var next_to_parent = director.getNextEntity(cursore_parent);
    var parent_for_parent = cursore_parent.parentNode || false;
    var next_to_parent_for_parent = parent_for_parent.nextSibling || false;
    
    // if next element - signifire:
    if(director.isSignifier(next_to_parent))
    {
      director.deactivate(cursore_entity);
      
      // if parent - word:
      if(director.isWord(cursore_parent))
      {
        cursore_parent.innerHTML = divider.concat(cursore_parent);
        
        director.makeItWord(cursore_parent);
      }
      
      director.activate(next_to_parent);
    }
    // if next element - line:
    else if(director.isLine(next_to_parent))
    {
      director.deactivate(cursore_entity);
      
      director.activate(next_to_parent.childNodes[0]);
      
      // index of created line !!!!!!
      options.object.current_line[options.index]++;
    }
    // if next element - false:
    else if(!next_to_parent)
    {
      // if there is next line:
      if(next_to_parent_for_parent)
      {
        // if parent - word:
        if(director.isWord(cursore_parent))
        {
          cursore_parent.innerHTML = divider.concat(cursore_parent);
          
          director.makeItWord(cursore_parent);
        }
        
        // index of created line !!!!!!
        options.object.current_line[options.index]++;

        director.activate(next_to_parent_for_parent.childNodes[0]); 
      }
    }
  }
}

var module = new Module.getInstance();
module.addFunction('39', 'right_arrow');