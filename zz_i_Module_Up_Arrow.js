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
  
}

var module = new Module.getInstance();
module.addFunction('38', 'up_arrow');