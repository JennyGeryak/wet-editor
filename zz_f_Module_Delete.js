/**
  * @function delete
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to emulate "delete" key features.
  * @param {object} options.object - entity of editors object.
  * @param {int} options.index - index of current editor element on document.
  * @memberof Module
  * @instance
  */
Module.getInstance().delete = function(options)
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
  

  // if next element after - signifer:
  if(director.isSignifier(after_cursore))
  {
    director.delete(after_cursore);
  }
  // if next element after - word:
  else if(director.isWord(after_cursore))
  {
    // if word not empty:
    if(after_cursore.childNodes.length != 0)
    {
      // if word not parent:
      if(!director.isParentWord(after_cursore))
      {
        // dividing content to a characters
        after_cursore.innerHTML = divider.divide(after_cursore);
        // making word a parent one
        director.makeItParentWord(after_cursore);
      }
      director.delete(after_cursore.childNodes[0]);
    }
    // if word is empty:
    if(after_cursore.childNodes.length == 0)
    {
      director.delete(after_cursore);
    }
  }
  // if next element - character:
  else if(director.isCharacter(after_cursore))
  {
    director.delete(after_cursore);
  }
  // if next element - false:
  else
  {
    var after_element = director.getNextEntity(cursore_parent);
    var before_element = director.getBeforeEntity(cursore_parent);
    var elements_parent = cursore_parent.parentNode;
    // if parent - word:
    if(director.isWord(cursore_parent))
    {
      // if after word - signifire:
      if(director.isSignifier(after_element))
      {
        director.delete(after_element);
      }
      // if after word - word:
      else if(director.isWord(after_element))
      {
        // divide content 
        after_element.innerHTML = divider.divide(after_element);
        
        // delete first element
        director.delete(after_element.childNodes[0]);
        
        // copy content to the current word 
        var additional_content = after_element.innerHTML;
        cursore_parent.innerHTML += additional_content;
        
        // delete this word
        director.delete(after_element);
      }
      // if after word - null:
      else
      {
        // if parents next element - line:
        if(director.isLine(elements_parent.nextSibling))
        {
          var parents_next = elements_parent.nextSibling;
          var next_line_element = parents_next.childNodes[1];
          
          // if first element on next line - signifire:
          if(director.isSignifier(next_line_element))
          {
            director.delete(next_line_element);
          }
          // if first element on new line - word:
          else if(director.isWord(next_line_element))
          {
            // if word not empty:
            if(next_line_element.childNodes.length != 0)
            {
              // if word not parent:
              if(!director.isParentWord(next_line_element))
              {
                // divide content
                next_line_element.innerHTML = divider.divide(next_line_element);

                // make word parent
                director.makeItParentWord(next_line_element);

              }
              // delete element
              director.delete(next_line_element.childNodes[0]);
            }
            // if word empty:
            if(next_line_element.childNodes.length == 0)
            {
              director.delete(next_line_element);
            }
          }
        }
      }
    }
    // if parent - line:
    else if(director.isLine(cursore_parent))
    {
      //console.log(cursore_parent);
    } 
    
  }    
}

var module = new Module.getInstance();
module.addFunction('46', 'delete');