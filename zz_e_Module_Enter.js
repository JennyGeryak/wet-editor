	
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
    
    var active_char = director.getCursorEntity('active');
        
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
        
        // previouse line
        var prev_line_index = options.object.current_line[options.index];
        var prev_line = options
                        .object
                        .line[options.index][prev_line_index];
        
        // index of created line
        options.object.current_line[options.index]++;
        var line_index = options.object.current_line[options.index];

        // adding new line
        var line_start = director.create('line-start', '', 'active');
        var line = director.create('line', line_start, line_index)
        options
        .object
        .line[options.index][line_index] = line;
        
        director.plus(prev_line, line);
      }
      // if it not a last char:
      else
      {
        // take another half of word in variable word_half
        var word_halfs = divider.bisect(word);
        var first_half = word_halfs[0];
        var second_half = word_halfs[1];
                
        // delete this hulf from word
        word.innerHTML = first_half;
        
        // copy all information after word
        var after_word = director.getAllAfter(word);
        after_word = after_word.join('');
        
        // delete it from this line 
        director.deleteAllAfter(word);
        
        // concate all the gathered info in to one string 
        second_half = director.create('word', second_half);
        second_half.innerHTML = divider.concat(second_half);
        var new_line_content = second_half.outerHTML + after_word;
        
        // previouse line
        var prev_line_index = options.object.current_line[options.index];
        var prev_line = options
                        .object
                        .line[options.index][prev_line_index];
        
        // create new line
        options.object.current_line[options.index]++;
        var line_index = options.object.current_line[options.index];
        
        var line_content = director.create('line-start', '', 'active');
            line_content = line_content.outerHTML + new_line_content;
        
        // append gatherd string to new line
        var line = director.create('line', line_content, line_index)
        options
        .object
        .line[options.index][line_index] = line;
        
//        options
//        .object
//        .work_space[options.index]
//        .appendChild(line);
        director.plus(prev_line, line);
        
        // delete previouse cursor
        this.deletePrevioseCursor(concrete_entity);
        
        word.innerHTML = divider.concat(word);
        
        // deactivate previouse word
        this.deletePrevioseParent(concrete_entity);
        
      }
    }
    // if we on a start of line:
    else if(director.isCursorFirstOnALine('active'))
    {
        
      // copy all information after word
      var active_char = director.getCursorEntity('active');
      console.log(active_char)
      var after_cursor = director.getAllAfter(active_char);
      after_cursor = after_cursor.join('');
      
      // delete previouse cursor
      this.deletePrevioseCursor(concrete_entity);
      
      // previouse line
      var prev_line_index = options.object.current_line[options.index];
      var prev_line = options
      .object
      .line[options.index][prev_line_index];
      // index of created line
      options.object.current_line[options.index]++;
      var line_index = options.object.current_line[options.index];

      // adding new line
      var line_content = director.create('line-start', '', 'active');
      var full_line_content = line_content.outerHTML + after_cursor;
      var line = director.create('line', full_line_content, line_index)
      
      options.object.line[options.index][line_index] = line;

      director.plus(prev_line, line);
      prev_line.innerHTML = line_content.outerHTML;
      
      this.deletePrevioseCursor(concrete_entity);
    }
    // if we are not in parent word:
    else
    {
      var next_element = active_char.nextSibling;
      
          
            
      if(word) 
      {
        word.innerHTML = divider.concat(word);
      }

      this.deletePrevioseParent(concrete_entity);
      
      // previouse line
      var prev_line_index = options.object.current_line[options.index];
      var prev_line = options.object.line[options.index][prev_line_index];

      // index of created line
      options.object.current_line[options.index]++;
      var line_index = options.object.current_line[options.index];
      
      // we not in the word:
      if(next_element == null)
      {
        // adding new line
        var line_content = director.create('line-start', '', 'active');
        var line = director.create('line', line_content, line_index);
      }
      else
      {
        // adding new line
        var line_content = director.create('line-start', '', 'active');
        var line_main_content = divider.bisect(prev_line)[1];
        prev_line.innerHTML = divider.bisect(prev_line)[0];
            line_content = line_content.outerHTML + line_main_content;
        var line = director.create('line', line_content, line_index);
      }
      
      options
      .object
      .line[options.index][line_index] = line;
      
      director.plus(prev_line, line);
      
      this.deletePrevioseCursor(concrete_entity);
    }
  }
  
  var module = new Module.getInstance();
  module.addFunction('13', 'enter');