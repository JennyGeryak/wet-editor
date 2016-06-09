'use strict'
	///////////////////////////////////
	/*          MAIN CLASS           */
	///////////////////////////////////
/**
  * @name Editor
  * @version 1.0.2
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @class
  * @namespace Editor
  * @augments Observable
  * @constructs
  * @classdesc It is main class with constructor. Need for initialization of 
  work space of code editor.
  * @example var spoiler = new Spoiler('spoiler','opened', 1);
  * @param {String} className - class of div wich containe spoiler child elements.
  */
  var Editor = (function()
  {
    function Editor(name, options){
      if(name != undefined)
      {
        // innitialization global variables for 
      /**
        * @public
        */	
        this.editor_name = name;
      /**
        * @public
        */	
        this.container= new Array();
      /**
        * @public
        */	
        this.work_space = new Array();
      /**
        * @public
        */	
        this.symbol_buffer = new Array();
       /**
        * @public
        */	
        this.console = new Array();
      /**
        * @public
        */
        this.line = new Array();
      /**
        * @public
        */
        this.current_line = new Array();

        // inheritation of observable
        if(Observable != undefined)
        {
          Observable.apply(this, arguments);
          this.subscribe(Key_Observer);
        }

        // unic code for each editor by this class 
        for (var i = 0; i < document.getElementsByClassName(this.editor_name).length; i++) 
        {
          // main container
          this.container[i] = document.getElementsByClassName(this.editor_name)[i];
          this.container[i].style.position = 'relative';

          // textare tag for given symbols 
          this.symbol_buffer[i] = document.createElement('textarea');
          this.symbol_buffer[i].className = 'symbol_buffer';
          this.symbol_buffer[i].cols = '1';
          this.symbol_buffer[i].rows = '1';
          this.symbol_buffer[i].style.opacity = '0';
          this.container[i].appendChild(this.symbol_buffer[i]);

          // working space 
          this.work_space[i] = document.createElement('ol');
          this.work_space[i].className = 'result';
          this.work_space[i].style.border = '1px solid #000';
          this.work_space[i].style.height = '500px';
          function disableselect(e) {return false}
          this.work_space[i].onselectstart = function (){return false};
          this.work_space[i].onmousedown = disableselect;
          this.container[i].appendChild(this.work_space[i]);

          // initializing first line
          this.line[i] = new Array();
          this.current_line[i] = 1;
          this.line[i][this.current_line[i]] = document.createElement('li');
          this.line[i][this.current_line[i]].className = 'wet-'+'line';
          this.line[i][this.current_line[i]].setAttribute('line_number', this.current_line[i]);
          this.work_space[i].appendChild(this.line[i][this.current_line[i]]);
          var line_start = document.createElement('span');
              line_start.className = 'wet-line-start active';
              line_start.innerHTML = '';
          this.line[i][this.current_line[i]].appendChild(line_start);

          // console in right conor of component
          if(options.console == true)
          {
            this.console[i] = document.createElement('div');
            this.console[i].className = 'console';
            this.console[i].style.border = '1px solid #000';
            this.console[i].style.position = 'absolute';
            this.console[i].style.top = '0px';
            this.console[i].style.right = '0px';
            this.console[i].style.width = '200px';
            this.console[i].style.height = '50px';
            this.container[i].appendChild(this.console[i]);
          }

        /**
          * @event work_space#onclick
          */
          this.work_space[i].object = this;
          this.work_space[i].index = i;
          this.work_space[i].key_scope = Key_Scope.getInstance();
          this.work_space[i].onclick = function()
          {
            this.object.symbol_buffer[this.index].focus();
            //console.log(window.getSelection());
          }

        /**
          * @event symbol_buffer#onclick
          * @param {object} e - event wich will contain key code
          */
          this.symbol_buffer[i].object = this;
          this.symbol_buffer[i].index = i;
          this.symbol_buffer[i].key_scope = Key_Scope.getInstance();
          this.symbol_buffer[i].onkeydown = function(event)
          {
            // observer innitialithation 
            if(Observable != undefined)
            {
              this.object.publish(this.object, this.key_scope, this.index, event, 'pressed');
            }
          };

        /**
          * @event symbol_buffer#onkeyup
          * @param {object} e - event wich will contain key code
          */
          this.symbol_buffer[i].onkeyup = function(event)
          {
            if(Observable != undefined)
            {
              this.object.publish(this.object, this.key_scope, this.index, event, 'relised');
            }
          };

        /**
          * @event symbol_buffer#onblur
          */
          this.symbol_buffer[i].onblur = function()
          {
            this.key_scope.clearKeyMap();
          }
        };
      }
      else
      {
        console.log('sorry but you have not add any name to editors name field');
      }
    }
    return Editor;
  })()
	///////////////////////////////////
	/*          BUILDER              */
	///////////////////////////////////
