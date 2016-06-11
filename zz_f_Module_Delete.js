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
  // if next element after start - word:
  else if(director.isWord(after_cursore))
  {
    console.log(after_cursore);
  }
  // if next element after start - false:
  else
  {
    // if parent - word:
    if(director.isWord(cursore_parent))
    {
      console.log(cursore_parent);
    }
    // if parent - line:
    else if(director.isLine(cursore_parent))
    {
      console.log(cursore_parent);
    }
    
  }
  
    
}

var module = new Module.getInstance();
module.addFunction('46', 'delete');