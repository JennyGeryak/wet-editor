	
/**
  * @function backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @License cc-by-nc-sa 4.0
  * @desc this module need to emulate "space" key features
  * @param {object} options.object - entity of editors object
  * @param {int} options.index - index of current editor element on document
  * @memberof Module
  * @instance
  */
  Module.getInstance().space = function(options)
  {
  // standart block of initialization of dependencies 
  var class_generator = new Char_Class_Generator('wet-');
  
  var concrete_entity = options.object.container[options.index];
  
  var divider = new Divider();
  
  // prepare previose element for next work
  var word = concrete_entity.getElementsByClassName('parent')[0];
  
  var active_char = concrete_entity.getElementsByClassName('active')[0];
  
  var active_char_index = 0;
  
  var chars = active_char.parentElement.childNodes.length || false;
  
  if(chars != false)
  {
    for(var i=0; i<active_char.parentElement.childNodes.length-1; i++)
    {
      active_char_index++;
      var char_class = active_char.parentElement.childNodes[i].className;
      var char_classes = char_class.split(" ");
      if(char_classes.indexOf('active') >= 0)
      {
        break;
      }
    }
    // var i = Array.prototype.indexOf.call(e.childNodes, someChildEl);  > ie9
  }
  else
  {
    active_char_index = false;
  }
  if(active_char_index == (chars-1))
  {
    this.deletePrevioseCursor(concrete_entity);
    // if we are in parent word:
    // MUST BE FIXED BECAUSE IT PUSHING OUT SPACE
    if(word != undefined)
    {
      word.innerHTML = divider.concat(word);
    }
    this.deletePrevioseParent(concrete_entity);
    
    // creating a space object
    var space = document.createElement('span');
    // generating a special class for it
    space.className = class_generator
                      .setPrefix('wet-')
                      .mainClass(" ")
                      .space()
                      .subClass(" ")  
                      .generate() 
                      + ' active';
    
    // adding space contant
    space.innerHTML = " ";
    // adding space objecto to an active line
    options.object.line[options.index][options.object.current_line[options.index]].appendChild(space);
  }
  else
  {
    if(word != undefined)
    {
      var two_parts_of_word = divider.bisect(word)[0];
      word.innerHTML = two_parts_of_word;
      console.log(word, two_parts_of_word);
    }
  }
}
var module = new Module.getInstance();
module.addFunction('32', 'space');