/**
  * @name Char_Class_Generator
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @class
  * @namespace Char_Class_Generator
  * @constructs 
  * @classdesc this class is returning string for elements class
  * @example class_generator
            .setPrefix('wet-')
            .mainClass(data.symbol_buffer[index].value)
            .space()
            .subClass(data.symbol_buffer[index].value)
            .generate()
  */
  var Char_Class_Generator = function()
  {
    var char = '';
    var code = '';
    var result_class = '';
    var prefix = '';

  /**
    * @public
    * @function
    * @name mainClass
    * @mamberof Char_Class_Generator
    * @instance
    * @desc adding main class.
    * @param {String} user_char - char from cher buffer .
    */
    function mainClass(user_char)
    {

      char = user_char;
      
      // converting char type variable to dec code
      code = char.charCodeAt(0);

      // adding class to result variable
      if((code <= 47)||((code >= 58)
      &&(code <= 64))||((code >= 91)
      &&(code <= 96))||((code >= 122)
      &&(code <= 126)))
      {
        result_class = prefix + 'signifier';
      }
      else if((code >= 48)&&(code <= 57))
      {
        result_class = prefix + 'numeral';
      }
      else if(((code >= 65)&&(code <= 90))
              ||((code >= 97)&&(code <= 122)))
      {
        result_class = prefix + 'character';
      }
      // if we give some parametr
      if(user_char.length >= 1)
      {
        if(user_char == 'wet-line-start')
        {
          result_class = 'wet-line-start';
        }
        else
        {
          
        }
      }
        return this;
      }

    /**
      * @public
      * @function
      * @name subClass
      * @mamberof Char_Class_Generator
      * @instance
      * @desc adding subclass to main class.
      * @param {String} user_char - char from character buffer.
      */
      function subClass(user_char)
      {
        char = user_char;
        code = char.charCodeAt(0);

        // signifires and uppercase code map 
        var codes = [
          {'start_code':32, 'end_code':32, 'desc':'space'}, //
          {'start_code':33, 'end_code':33, 'desc':'exclamation'}, // !
          {'start_code':34, 'end_code':34, 'desc':'quotation '}, // "
          {'start_code':35, 'end_code':35, 'desc':'hash'}, // #
          {'start_code':36, 'end_code':36, 'desc':'dollar'}, // $
          {'start_code':37, 'end_code':37, 'desc':'percent'}, // %
          {'start_code':38, 'end_code':38, 'desc':'ampersand'}, // &
          {'start_code':39, 'end_code':39, 'desc':'apostrophe'}, // '
          {'start_code':40, 'end_code':40, 'desc':'left_parenthesis'}, // (
          {'start_code':41, 'end_code':41, 'desc':'right_parenthesis'}, // )
          {'start_code':42, 'end_code':42, 'desc':'asterix'}, // *
          {'start_code':43, 'end_code':43, 'desc':'plus'}, // +
          {'start_code':44, 'end_code':44, 'desc':'comma'}, // ,
          {'start_code':45, 'end_code':45, 'desc':'hyphen'}, // - 
          {'start_code':46, 'end_code':46, 'desc':'period'}, // .
          {'start_code':47, 'end_code':47, 'desc':'slash'}, // /
          {'start_code':58, 'end_code':58, 'desc':'colon'}, // :
          {'start_code':59, 'end_code':59, 'desc':'semicolon'}, // ;
          {'start_code':60, 'end_code':60, 'desc':'less_than'}, // <
          {'start_code':61, 'end_code':61, 'desc':'equals'}, // =
          {'start_code':62, 'end_code':62, 'desc':'greater_than'}, // >
          {'start_code':63, 'end_code':63, 'desc':'question'}, // ?
          {'start_code':64, 'end_code':64, 'desc':'at'}, // @
          {'start_code':65, 'end_code':90, 'desc':'uppercase'}, // upp
          {'start_code':91, 'end_code':91, 'desc':'left_square_vrecket'}, // [
          {'start_code':92, 'end_code':92, 'desc':'backslash'}, // \
          {'start_code':93, 'end_code':93, 'desc':'right_square_vrecket'}, // ]
          {'start_code':94, 'end_code':94, 'desc':'caret'}, // ^
          {'start_code':95, 'end_code':95, 'desc':'underscore'}, // _
          {'start_code':96, 'end_code':96, 'desc':'grave_accent'}, // `
          {'start_code':123, 'end_code':123, 'desc':'left_curly_brace'}, // {
          {'start_code':124, 'end_code':124, 'desc':'vertical_bar'}, // |
          {'start_code':125, 'end_code':125, 'desc':'left_curly_brace'}, // }
          {'start_code':126, 'end_code':126, 'desc':'tilda'}, // ~ 
        ];
        // adding subclass to result class 
        for (var i = 0; i < codes.length; i++) {
          if((code == codes[i].start_code))
          {
            result_class += prefix + codes[i].desc;
          }
          else if(((code >= codes[i].start_code)&&(code <= codes[i].start_code)))
          {
            result_class += prefix + codes[i].desc;
          }
          else
          {
            result_class += '';
          }
        };
        return this;
      }

    /**
      * @public
      * @function
      * @name setPrefix
      * @mamberof Char_Class_Generator
      * @instance
      * @desc setting prefix, which will be adding to every class
      * @param {String} user_prefix - prefix for class
      */
      function setPrefix(user_prefix)
      {
        prefix = user_prefix || "";
        return this;
      }

    /**
      * @public
      * @function
      * @name space
      * @mamberof Char_Class_Generator
      * @instance
      * @desc adding space between classes.
      */
      function space()
      {
        result_class += ' ';
        return this;
      }

    /**
      * @public
      * @function
      * @name generate
      * @mamberof Char_Class_Generator
      * @instance
      * @desc builder function
      */
      function generate()
      {
        return result_class;
      }

      return{
        mainClass: mainClass,
        subClass: subClass,
        generate: generate,
        setPrefix: setPrefix,
        space: space
      }
    }
	///////////////////////////////////
	/*         OBSERVABLE            */
	///////////////////////////////////

