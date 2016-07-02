  ///////////////////////////////////
	/*          OBSERVERS            */
	///////////////////////////////////
/**
  * @name Key_Observer
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @class
  * @classdesc it is reaction of observer on key event
  * @namespace Key_Observer
  * @constructs
  * @param {Editor} data - getting main object
  * @param {Key_Scope} scope - key map singelton 
  * @param {int} index - index of current active editor element
  * @param {event} event - object that contain event data
  * @param {String} condition - condition of key: pressed or released 
  */

  var Key_Observer = function(data, scope, index, event, condition)
  {
    // initialization of new character class generator
    var class_generator = new Char_Class_Generator('wet-');
  
    // initialization of module that make action according pressed keys
    var hotkey = new Module.getInstance();
  
    // current entity of editor
    var concrete_entity = data.container[index];
    
    var concrete_line = data.line[index][data.current_line[index]]

    // initialization of words exloser
    var divider = new Divider();
    
    var director = new Director(concrete_entity, 'wet-');
      
    // if controlling key pressed 
    // need to disabled browser hotkeys
    if(((scope.getKeyMap()[0] < '46')&&(scope.getKeyMap()[0] != '16'))
       &(scope.getKeyMap()[0] != undefined))//16
    {
      event.preventDefault(); event.stopPropagation();
    }
      
    
    
    // if pressed enter pressed (undefined, 13)
    if((scope.getKeyMap()[0] != '13')&(scope.getKeyMap()[0] != undefined))
    {
      // keq pressed function goes here
      hotkey.setOptions({
        'object': data,
        'index': index
      });
      hotkey.runFunction('key');
    }
    
    // addition char buffer cleaning for non decodeble signs
    if((scope.getKeyMap()[0] == '13'))
    {
      data.symbol_buffer[index].value ='';
    }
    
    // if tab - pressed:
    if(event.keyCode == 9){
      if((condition == 'pressed'))
      {
        event.preventDefault()
        hotkey.setOptions({
          'object': data,
          'index': index
        });
        hotkey.runFunction('9'); 
      }
      else if(condition == 'relised')
      {
        
      }
      return;
    }
    
    // if key is pressed or relissed add event to singleton
    if((condition == 'pressed'))
    {
//      console.log(scope.getKeyMap());
      hotkey.setOptions({
        'object': data,
        'index': index
      });
      hotkey.runFunction(scope.getStringKeyMap());
      scope.keyDown(event);
    }
    else if(condition == 'relised')
    {
//      console.log(scope.getKeyMap());
      hotkey.runFunction(scope.getStringKeyMap());
      scope.keyUp(event);
    }
    

    
    // adding pressed keys combinations to console
    if(data.console[index] != undefined)
    {
      data.console[index].innerHTML = (scope.getKeyMap());
    }
  }
  
  /////////////////////////////////
  //       SNIPETS LIBRARY       //
  /////////////////////////////////
  
  // 1. cool string for adding something after active elements 
  // active_char.parentNode.insertBefore(character_holder,active_char.nextSibling);