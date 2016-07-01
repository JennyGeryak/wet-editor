	
/**
  * @function backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to emulate "tab" key features.
  * @param {object} options.object - entity of editors object.
  * @param {int} options.index - index of current editor element on document.
  * @memberof Module
  * @instance
  */
  Module.getInstance().tab = function(options)
  {
    // standart block of initialization of dependencies 
    var class_generator = new Char_Class_Generator('wet-');
  
    var concrete_entity = options.object.container[options.index];
  
    var divider = new Divider();
    
    var director = new Director(concrete_entity, 'wet-', 'active');
  
    // prepare previose element for next work
    var word = director.getParentWord();

    var active_char = director.getCursorEntity('active');
    
    var line_number = options.object.current_line[options.index]-1;
    
    // if cursor on a line start:
    if(!active_char)
    {
      active_char = document.getElementsByClassName('wet-'+'line-start')[line_number];
      
      director.activate(active_char);
    }
    
    var active_char_index = 0;
  
    var chars = active_char.parentElement.childNodes.length || false;
    
    var tab = director.create('tab', '&#09;', 'active');
  
    // if we in the word:
    if(chars != false)
    {
      
      active_char_index = director.getCursorPosition(active_char);
      
    }
    // active element is not in the word
    else
    {
      active_char_index = false;
    }
    
    // if cursor is in the end of:
    if(active_char_index == (chars-1))
    {
      // word:
      if(word)
      {
        director.deactivate(active_char);

        // if we are in parent word:
        if(word != undefined)
        {
          word.innerHTML = divider.concat(word);
        }

        this.deletePrevioseParent(concrete_entity);

        // adding space objecto to an active line
        word.parentNode.insertBefore(tab, word.nextSibling);

      }
      // 
      else if(director.isCursorFirstOnALine('active'))
      {
        if(active_char.nextSibling)
        {
          director.deactivate(active_char);
          
          director.plus(active_char, tab);
        }
        else
        {
          director.deactivate(active_char);
        
          active_char.parentElement.appendChild(tab);
        }
        
      }
      else
      {
        director.deactivate(active_char);
        
        // if we have something after cursor:
        if(active_char.nextSibling)
        {
          director.plus(active_char, tab);
        }
        // if we have nothing after cursor:
        else
        {
          active_char.parentElement.appendChild(tab);          
        }
      }
    }
    // if cursor is not at the end of word or if it on preend element:
    else if((active_char_index < (chars-1))|(active_char_index == 1))
    {
      if(word != false)
      {
        // divide word in to two other
        var two_parts_of_word = divider.bisect(word);
      
        var first_part_word = document.createElement('span');
        first_part_word.className = 'wet-word';
        first_part_word.innerHTML = two_parts_of_word[0];
      
        var second_part_word = document.createElement('span');
        second_part_word.className = 'wet-word';
        second_part_word.innerHTML = two_parts_of_word[1];
        second_part_word.innerHTML = divider.concat(second_part_word);
      
        // add space after word
        word.parentNode.insertBefore(tab ,word.nextSibling);
      
        // change words content to a first part that was before a cursor
        word.innerHTML = divider.concat(first_part_word);
        
      
        // renew active alement for space after word
        active_char = concrete_entity.getElementsByClassName('active')[0];

      
        // paste last part of word after space as independent word
        active_char.parentNode.insertBefore(second_part_word ,active_char.nextSibling);
        
        this.deletePrevioseParent(concrete_entity);
      }
      // if cursor before word:
      else if(director.isCursorBeforeWord(active_char))
      {
        active_char.parentNode.insertBefore(tab ,active_char.nextSibling);
        
        director.deactivate(active_char);
        
      }
      else
      {
        director.deactivate(active_char);       
        if(active_char.nextSibling)
        {
          active_char.parentNode.insertBefore(tab ,active_char.nextSibling);
        }
        else
        {
          active_char.parentElement.appendChild(tab);
        }
      }
    }
  }
  
  var module = new Module.getInstance();
  module.addFunction('9', 'tab');

  /////////////////////////////////
  //       SNIPETS LIBRARY       //
  /////////////////////////////////

//  // the way to find position of active element
//
//    for(var i=0; i<active_char.parentElement.childNodes.length-1; i++)
//    {
//      active_char_index++;
//      var char_class = active_char.parentElement.childNodes[i].className;
//      var char_classes = char_class.split(" ");
//      if(char_classes.indexOf('active') >= 0)
//      {
//        break;
//      }
//    }
//    // var i = Array.prototype.indexOf.call(e.childNodes, someChildEl);  > ie9