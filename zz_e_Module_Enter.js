	
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
    
    var director = new Director(concrete_entity);
    
    var word = concrete_entity.getElementsByClassName('parent')[0];
    
    var active_char = concrete_entity.getElementsByClassName('active')[0];
        
    // if we are in parent word:
    if(director.isThereAnyActiveWords('parent'))
    {
      
    }
    // if we are not in parent word:
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
      var line_start = document.createElement('span');
      line_start.className = 'wet-line-start active';
      line_start.innerHTML = '';
      options.object.line[options.index][options.object.current_line[options.index]].appendChild(line_start);
      options.object.work_space[options.index].appendChild(options.object.line[options.index][options.object.current_line[options.index]]);
    }
  }
  
  var module = new Module.getInstance();
  module.addFunction('13', 'enter');