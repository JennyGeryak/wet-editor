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
  * @classdesc this class is creating editor object
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
          this.work_space[i] = document.createElement('div');
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
          this.line[i][this.current_line[i]] = document.createElement('div');
          this.line[i][this.current_line[i]].className = 'line';
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