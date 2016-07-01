	
/**
  * @function key
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to adding characters and symbols to the work space.
  * @param {object} options.object - entity of editors object.
  * @param {int} options.index - index of current editor element on document.
  * @memberof Module
  * @instance
  */
  Module.getInstance().key = function(options)
  {
    // initialization of new character class generator 
    var class_generator = new Char_Class_Generator('wet-');
    
    // initialization of module that make action according pressed keys
    var hotkey = new Module.getInstance();
    
    // current entity of editor
    var concrete_entity = options.object.container[options.index];
    var line_number = options.object.current_line[options.index];
    var character_from_Buffer = options.object.symbol_buffer[options.index].value;
    var concrete_line = options.object.line[options.index][line_number];
    
    // initialization of words exloser 
    var divider = new Divider();
    var director = new Director(concrete_entity, 'wet-', 'active');
    // if that key pressed on new line
    if(concrete_line.innerHTML == '')
    {
      
    // deleting previose cursor 
    //director.deactivatePreviouse();
    director.deactivatePreviouse();

    // creating start span element on line begins 
    var first_symbol = director.create('line-start', ' ', 'active');

    // adding starting tag for a line 
    concrete_line.innerHTML += first_symbol.outerHTML;
    }
    
    // if pressed key is not null 
    if(character_from_Buffer != '')
    {
      // detecting previouse element with 'active' class name
      var previouse_element = director.getCursorEntity('active');
      // deactivate
      // !!!!!!!!!!!!!!!!!!!! standart deactivation, dont work 
      // director.deactivate(previouse_element);
      if(previouse_element)
      {
        var previouse_element_class = previouse_element.className.split(" ")[0]; 
      }
      else
      {
        var previouse_element_class = '';
      }

      var next_element = previouse_element.nextSibling;

      var class_of_char_in_buffer = class_generator
                                    .mainClass(character_from_Buffer)
                                    .generate();  

      // now we press an character button:
      if((class_of_char_in_buffer == "character")
         |(class_of_char_in_buffer == "numeral"))
      {
        // but our word dont created
        // then we will create it:
        if(director.isThereAnyActiveWords() == false)
        {
          if(next_element == null)
          {
            // geting activ character after what we planing to paste new one
            var active_char = director.getBeforeEntity("active");
            // create a word object 
            var word = director.create('word', character_from_Buffer, 'active');
            // so we must to delete cursor on first
            director.deactivatePreviouse();
            // adding word to the line 
            concrete_line.appendChild(word);
          }
          // if we before a word
          else if((next_element != null)&&(director.isWord(next_element)))
          {
            var active_entity = director.getCursorEntity('active');
            var word_before_active = active_entity.nextSibling;
            console.log(word_before_active);
            var content_of_word = divider.divide(word_before_active);

            var character_holder = director.create('char', character_from_Buffer, 'active');
            // adding character object to the word 
            word_before_active.innerHTML = character_holder.outerHTML + content_of_word;
            word_before_active.className = "wet-word parent";
            director.deactivatePreviouse();
          }
          // if we not in the word and before signifier:
          else if((next_element != null)&&(director.isSignifier(next_element)))
          {
            var active_entity = director.getCursorEntity('active');
            
            var new_word = director.create('word', character_from_Buffer, 'active');
            
            director.plus(active_entity, new_word);
            
            director.deactivate(active_entity);        
            
            
          }
        }
        // if we in the word:
        else
        {
          // geting activ character after what we planing to paste new one
          var active_char = director.getCursorEntity('active');
          // deactive previose char
          director.deactivate(previouse_element);
          // find ready for children word
          word = director.getParentWord();
          // childs content
          var content = document.createTextNode(character_from_Buffer);
          // childs container
          var character_holder = director.create('char', character_from_Buffer, 'active');
          // so we must to delete cursor on first
          director.deactivatePreviouse();
          // if cursor lie on the end of word we simpli adding char in the ond of word
          if(active_char.nextSibling == null)
          {
            word.appendChild(character_holder);
          }
          // if cursore lie in the middle of word, we adding after active element
          else if(active_char.nextSibling != null)
          {
            director.plus(active_char, character_holder);
          }
        }
      }
      // if pressed button is signifier:
      else if(class_of_char_in_buffer == "signifier")
      {
        var active_char = director.getCursorEntity('active');
        
        var parent_node = active_char.parentNode;
        
        var next_element = director.getNextEntity(active_char);
        
        var next_to_parent = director.getNextEntity(parent_node);
        
        var signifier = director.create('char', character_from_Buffer, 'active');
        
        // if we in the word:
        if(director.isParentWord(parent_node))
        {
          // if we at the end of word:
          if(director.isCursorAtTheEndOfWord(parent_node))
          {
            // if line is empty:
            if(!next_to_parent)
            {
              director.deactivate(active_char);
              
              director.makeItWord(parent_node);
              
              parent_node.innerHTML = divider.concat(parent_node);

              concrete_line.innerHTML += signifier.outerHTML;
            }
            // if line is not empty:
            else if(next_to_parent)
            {
              director.deactivate(active_char);
              
              director.makeItWord(parent_node);
              
              parent_node.innerHTML = divider.concat(parent_node);
              
              director.plus(parent_node, signifier);
            }
          }
          // if we not on the end of word:
          else if(!director.isCursorAtTheEndOfWord(parent_node))
          {
            var word_parts = divider.trim(parent_node, 'active');
            
            var clean_second_part = divider.concat(word_parts[1]);
            
            var new_word = director.create("word", clean_second_part, 'active');
            
            new_word.innerHTML = divider.concat(new_word);
            
            console.log(new_word);
            
            parent_node.innerHTML = word_parts[0];
                        
            parent_node.innerHTML = divider.concat(parent_node);
            
            
            // if next element is empty:
            if(!next_to_parent)
            {
              director.makeItWord(parent_node);
              
              parent_node.innerHTML = divider.concat(parent_node);

              concrete_line.innerHTML += signifier.outerHTML;
              
              concrete_line.innerHTML += new_word.outerHTML;
            }
            // if next element is not empty:
            else if(next_to_parent)
            {
              director.deactivate(active_char);
              
              director.makeItWord(parent_node);
              
              parent_node.innerHTML = divider.concat(parent_node);
              
              director.plus(parent_node, signifier);
            }
            
            
          }
        }
        // if we not in the word:
        else if(!director.isParentWord(parent_node))
        {
          // if line is empty:
          if(!next_element)
          {
            director.deactivate(active_char);

            concrete_line.innerHTML += signifier.outerHTML;
          }
          // if line is not empty:
          else if(next_element)
          {
            director.plus(active_char, signifier);

            director.deactivate(active_char);
          }
        }
        
      }
      
      // this an exception element that dont have auto generative class 
      // that is why whe need to give our own
      if((previouse_element_class == 'wet-line-start'))
      {  
        previouse_element.className = 'wet-line-start';
      }
      // clearing buffer
      options.object.symbol_buffer[options.index].value = '';
    }
  }
  var module = new Module.getInstance();
  module.addFunction('key', 'key');