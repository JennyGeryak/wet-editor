	
/**
  * @function enter
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to emulate "enter" key features
  * @param {object} options.object - entity of editors object
  * @param {int} options.index - index of current editor element on document
  * @memberof Module
  * @instance
  */
  Module.getInstance().enter = function(options)
  {
    // standart block of initialization of dependencies		
    var class_generator = new Char_Class_Generator('wet-');
    
    var concrete_entity = options.object.container[options.index];
    
    var divider = new Divider();
    
    var word = concrete_entity.getElementsByClassName('parent')[0];
    
    var active_char = concrete_entity.getElementsByClassName('active')[0];
        
    // if we are in parent word:
    if(active_char.parentNode.className.split(" ").indexOf('parent') >= 0)
    {
      console.log(active_char.parentNode.className.split(" ").indexOf('parent'));
    }
    else
    {
      this.deletePrevioseCursor(concrete_entity);
      
      if(word) 
      {
        word.innerHTML = divider.concat(word);
      }

      this.deletePrevioseParent(concrete_entity);

      // index of created line

      options.object.current_line[options.index]++;
      // adding new line

      options.object.line[options.index][options.object.current_line[options.index]] = document.createElement('div');
      options.object.line[options.index][options.object.current_line[options.index]].className = 'line';
      options.object.line[options.index][options.object.current_line[options.index]].setAttribute('line_number', options.object.current_line[options.index]);
      options.object.work_space[options.index].appendChild(options.object.line[options.index][options.object.current_line[options.index]]);
    }
  }
  
  var module = new Module.getInstance();
  module.addFunction('13', 'enter');