/**
  * @name Observable
  * @class
  * @classdesc standart subject for obsrver. 
  * @namespace Observable
  * @constructs 
  * @example this.subscribe({some observer});
  */

  var Observable = function()
  {

    this.subscribers = new Array();

  /**
    * @public
    * @function
    * @name subscribe
    * @desc need for subscribing observers.
    * @mamberof Observable
    * @instance
    * @param {Object} observer - object wich containe observer instans.
    */
    this.subscribe = function(observer)
    {
      this.subscribers.push(observer);
    }

  /**
    * @public
    * @function
    * @name unsubscribe
    * @desc need for unsubscribing observers.
    * @mamberof Observable
    * @instance
    * @param {Object} observer - object wich containe observer instans.
    */
    this.unsubscribe = function(observer)
    {
      for (var i = 0; i < this.subscribers.length; i++) 
      {
        if (this.subscribers[i] === observer) 
        {
          this.subscribers[i].splice(i, 1);
          return;
        };
      };
    }

  /**
    * @public
    * @function
    * @name publish
    * @desc calling observers constructors.
    * @mamberof Observable
    * @instance
    * @param {Object} data - some objects collection to do some actions with.
    * @param {int} counter - index of sub object in data collection.
    */
    this.publish = function(data, scope, index, event, condition)
    {
      for (var i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](data, scope, index, event, condition);
      };
    }

  }
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
    if((scope.getKeyMap()[0] < '46')&(scope.getKeyMap()[0] != undefined))//16
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
    
    // if key is pressed or relissed add event to singleton
    if((condition == 'pressed'))
    {
      //console.log(scope.getKeyMap()[0]);
      hotkey.setOptions({
        'object': data,
        'index': index
      });
      hotkey.runFunction(scope.getStringKeyMap());
      scope.keyDown(event);
    }
    else if(condition == 'relised')
    {
      //console.log(scope.getKeyMap()[0]);
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
	///////////////////////////////////
  /*          SINGELTON            */
  ///////////////////////////////////

/**
  * @name Key_Scope
  * @version 1.0.0
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @class
  * @classdesc it is singelton which contain current key combinations, 
    and have functional to work with it.
  * @namespace Key_Scope
  * @constructs Key_Scope
  * @example var key_scope = Key_Scope.getInstance();
  */
  var Key_Scope = (function () {
    var instance;
    function createInstance() 
    {
    /**
      * @private
      */
      var key_map = new Array();
      
    /**
      * @private
      */
      var key_flag = false;
      
    /**
      * @private
      * @function
      * @name addKeyToMap
      * @desc adding key code to key map.
      * @mamberof Key_Scope
      * @instance
      * @param {int} key - key code frome key event.
      */
      function addKeyToMap(key) {
        if(key_map.length == 0)
        {
          key_map.push(key);
        }
        else
        {
          for (var i = 0; i <= key_map.length; i++) 
          {
            if(key_map[i] == key) 
            {
              key_flag = true;
            }
          }
          if(key_flag == false)
          {
            key_map.push(key);
          }
          key_flag = false;
        }
      }
      
    /**
      * @private
      * @function
      * @name removeKeyFromMap
      * @desc removing key code to key map.
      * @mamberof Key_Scope
      * @instance
      * @param {int} key - key code frome key event.
      */
      function removeKeyFromMap(key) {
        for (var i = 0; i <= key_map.length; i++) 
        {
          if (key_map[i] == key) 
          {
            key_map.splice(i, 1);
          }
        }
      }
      
    /**
      * @public
      * @function
      * @name keyDown
      * @desc catching code frome event and adding it to key map, on some action. 
      * @mamberof Key_Scope
      * @instance
      * @param {object} e - event which contain code of pressed button.
      */
      function keyDown(e)  {
        var key_num;
        if (window.event) // IE   
        { 
          key_num = e.keyCode;
          // e.preventDefault(); e.stopPropagation();      
        } 
        else if (e.which) // Netscape/Firefox/Opera
        {           
          key_num = e.which;
          // e.preventDefault(); e.stopPropagation();
        }
        addKeyToMap(key_num);
      }
      
    /**
      * @public
      * @function
      * @name keyUp
      * @desc catching code frome event and removing it to key map, on some action. 
      * @mamberof Key_Scope
      * @instance
      * @param {object} e - event which contain code of pressed button.
      */
      function keyUp(e) {
        var key_num;
        if (window.event) // IE  
        {         
          key_num = e.keyCode;
          // e.preventDefault(); e.stopPropagation();
        } 
        else if (e.which) // Netscape/Firefox/Opera 
        {          
          key_num = e.which;
          // e.preventDefault(); e.stopPropagation();
        }
        removeKeyFromMap(key_num);
      }
      
    /**
      * @public
      * @function
      * @name getKeyMap
      * @desc return key map. 
      * @mamberof Key_Scope
      * @instance
      * @return {Array} - key map content.
      */
      function getKeyMap()
      {
        return key_map.sort();
      }
      
    /**
      * @public
      * @function
      * @name getStringKeyMap
      * @desc return key map like a string.
      * @mamberof Key_Scope
      * @instance
      * @return {String} - key map content.
      */
      function getStringKeyMap()
      {
        return key_map.sort().toString();
      }
      
    /**
      * @public
      * @function
      * @name clearKeyMap
      * @desc refreshing key map.
      * @mamberof Key_Scope
      * @instance
      */
      function clearKeyMap()
      {
        key_map = [];
      }
 		    
      return {
        keyDown : keyDown,
        keyUp : keyUp,
        getKeyMap: getKeyMap,
        clearKeyMap: clearKeyMap,
        getStringKeyMap: getStringKeyMap
      };
    }

    return {
      getInstance: function () {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      }
    };
  })();
	///////////////////////////////////
/*           SINGLETON		       */
///////////////////////////////////	

/**
  * @name Module
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @class
  * @classdesc it is solution that helps to create additional mudules more 
    easely and implement it to application.
  * @namespace Module
  * @constructs Module
  * @example     Module.getInstance().modules_name = function(options)
                  {
                  // some code
                  }
                  var module = new Module.getInstance();
                  module.addFunction('8', 'modules_name');
  *
  */
  var Module = (function()
  {
    var instance;

    function createInstance() 
    {
      // 	var key_assotiation = [
      // 		{'key_combination':'27','function_name':'unselect'}, // esc
      // {'key_combination':'9','function_name':'tab'}, // tab
      // // {'key_combination':'16','function_name':'shift'}, // shift
      // // {'key_combination':'17','function_name':'control'},
      // // {'key_combination':'18','function_name':'alt'},
      // // {'key_combination':'8','function_name':'backspase'}, // <==
      // // {'key_combination':'46','function_name':'delete'}, // <==
      // {'key_combination':'36','function_name':'home'},
      // {'key_combination':'35','function_name':'end'},
      // {'key_combination':'37','function_name':'left_arrow'}, // <-
      // {'key_combination':'39','function_name':'right_arrow'}, // ->
      // {'key_combination':'38','function_name':'up_arrow'}, // ^
      // {'key_combination':'40','function_name':'dovn_arrow'} // \/
      // 	];

      // collection of hotkeys and according to them functions (test)
      var key_assotiation = {'8':{ 'function_name':'backspase' }, 
                             '9':{'function_name':'tab'}};
      
      // array for functions arguments
      var options ;
      
    /**
      * @private
      * @function
      * @name deletePrevioseCursor
      * @desc it is need to delete previose cursor and it protect of making 
        unnecessary multicursors.
      * @mamberof Module
      * @inner
      */
      function deletePrevioseCursor(concrete_entity)
      {
        // element with class 'active' 
        var active_element = concrete_entity.getElementsByClassName("active")[0]; 
        var class_generator = new Char_Class_Generator('wet-');
        
        // if element is exist than change his class to native without 'active' mark
        if(active_element != undefined)
        {
          if(active_element.className.split(" ").indexOf('wet-line-start') >= 0)
          {
            active_element.className = 'wet-line-start';
          }
          else
          {
            active_element.className = class_generator
              .setPrefix('wet-')
              .mainClass(active_element.innerHTML)
              .space()
              .subClass(active_element.innerHTML)
              .generate();
          }
        }
      }
    /**
      * @private
      * @function
      * @name deletePrevioseParent
      * @desc it is need to delete 'perent' class from object it gives oportunity 
        to know in which exact container is word lie.
      * @mamberof Module
      * @inner
      */
      function deletePrevioseParent(concrete_entity)
      {
        // active word 
        var parent = concrete_entity.getElementsByClassName('parent')[0];
        // make a standart class for word 
        if(parent != undefined)
        {
          parent.className = "wet-word";
        }
      }

    /**
      * @public
      * @function addFunction
      * @desc this method need for adding new functions and hotkeys for them
      * @mamberof Module
      * @instance
      * @param {String} key_combination - string of the key combination
      * @param {String} function_name - function which will be added to a module
      */
      function addFunction(key_combination, function_name)
      {
        key_assotiation[key_combination] = {'function_name' :function_name};
      }

    /**
      * @public
      * @function dump
      * @desc returns list of all hotkeys and functions.
      * @mamberof Module
      * @instance
      * @return {Array} - array of hotkeys and function.
      */
      function dump()
      {
        console.log(key_assotiation);
        return key_assotiation;
      }

    /**
      * @public
      * @function runFunction
      * @desc this function initializing the function according pressed hotkey.
      * @mamberof Module
      * @instance
      * @param {String} combination - combination of keys converted to a string. 
      */
      function runFunction(combination)
      {
        if((combination > 0)||(combination == 'key'))
        {
          if (key_assotiation[combination] != undefined )
          {
            this[key_assotiation[combination]['function_name']](options) || '';
          };

        }
      }

    /**
      * @public
      * @function setOptions
      * @desc adding arguments before function will be initialized.
      * @mamberof Module
      * @instance
      * @param {Array} user_options - array of arguments for function.
      */
      function setOptions(user_options)
      {
        options = user_options;
      }

      return {
        addFunction: addFunction,
        dump: dump,
        runFunction: runFunction,
        key_assotiation: key_assotiation,
        setOptions: setOptions,
        deletePrevioseCursor: deletePrevioseCursor,
        deletePrevioseParent: deletePrevioseParent				
      }

    }

    return {
      getInstance: function () {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      }
    };
  })()
	///////////////////////////////////
	/*          CUSTOM CLASS         */
	///////////////////////////////////
/**
  * @name Divider
  * @version 1.0.0
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @class
  * @classdesc this class is need to separating character by character or to 
    concate them into one word.
  * @namespace Divider
  * @constructs Divider
  * @example word.innerHTML = divider.concat(word);
  */
var Divider = (function()
{
  function Divider()
  {
  /**
    * @function divide 
    * @desc separating word to a single characters in container.
    * @param {Object} word - container that contain string with word that must be 
      exploded.
    * @return {String} - string with html code that containe separated characters.
    * @mamberof Divider
    * @instance
    */
    this.divide = function(word)
    {
      var content = word.innerHTML;
      
      var final_content = '';
      
      var array_of_chars = content.split('');
      
      var class_generator = new Char_Class_Generator('wet-');
      
      for(var i = 0; i < array_of_chars.length; i++)
      {
        final_content += '<span class="'
                        + class_generator
                        .setPrefix('wet-')
                        .mainClass(array_of_chars[i])
                        .space()
                        .subClass(array_of_chars[i])
                        .generate()
                        + '">'
                        + array_of_chars[i]
                        + '</span>';
      }
      
      return final_content;
    }

  /**
    * @function concat
    * @desc joining all separate characters to a one string.
    * @mamberof Divider
    * @instance
    * @param {Object} word - container that contain separated characters with word 
      that must be exploded.
    * @return {String} - string with word.
    */
    this.concat = function(word)
    {
      if(word != undefined)
      {
        var content = word.innerHTML;

        // thanks for Human Being http://stackoverflow.com/users/1835198/human-being 
        // http://stackoverflow.com/questions/13911681/remove-html-tags-from-a-javascript-string
        var rex = /(<([^>]+)>)/ig;

        content = content.replace(rex , "");

        return content;
      }
      else
      {
        return '';
      }
    }
  /**
    * @function bisect
    * @desc divide a massive of characters in the word to two parts.
    * @mamberof Divider
    * @instance
    * @param {Object} word - container that contain separated characters with word
      that must be exploded.
    * @return {Array} - string with word.
    */
    this.bisect = function(word)
    {
      var result = new Array();
      
      result[0] = '';
      
      result[1] = '';
      
      var j = 0;
      
      if(word != undefined)
      {
        for(var i=0; i<=(word.childNodes.length-1); i++)
        {
          var some = word.childNodes[i].className.split(' ').indexOf('active');
          
          result[j] += word.childNodes[i].outerHTML;
          
          if(some >= 0)
          {
            j=1;
          }
        }
        return result;				
      }
      else
      {
        return result;
      }
    }
  }
  return Divider;
})()
	///////////////////////////////////
	/*          CUSTOM CLASS         */
	///////////////////////////////////
/**
  * @name Director
  * @version 1.0.0
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @class
  * @classdesc This class need for manipulating objects on code editors work space.
  * @param {object} concrete_entity - object with work space.
  * @param {String} prefix - prefix for elements classes.
  * @param {String} active - cursors active class name.
  * @namespace Director
  * @constructs Director
  * @example director.getCursorEntity('active');
  */
var Director = (function()
{
  function Director(concrete_entity, prefix, active)
  {
    this.concrete_entity = concrete_entity;
    this.prefix = prefix;
    this.active = active;
    this.class_generator = new Char_Class_Generator(this.prefix);

//////////////////////
// Comparative section 
//////////////////////
    
  /**
    * @function isThereAnyActiveWords 
    * @desc inspect editor for an active words.
    * @return {bool} - if we have some active word.
    * @mamberof Director
    * @instance
    */
    this.isThereAnyActiveWords = function()
    {
      var word = this.concrete_entity.getElementsByClassName('parent')[0] || false;
      
      if(word)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    
  /**
    * @function isCursorFirstOnALine 
    * @desc chacking is cursor plased on start of line.
    * @param {String} cursor_marker - marker of cursor.
    * @return {bool} - entity of previouse for active element.
    * @mamberof Director
    * @instance
    */
    this.isCursorFirstOnALine = function(cursor_marker)
    { 
      var active_char = this.getCursorEntity(cursor_marker);
      
      var previouse_char = active_char.previousSibling || false;
      
      if(!previouse_char)
      {
        if(active_char.className.split(" ").indexOf(this.prefix+ "line-start") >= 0)
        {
          return true;
        }
        else
        {
          return false;
          
        }
      }
      else
      {
        return false;
      }

    } 
    
  /**
    * @function isCursorBeforeWord 
    * @desc chacking, is cursor placed before word.
    * @param {object} cursor_marker - marker of active element.
    * @return {bool}
    * @mamberof Director
    * @instance
    */
    this.isCursorBeforeWord = function(cursor_entity)
    { 
      
      var previouse_char = cursor_entity.previousSibling;
      
      var index = previouse_char.className.split(" ").indexOf(this.prefix + "word");
      
      if(index >= 0)
      {
        return true;
      }
      else
      {
        return false;
      }

    }
    
    
  /**
    * @function isStart 
    * @desc chacking element, is it start one.
    * @param {object} element - html element for checking.
    * @return {bool}
    * @mamberof Director
    * @instance
    */
    this.isStart = function(element)
    { 
      if(element)
      {
        if(element.className.split(" ")[0] == this.prefix + 'line-start')
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }

  /**
    * @function isSignifier 
    * @desc chacking element is signifer.
    * @param {object} element - html element for checking.
    * @return {bool}
    * @mamberof Director
    * @instance
    */
    this.isSignifier = function(element)
    { 
      if(element)
      {
        if(element.className.split(" ").indexOf(this.prefix + 'signifier') >= 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }

  /**
    * @function isWord
    * @desc chacking element is it word.
    * @param {object} element - html element for checking.
    * @return {bool}
    * @mamberof Director
    * @instance
    */
    this.isWord = function(element)
    { 
      if(element)
      {
        if(element.className.split(" ").indexOf(this.prefix + 'word') >= 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }

  /**
    * @function isParentWord
    * @desc chacking element is it word.
    * @param {object} element - html element for checking
    * @return {bool}
    * @mamberof Director
    * @instance
    */
    this.isParentWord = function(element)
    { 
      if(element)
      {
        if(element.className.split(" ").indexOf('parent') >= 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }

  /**
    * @function isCharacter
    * @desc checking element is it character.
    * @param {object} element - html element for checking.
    * @return {bool}
    * @mamberof Director
    * @instance
    */
    this.isCharacter = function(element)
    { 
      var equivalent = this.prefix + 'character';
      
      if(element)
      {
        if(element.className.split(" ").indexOf(equivalent) >= 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }
    
  /**
    * @function isCursoreBeforeWord
    * @desc checking element is it before word.
    * @param {object} element - html element for checking.
    * @return {bool}
    * @mamberof Director
    * @instance
    */
    this.isCursoreBeforeWord = function(element)
    { 
      var equivalent = this.prefix + 'word';
      
      if(element)
      {
        if(element.nextSibling.className.split(" ").indexOf(equivalent) >= 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }
    
  /**
    * @function isLineEmpty
    * @desc checking line is it empty.
    * @param {object} line - html element for checking.
    * @return {bool}
    * @mamberof Director
    * @instance
    */
    this.isLineEmpty = function(line)
    { 
      var equivalent = this.prefix + 'line';
      
      if(line)
      {
        var children = line.childNodes;
        if(children.length == 1)
        {
          if(children[0].className == this.prefix + 'line-start')
          {
            return true;
          }
          else
          {
            return false;
          }
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
      
    }
    
//////////////////////
// Comparative section 
//////////////////////
    
//////////////////
// Getting section 
//////////////////
    
  /**
    * @function getCursorEntity 
    * @desc geting cursor entity from code.
    * @param {String} cursor_marker - marker of active element.
    * @return {object} - entity of active element.
    * @mamberof Director
    * @instance
    */
    this.getCursorEntity = function(cursor_marker)
    {
      var active_char = this
                        .concrete_entity
                        .getElementsByClassName(cursor_marker)[0] || false;
      if(active_char)
      {
        return active_char;
      }
      else
      {
        console.log('getCursorEntity - has error');
        return false;
      }
    }

  /**
    * @function getBeforeEntity
    * @desc getting entity that goes before element.
    * @param {String} cursor_marker - marker of active element.
    * @return {object} - entity of previouse elemtnt of active element.
    * @mamberof Director
    * @instance
    */
    this.getBeforeEntity = function(entity)
    {      
      var previouse = entity.previousSibling || false;
      
      if(previouse)
      {
        return previouse;
      }
      else
      {
        return false;
      }
    }
    
  /**
    * @function getParentWord 
    * @desc getting parent word entity if it hase.
    * @return {object} - entity of parent word.
    * @mamberof Director
    * @instance
    */
    this.getParentWord = function()
    { 
      var parent = this
                  .concrete_entity
                  .getElementsByClassName('parent')[0] 
                  || false;
      if(parent)
      {
        return parent;
      }
      else
      {
        return false;
      }
    }
    
  /**
    * @function getLastElement 
    * @desc searching for an last element of word.
    * @param {object} word - entity of word.
    * @return {object} - entity of last element of word.
    * @mamberof Director
    * @instance
    */
    this.getLastElement = function(word)
    { 
      var element = word.childNodes[word.childNodes.length-1] || false;
      
      if(element)
      {
        return element;
      }
      else
      {
        return false;
      }
    }
    
  /**
    * @function getCursorPosition 
    * @desc returning position of cursor inside of word or etc.
    * @param {object} cursor - cursor entity.
    * @return {number} - index of cursor.
    * @mamberof Director
    * @instance
    */
    this.getCursorPosition = function(cursor)
    { 
      var active_char_index = 0;
      
      // searching a position ow the word 
      for(var i=0; i<cursor.parentElement.childNodes.length-1; i++)
      {
        var char_class = cursor.parentElement.childNodes[i].className;
        var char_classes = char_class.split(" ");
        if(char_classes.indexOf('active') >= 0)
        {
          break;
        }
        active_char_index++;
      }
      
      return active_char_index;
    }
    // alternative: 
    // var i = Array.prototype.indexOf.call(e.childNodes, someChildEl);  > ie9

  /**
    * @function getAllAfter 
    * @desc return array of elements, that lie after current element
    * @param {object} element - after that element we starting to searching another
    * @return {Array} - elements that will be cutted from a linne
    * @mamberof Director
    * @instance
    */
    this.getAllAfter = function(element)
    { 
      var elements = [];
      if(element.nextSibling){
        while(element.nextSibling)
        {
          element = element.nextSibling

          elements.push(element.outerHTML);
        }

        return elements;
      }
      else
      {
        return [];
      }
    }
//////////////////
// Getting section 
//////////////////

//////////////////
// Make section 
//////////////////
    
  /**
    * @function makeItParentWord 
    * @desc making a word an a parent word.
    * @param {object} before_entity - element what must became a parent word.
    * @mamberof Director
    * @instance
    */
    this.makeItParentWord = function(before_entity)
    { 
      if(before_entity)
      {
        before_entity.className = this.prefix + 'word parent';
      }
    }
    
  /**
    * @function makeItWord 
    * @desc give the class name of word.
    * @param {object} element - element that must became a word.
    * @mamberof Director
    * @instance
    */
    this.makeItWord = function(element)
    { 
      if(element)
      {
        element.className = this.prefix + 'word';
      }
    }
    
  /**
    * @function activate 
    * @desc activate a cursor for an element.
    * @param {object} element - html element for wich will be generated class name 
      with "active" ending.
    * @mamberof Director
    * @instance
    */
    this.activate = function(element)
    { 
      if(element)
      {
        if(element.className == this.prefix + 'line-start')
        {
          element.className = this.prefix + 'line-start ' + this.active;
        }
        else if(element.className == this.prefix + 'word')
        {
          element.className = this.prefix + 'word ' + 'parent';
        }
        else
        {
          element.className = this.class_generator
                                  .setPrefix('wet-')
                                  .mainClass(element.innerHTML)
                                  .space()
                                  .subClass(element.innerHTML)
                                  .space()
                                  .generate()
                                  + this.active;  
          
        }
      }
      else
      {
        console.log('activate - has error');
        return false;
      }
    }
    
  /**
    * @function deactivate 
    * @desc deactivate a cursor for an element
    * @param {object} element - html element for wich will be generated class name.
    * @mamberof Director
    * @instance
    */
    this.deactivate = function(element)
    { 
      var element_class = this.prefix + "line-start";
      
      if(!(typeof(element)=='string'))
      {
        if(element.className.split(' ')[0] == element_class)
        {
          element.className = this.prefix + "line-start";
        }
        else
        {
          element.className = this.class_generator
                                  .setPrefix(this.prefix)
                                  .mainClass(element.innerHTML)
                                  .space()
                                  .subClass(element.innerHTML)
                                  .generate();  
        }
      }
      else
      {
        var new_element = concrete_entity.getElementsByClassName(element)[0];
        new_element = this.class_generator
                          .setPrefix(this.prefix)
                          .mainClass(element.innerHTML)
                          .space()
                          .subClass(element.innerHTML)
                          .generate(); 
      }
    }

  /**
    * @function setClass 
    * @desc give class according an element.
    * @param {object} element - html element for wich will be generated class name. 
    * @mamberof Director
    * @instance
    */
    this.setClass = function(element)
    { 
      if(element)
      {
        element.className = this.class_generator
                                .setPrefix(this.prefix)
                                .mainClass(element.innerHTML)
                                .space()
                                .subClass(element.innerHTML)
                                .generate();  
      }
      else
      {
        console.log('deactivate - has error');
        return false;
      }
    }
    
  /**
    * @function plus 
    * @desc add some element after this, if this have a next element.
    * @param {object} element - element after wich will be added content.
    * @param {String} content - content wich will be added after element.
    * @mamberof Director
    * @instance
    */
    this.plus = function(element, content)
    {
      // cool string for adding something after active elements
      element.parentNode.insertBefore(content, element.nextSibling);
    }
    
//////////////////
// Make section 
//////////////////
    
//////////////////
// Delete section 
//////////////////
    
  /**
    * @function deactivatePreviouse
    * @desc deactivating cursor if it on word space.
    * @mamberof Director
    * @instance
    */
    this.deactivatePreviouse = function()
    {
			// element with class 'active' 
			var active_element = concrete_entity.getElementsByClassName(this.active)[0]; 
			
			var class_generator = new Char_Class_Generator(this.prefix);
			
			// if element is exist than change his class to native without 'active' mark
			if(active_element != undefined)
			{
        if(active_element.className.split(" ").indexOf(this.prefix + 'line-start') >= 0)
        {
          active_element.className = this.prefix + 'line-start';
        }
        else
        {
          active_element.className = class_generator
                                    .setPrefix(this.prefix)
                                    .mainClass(active_element.innerHTML)
                                    .space()
                                    .subClass(active_element.innerHTML)
                                    .generate();
          
        }
			}
    }

  /**
    * @function delete 
    * @desc delete some element.
    * @param {object} element - html element wich will be deleted.
    * @mamberof Director
    * @instance
    */
    this.delete = function(element)
    { 
      element.parentNode.removeChild(element);
    }

    
  /**
    * @function deleteAllAfter 
    * @desc delete elements, that lie after current element
    * @param {object} element - after that element we starting to deleting
    * @mamberof Director
    * @instance
    */
    this.deleteAllAfter = function(element)
    { 
      var elements =[];
      
      while(element.nextSibling)
      {
        element = element.nextSibling;
        
        elements.push(element);
        
      }
      
      for(var i = 0; i<elements.length; i++)
      {
        this.delete(elements[i]);
      }
    }
    
  /**
    * @function cutAllAfter 
    * @desc cut elements, that lie after current element
    * @param {object} element - after that element we starting to cuted
    * @mamberof Director
    * @instance
    */
    this.cutAllAfter = function(element)
    { 
      var elements = [];
      
      while(element.nextSibling)
      {
        element = element.nextSibling;
        
        elements.push(element);
        
        this.delete(element);
      }
      
      for(var i = 0; i<elements.length; i++)
      {
        this.delete(elements[i]);
        
        elements[i] = elements[i].outerHTML;
      }
      
      return elements;
    }
    
/////////////////
// Delete section 
/////////////////
    
///////////////////
// Creating section 
///////////////////
  /**
    * @function create 
    * @desc create some element.
    * @param {String} type - wich element must be created.
    * @param {String} content - text wich will be in content when it will be created. 
    * @param {String} status - is element active or not.
    * @return {object} - entity of created object.
    * @mamberof Director
    * @instance
    */
    this.create = function(type, content, status)
    { 
      if(type == 'line-start')
      {
        return this.createLineStart(content, status);
      }
      else if(type == 'word')
      {
        return this.createWord(content, status);
      }
      else if(type == 'char')
      {
        return this.createChar(content, status);
      }      
      else if(type == 'space')
      {
        return this.createSpace(status);
      }
      else if(type == 'line')
      {
        return this.createLine(content, status);
      }
      
    }
    
  /**
    * @function createLineStart 
    * @desc create start element.
    * @param {String} content - text wich will be in content when it will be created. 
    * @param {String} status - is element active or not.
    * @return {object} - entity of created object.
    * @mamberof Director
    * @instance
    */
    this.createLineStart = function(content, status)
    {
      var first_symbol = document.createElement('span');
        
      first_symbol.className = this.prefix + 'line-start';
        
      if(status == 'active')
      {
        first_symbol.className += ' ' + this.active;
      }
        
      var first_symbol_content = document.createTextNode(content);
        
      first_symbol.appendChild(first_symbol_content);
      
      return first_symbol;     
    }

  /**
    * @function createWord 
    * @desc create word entity.
    * @param {String} content - text wich will be in content when it will be created.
    * @param {String} status - is element active or not.
    * @return {object} - entity of created object.
    * @mamberof Director
    * @instance
    */
    this.createWord = function(content, status)
    {
      // create a word object 
      var word = document.createElement('span');
      // say to it that it will be have a children in it
      if(status == 'active')
      {
        word.className = 'wet-word parent';
        
        // childs content
        var word_content = document.createTextNode(content);
        // childs container
        var character_holder = document.createElement('span');
        // generating of character class 
      }
      else
      {
        word.className = 'wet-word';
        
        var character_holder = content;
      }
      if(status == 'active')
      {
        character_holder.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(content)
                                    .space()
                                    .subClass(content)
                                    .generate() 
                                    + 'active'; 
        // adding new character in container
        character_holder.appendChild(word_content);
        // adding character object to the word 
        word.appendChild(character_holder);
      }
      else
      {

        // adding character object to the word 
        word.innerHTML = character_holder;
      }


        
      return word;    
    }
    
  /**
    * @function createChar 
    * @desc create character entity.
    * @param {String} content - text wich will be in content when it will be created.
    * @param {String} status - is element active or not. 
    * @return {object} - entity of created object.
    * @mamberof Director
    * @instance
    */
    this.createChar = function(content, status)
    {
      var char = document.createTextNode(content);
      // childs container
      var character_holder = document.createElement('span');
      // generating of character class 
      if(status == 'active')
      {
        character_holder.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(content)
                                    .space()
                                    .subClass(content)
                                    .generate() 
                                    + 'active'; 
      }
      else
      {
        character_holder.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(content)
                                    .space()
                                    .subClass(content)
                                    .generate(); 
      }
      // adding new character in container
      character_holder.appendChild(char);
        
      return character_holder;    
    }
    
  /**
    * @function createSpace 
    * @desc create space entity.
    * @param {String} status - is element active or not. 
    * @return {object} - entity of created object.
    * @mamberof Director
    * @instance
    */
    this.createSpace = function(status)
    {
      // creating a space object
      var space = document.createElement('span');
      // generating of character class 
      if(status == 'active')
      {
        space.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(' ')
                                    .space()
                                    .subClass(' ')
                                    .space()
                                    .generate() 
                                    + 'active'; 
      }
      else
      {
        space.className = this.class_generator
                                    .setPrefix('wet-')
                                    .mainClass(' ')
                                    .space()
                                    .subClass(' ')
                                    .generate(); 
      }
      // adding new character in container
      space.innerHTML = " ";
        
      return space;    
    }
    
  /**
    * @function createLine
    * @desc create line entity.
    * @param {String} content - text wich will be in content when it will be created. 
    * @param {number} index - lines index number. 
    * @return {object} - entity of created object.
    * @mamberof Director
    * @instance
    */
    this.createLine = function(content, index)
    {
      var line = document.createElement('li');
      
      line.className = this.prefix + 'line';
      
      line.setAttribute('line_number', index);
      
      if(typeof(content) == 'string')
      {
        line.innerHTML = content;
      }
      else
      {
        line.appendChild(content);
      }
        
      return line;    
    }
    
///////////////////
// Creating section 
///////////////////
    
  }  
  return Director;
})() 

	///////////////////////////////////
	/*           MAIN SCRIPT         */
	///////////////////////////////////

	var first = new Editor('someeditor', {
		console:true
	});

	var second = new Editor('someeditor_another', {
		console:false
	});

	
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
      if(class_of_char_in_buffer == "character")
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
        }
        // if we in the word
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
	
/**
  * @function backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to emulate "backspase" key features.
  * @param {object} options.object - entity of editors object.
  * @param {int} options.index - index of current editor element on document.
  * @memberof Module
  * @instance
  */
Module.getInstance().backspase = function(options)
{
  // standart block of initialization of dependencies		
  var class_generator = new Char_Class_Generator('wet-');
  var concrete_entity = options.object.container[options.index];
  var divider = new Divider();
  var director = new Director(concrete_entity, 'wet-', 'active');
  
  // getting active element that must be deleted
  var active_char = director.getCursorEntity('active');

  // getting previose element thet will be active after key pressed
  var previous_entity = director.getBeforeEntity(active_char);
  
  // anylizing what before active element
  // and if it has previouse elements:  
  if(previous_entity)
  {
    // if before element is a word:
    if(director.isCursorBeforeWord(active_char))
    {
      // saing that this word now is parent
      director.makeItParentWord(previous_entity);
      var word = director.getParentWord();
      
      // explode one word to a diferent characters 
      word.innerHTML = divider.divide(word);
      
      // take last character in this word
      var previouse_word_char = director.getLastElement(word);
      
      // making previouse character as active one
      director.activate(previouse_word_char);
      
      // deleting active element
      director.delete(active_char);
    }
    // if it simply deliting an elements in the word
    else
    {
      // deleting active element
      director.delete(active_char);

      // making previous element to be an active 
      director.activate(previous_entity);
    }
  }
  // deleting word when it not on start of line
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!
  else if((director.getParentWord() != false)
          &&(director.getParentWord().previousSibling.className != 'wet-line-start'))
  {
    var word = director.getParentWord();
    var before_word = director.getBeforeEntity(word);
    director.activate(before_word);
    director.delete(word);
  }		
  // deleting word when it is on start of line
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  else if((director.getParentWord() != false)
          &&(director.getParentWord().previousSibling.className == 'wet-line-start'))
  {
    var word = director.getParentWord(); 
    var before_word = director.getBeforeEntity(word);
    before_word.className = 'wet-line-start active';
    director.delete(word);
  }
  else
  {
    // deleting a line and going to the previous
    if(director.isStart(active_char))
    {
      var parent_s = active_char.parentNode;
      var previous_line = director.getBeforeEntity(parent_s);
      if(previous_line != false)
      {
        // if line not empty:
        if(!director.isLineEmpty(parent_s))
        {
          var previouse_line_content = divider.bisect(parent_s);
          previouse_line_content = previouse_line_content[1];
          console.log(previouse_line_content);
        }
        
        // deleting previouse line
        director.delete(parent_s);
        
        // !!!!!!!!!! change this.current_line 
        // deleting 'enter' pseudo sign
        options.object.current_line[options.index]--;
        
        // last word on previouse line
        word = previous_line.childNodes[previous_line.childNodes.length-1];
        
        // if last element in previouse line not a word:
        if(!director.isSignifier(word))
        {
          // exploded content
          word.innerHTML = divider.divide(word);
          
          // take last word char
          var last_word_char = director.getLastElement(word);
          
          // activete this char 
          director.activate(last_word_char);
        }
        // make active last word of line 
        var last_word_on_previose_line = director.getLastElement(previous_line);
        
        director.activate(last_word_on_previose_line);
        
        // add content from previouse line to current line 
        // if line not empty:
        if(!director.isLineEmpty(parent_s))
        {
          previous_line.innerHTML += previouse_line_content;
        }
        
        // getting active element that must be deleted
        var active_char = director.getCursorEntity('active');
        
        // getting previose element thet will be active after key pressed
        var previous_char = director.getBeforeEntity(active_char);
        
        // if we have previouse element:
        if(previous_char != false)
        {
          // if active element is word:
          if(director.isWord(active_char))
          {
            // marking it as parent
            active_char.className = 'wet-word parent';
            
            // generating class for the last child in it              
            var last_char_index = active_char.childNodes.length-1;
            var last_char_of_word = active_char.childNodes[last_char_index];
            director.activate(last_char_of_word);
          }
        }
      }        
    }
  }
}

var module = new Module.getInstance();
module.addFunction('8', 'backspase');
	 
/**
  * @function left_arrow
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to emulate "left arrow" key features.
  * @param {object} options.object - entity of editors object.
  * @param {int} options.index - index of current editor element on document.
  * @memberof Module
  * @instance
  */
Module.getInstance().left_arrow = function(options)
{
  // standart block of initialization of dependencies
  var class_generator = new Char_Class_Generator('wet-');

  var concrete_entity = options.object.container[options.index];

  var divider = new Divider();
  
  var director = new Director(concrete_entity, 'wet-', 'active');
  
  // getting active element that must be deactivated
  var active_element = director.getCursorEntity("active");
  
  // getting previose element thet will be active after key pressed
  var previous_element = director.getBeforeEntity(active_element);

  // anylizing what before active element
  // and if it has previouse elements:  
  if(previous_element != false)
  {
    // if previouse element is start of line:
    if(director.isStart(previous_element))
    {
      // deactivating active element
      director.deactivate(active_element);
      // making previous element to be an active
      director.activate(previous_element);
    }
    // if it is a word:
    else if(director.isWord(previous_element))
    {
      // saing that this word now is parent
      director.makeItParentWord(previous_element);
      word = director.getParentWord();
      
      // explode one word to a diferent characters
      word.innerHTML = divider.divide(word);
      
      // take last character in this word
      var previouse_word_char = director.getLastElement(previous_element);
      
      // making previouse character as active one
      director.activate(previouse_word_char);
      
      // deactivate active element
      director.deactivate(active_element);
    }
    else
    {
      // deactivate active element
      director.deactivate(active_element);
      
      // making previous element to be an active
      director.activate(previous_element);
      
    }
  }
  
  // deactivate word when it not on start of line
  else if((director.getParentWord() != false)
          &&(director.getParentWord().previousSibling.className != 'wet-line-start'))
  {
    var word = director.getParentWord();
    
    var before_word = director.getBeforeEntity(word);
    
    director.activate(before_word);
    
    director.deactivate(active_element);
    
    word.innerHTML = divider.concat(word);	
    
    word.className = 'wet-word';	
  }
  // deactivate word when it is on start of line
  else if((director.getParentWord() != false)
          &&(director.getParentWord().previousSibling.className == 'wet-line-start'))
  {
    var word = director.getParentWord();
    
    var before_word = director.getBeforeEntity(word);
    
    director.activate(before_word);
    
    director.deactivate(active_element);
    
    word.innerHTML = divider.concat(word);
    
    director.makeItWord(word);
  }
  else
  {
    // deactivate a line and going to the previous line
    if(director.isCursorFirstOnALine('active'))
    {      
      var parent_s = active_element.parentNode;
      
      var previous_line = director.getBeforeEntity(parent_s);
      
      if(previous_line != false)
      {
        director.deactivate(active_element);
        
        // !!!!!!!!!! change this.current_line
        // deactivate 'enter' pseudo sign
        options.object.current_line[options.index]--;
        word = previous_line.childNodes[previous_line.childNodes.length-1];
        
        
        // if last element in previouse line not a word
        if(director.isSignifier(word) == false)
        {
          // explode content
          word.innerHTML = divider.divide(word);
        }
        // make active last char of word
        var last_word_in_line = director.getLastElement(previous_line);
        
        // if last element in a line is a word, then make it perent with active last 
        // child:
        if(director.isWord(last_word_in_line))
        {
          director.makeItParentWord(last_word_in_line);
          
          var last_char_in_word = director.getLastElement(last_word_in_line);
            
          director.activate(last_char_in_word);
        }
        // if not, than just activate it
        else
        {
          director.activate(last_word_in_line);
        }
        
        
        // getting active element that must be deactivated
        var active_element = director.getCursorEntity('active');
        
        // getting previose element thet will be active after key pressed
        var previous_element = director.getBeforeEntity(active_element);
        
        // if we are not at start of previouse line:
        if(previous_element != false)
        {
          // if the last entity of line is word
          if(director.isWord(active_element))
          {
            director.makeItParentWord(active_element)
            
            var last_char_in_word = director.getLastElement(active_element);
            console.log(last_char_in_word);
            
            director.activate(last_char_in_word);
            
          }
        }
      }
    }
  }
}

var module = new Module.getInstance();
module.addFunction('37', 'left_arrow');
	
/**
  * @function backspase
  * @author Ivan Kaduk
  * @copyright Ivan Kaduk 2016.
  * @license cc-by-nc-sa 4.0
  * @desc this module need to emulate "space" key features.
  * @param {object} options.object - entity of editors object.
  * @param {int} options.index - index of current editor element on document.
  * @memberof Module
  * @instance
  */
  Module.getInstance().space = function(options)
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
    
    // if cursor on a line start
    if(!active_char)
    {
      active_char = document.getElementsByClassName('wet-'+'line-start')[line_number];
    }
    
    var active_char_index = 0;
  
    var chars = active_char.parentElement.childNodes.length || false;
    
    var space = director.create('space', ' ', 'active');
  
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
      else
      {
        this.deletePrevioseCursor(concrete_entity);
        
        active_char.parentElement.appendChild(space);
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
        word.parentNode.insertBefore(space ,word.nextSibling);
      
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
        active_char.parentNode.insertBefore(space ,active_char.nextSibling);
        
        director.deactivate(active_char);
        
      }
      else
      {
        this.deletePrevioseCursor(concrete_entity);        
        if(active_char.nextSibling)
        {
          active_char.parentNode.insertBefore(space ,active_char.nextSibling);
        }
        else
        {
          active_char.parentElement.appendChild(space);
        }
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