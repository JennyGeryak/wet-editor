	
/**
  * @function enter
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to emulate "enter" key features.
  * @param {object} options.object - entity of editors object.
  * @param {int} options.index - index of current editor element on document.
  * @memberof Module
  * @instance
  */
  Module.getInstance().enter = function(options)
  {
    // standart block of initialization of dependencies		
    var class_generator = new Char_Class_Generator('wet-');
    
    var concrete_entity = options.object.container[options.index];
    
    var divider = new Divider();
    
    var director = new Director(concrete_entity, "wet-", "active");
    
    var word = concrete_entity.getElementsByClassName('parent')[0];
    
    var active_char = concrete_entity.getElementsByClassName('active')[0];
        
    // if we are in parent word:
    if(director.isThereAnyActiveWords('parent'))
    {
      // geting a cursor position 
      var cursor_index = 0;
  
      var chars = active_char.parentElement.childNodes.length || false;
      
      // if we in the word:
      if(chars != false)
      {
        cursor_index = director.getCursorPosition(active_char);
      }
      else
      {
        cursor_index = false;
      }
      
      // if cursor it is a last char:
      if(cursor_index == (chars-1))
      {
        // concat word
        word.innerHTML = divider.concat(word);
        
        // delete previouse cursor
        this.deletePrevioseCursor(concrete_entity);
        
        // deactivate previouse word
        this.deletePrevioseParent(concrete_entity);
        
        // index of created line
        options.object.current_line[options.index]++;
        var line_index = options.object.current_line[options.index];

        // adding new line
        var line_start = director.create('line-start', '', 'active');
        var line = director.create('line', line_start, line_index)
        options
        .object
        .line[options.index][line_index] = line;
        options
        .object
        .work_space[options.index]
        .appendChild(options
                     .object
                     .line[options.index][line_index]);
      }
      else
      {
        
      }
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
      var line_index = options.object.current_line[options.index];
      
      // adding new line
      var line_start = director.create('line-start', '', 'active');
      var line = director.create('line', line_start, line_index)
      options
      .object
      .line[options.index][line_index] = line;
      options
      .object
      .work_space[options.index]
      .appendChild(options
                   .object
                   .line[options.index][line_index]);
    }
  }
  
  var module = new Module.getInstance();
  module.addFunction('13', 'enter');