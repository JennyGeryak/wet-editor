	
/**
  * @function backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
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
  
    // if we in the word:
    if(chars != false)
    {
      // searching a position ow the word 
      for(var i=0; i<active_char.parentElement.childNodes.length-1; i++)
      {
        var char_class = active_char.parentElement.childNodes[i].className;
        var char_classes = char_class.split(" ");
        if(char_classes.indexOf('active') >= 0)
        {
          break;
        }
        active_char_index++;
      }
      // var i = Array.prototype.indexOf.call(e.childNodes, someChildEl);  > ie9
    }
    // active element is not in the word
    else
    {
      active_char_index = false;
    }
    
    // if cursor is in the end of word:
    if(active_char_index == (chars-1))
    {
      this.deletePrevioseCursor(concrete_entity);
      
      // if we are in parent word:
      if(word != undefined)
      {
        word.innerHTML = divider.concat(word);
      }
    
      this.deletePrevioseParent(concrete_entity);
        
      // adding space objecto to an active line
      word.parentNode.insertBefore(space, word.nextSibling);
    }
    // if cursor is not at the end of word or if it on preend element:
    else if((active_char_index < (chars-1))|(active_char_index == 1))
    {
      if(word != undefined)
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
        word.parentNode.insertBefore(space ,word.nextSibling);
      
        // change words content to a first part that was before a cursor
        word.innerHTML = divider.concat(first_part_word);
      
        // renew active alement for space after word
        active_char = concrete_entity.getElementsByClassName('active')[0];
      
        // paste last part of word after space as independent word
        active_char.parentNode.insertBefore(second_part_word ,active_char.nextSibling);
        
        this.deletePrevioseParent(concrete_entity);
      }
    }
  }
  
  var module = new Module.getInstance();
  module.addFunction('32', 'space');

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