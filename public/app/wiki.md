## Classes

<dl>
<dt><a href="#Editor">Editor</a> ⇐ <code><a href="#Observable">Observable</a></code></dt>
<dd><p>It is main class with constructor. Need for initialization of 
  work space of code editor.</p>
</dd>
<dt><a href="#Char_Class_Generator">Char_Class_Generator</a></dt>
<dd><p>this class is returning string for elements class</p>
</dd>
<dt><a href="#Observable">Observable</a></dt>
<dd><p>standart subject for obsrver.</p>
</dd>
<dt><a href="#Key_Observer">Key_Observer</a></dt>
<dd><p>it is reaction of observer on key event</p>
</dd>
<dt><a href="#Key_Scope">Key_Scope</a></dt>
<dd><p>it is singelton which contain current key combinations, 
    and have functional to work with it.</p>
</dd>
<dt><a href="#Module">Module</a></dt>
<dd><p>it is solution that helps to create additional mudules more 
    easely and implement it to application.</p>
</dd>
<dt><a href="#Divider">Divider</a></dt>
<dd><p>this class is need to separating character by character or to 
    concate them into one word.</p>
</dd>
<dt><a href="#Director">Director</a></dt>
<dd><p>This class need for manipulating objects on code editors work space.</p>
</dd>
</dl>

<a name="divide"></a>

## .divide(word) ⇒ <code>String</code>
separating word to a single characters in container.

**Kind**: instance function  
**Returns**: <code>String</code> - - string with html code that containe separated characters.  
**Mamberof**: Divider  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>Object</code> | container that contain string with word that must be        exploded. |

<a name="Editor"></a>

## Editor ⇐ <code>[Observable](#Observable)</code>
It is main class with constructor. Need for initialization of 
  work space of code editor.

**Kind**: global class  
**Extends:** <code>[Observable](#Observable)</code>  
**Version**: 1.0.2  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  
<a name="new_Editor_new"></a>

### new Editor(className)

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | class of div wich containe spoiler child elements. |

**Example**  
```js
var spoiler = new Spoiler('spoiler','opened', 1);
```
<a name="Char_Class_Generator"></a>

## Char_Class_Generator
this class is returning string for elements class

**Kind**: global class  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  
<a name="mainClass"></a>

## .mainClass(user_char)
adding main class.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Char_Class_Generator  

| Param | Type | Description |
| --- | --- | --- |
| user_char | <code>String</code> | char from cher buffer . |

<a name="subClass"></a>

## .subClass(user_char)
adding subclass to main class.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Char_Class_Generator  

| Param | Type | Description |
| --- | --- | --- |
| user_char | <code>String</code> | char from character buffer. |

<a name="setPrefix"></a>

## .setPrefix(user_prefix)
setting prefix, which will be adding to every class

**Kind**: instance function  
**Access:** public  
**Mamberof**: Char_Class_Generator  

| Param | Type | Description |
| --- | --- | --- |
| user_prefix | <code>String</code> | prefix for class |

<a name="space"></a>

## .space()
adding space between classes.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Char_Class_Generator  
<a name="generate"></a>

## .generate()
builder function

**Kind**: instance function  
**Access:** public  
**Mamberof**: Char_Class_Generator  
<a name="Observable"></a>

## Observable
standart subject for obsrver.

**Kind**: global class  
<a name="subscribe"></a>

## .subscribe(observer)
need for subscribing observers.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Observable  

| Param | Type | Description |
| --- | --- | --- |
| observer | <code>Object</code> | object wich containe observer instans. |

<a name="unsubscribe"></a>

## .unsubscribe(observer)
need for unsubscribing observers.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Observable  

| Param | Type | Description |
| --- | --- | --- |
| observer | <code>Object</code> | object wich containe observer instans. |

<a name="publish"></a>

## .publish(data, counter)
calling observers constructors.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Observable  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | some objects collection to do some actions with. |
| counter | <code>int</code> | index of sub object in data collection. |

<a name="Key_Observer"></a>

## Key_Observer
it is reaction of observer on key event

**Kind**: global class  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  
<a name="new_Key_Observer_new"></a>

### new Key_Observer(data, scope, index, event, condition)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>[Editor](#Editor)</code> | getting main object |
| scope | <code>[Key_Scope](#Key_Scope)</code> | key map singelton |
| index | <code>int</code> | index of current active editor element |
| event | <code>event</code> | object that contain event data |
| condition | <code>String</code> | condition of key: pressed or released |

<a name="Key_Scope"></a>

## Key_Scope
it is singelton which contain current key combinations, 
    and have functional to work with it.

**Kind**: global class  
**Version**: 1.0.0  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  
<a name="keyDown"></a>

## .keyDown(e)
catching code frome event and adding it to key map, on some action.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Key_Scope  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | event which contain code of pressed button. |

<a name="keyUp"></a>

## .keyUp(e)
catching code frome event and removing it to key map, on some action.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Key_Scope  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | event which contain code of pressed button. |

<a name="getKeyMap"></a>

## .getKeyMap() ⇒ <code>Array</code>
return key map.

**Kind**: instance function  
**Returns**: <code>Array</code> - - key map content.  
**Access:** public  
**Mamberof**: Key_Scope  
<a name="getStringKeyMap"></a>

## .getStringKeyMap() ⇒ <code>String</code>
return key map like a string.

**Kind**: instance function  
**Returns**: <code>String</code> - - key map content.  
**Access:** public  
**Mamberof**: Key_Scope  
<a name="clearKeyMap"></a>

## .clearKeyMap()
refreshing key map.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Key_Scope  
<a name="Module"></a>

## Module
it is solution that helps to create additional mudules more 
    easely and implement it to application.

**Kind**: global class  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

* [Module](#Module)
    * [.key()](#Module+key)
    * [.backspase()](#Module+backspase)
    * [.left_arrow()](#Module+left_arrow)
    * [.backspase()](#Module+backspase)
    * [.enter()](#Module+enter)

<a name="Module+key"></a>

### module.key()
this module need to adding characters and symbols to the work space.

**Kind**: instance method of <code>[Module](#Module)</code>  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

| Param | Type | Description |
| --- | --- | --- |
| options.object | <code>object</code> | entity of editors object. |
| options.index | <code>int</code> | index of current editor element on document. |

<a name="Module+backspase"></a>

### module.backspase()
this module need to emulate "backspase" key features.

**Kind**: instance method of <code>[Module](#Module)</code>  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

| Param | Type | Description |
| --- | --- | --- |
| options.object | <code>object</code> | entity of editors object. |
| options.index | <code>int</code> | index of current editor element on document. |

<a name="Module+left_arrow"></a>

### module.left_arrow()
this module need to emulate "left arrow" key features.

**Kind**: instance method of <code>[Module](#Module)</code>  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

| Param | Type | Description |
| --- | --- | --- |
| options.object | <code>object</code> | entity of editors object. |
| options.index | <code>int</code> | index of current editor element on document. |

<a name="Module+backspase"></a>

### module.backspase()
this module need to emulate "space" key features.

**Kind**: instance method of <code>[Module](#Module)</code>  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

| Param | Type | Description |
| --- | --- | --- |
| options.object | <code>object</code> | entity of editors object. |
| options.index | <code>int</code> | index of current editor element on document. |

<a name="Module+enter"></a>

### module.enter()
this module need to emulate "enter" key features.

**Kind**: instance method of <code>[Module](#Module)</code>  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

| Param | Type | Description |
| --- | --- | --- |
| options.object | <code>object</code> | entity of editors object. |
| options.index | <code>int</code> | index of current editor element on document. |

<a name="addFunction"></a>

## .addFunction(key_combination, function_name)
this method need for adding new functions and hotkeys for them

**Kind**: instance function  
**Access:** public  
**Mamberof**: Module  

| Param | Type | Description |
| --- | --- | --- |
| key_combination | <code>String</code> | string of the key combination |
| function_name | <code>String</code> | function which will be added to a module |

<a name="dump"></a>

## .dump() ⇒ <code>Array</code>
returns list of all hotkeys and functions.

**Kind**: instance function  
**Returns**: <code>Array</code> - - array of hotkeys and function.  
**Access:** public  
**Mamberof**: Module  
<a name="runFunction"></a>

## .runFunction(combination)
this function initializing the function according pressed hotkey.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Module  

| Param | Type | Description |
| --- | --- | --- |
| combination | <code>String</code> | combination of keys converted to a string. |

<a name="setOptions"></a>

## .setOptions(user_options)
adding arguments before function will be initialized.

**Kind**: instance function  
**Access:** public  
**Mamberof**: Module  

| Param | Type | Description |
| --- | --- | --- |
| user_options | <code>Array</code> | array of arguments for function. |

<a name="Divider"></a>

## Divider
this class is need to separating character by character or to 
    concate them into one word.

**Kind**: global class  
**Version**: 1.0.0  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  
<a name="concat"></a>

## .concat(word) ⇒ <code>String</code>
joining all separate characters to a one string.

**Kind**: instance function  
**Returns**: <code>String</code> - - string with word.  
**Mamberof**: Divider  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>Object</code> | container that contain separated characters with word        that must be exploded. |

<a name="bisect"></a>

## .bisect(word) ⇒ <code>Array</code>
divide a massive of characters in the word to two parts.

**Kind**: instance function  
**Returns**: <code>Array</code> - - string with word.  
**Mamberof**: Divider  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>Object</code> | container that contain separated characters with word       that must be exploded. |

<a name="Director"></a>

## Director
This class need for manipulating objects on code editors work space.

**Kind**: global class  
**Version**: 1.0.0  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  
<a name="new_Director_new"></a>

### new Director(concrete_entity, prefix, active)

| Param | Type | Description |
| --- | --- | --- |
| concrete_entity | <code>object</code> | object with work space. |
| prefix | <code>String</code> | prefix for elements classes. |
| active | <code>String</code> | cursors active class name. |

**Example**  
```js
director.getCursorEntity('active');
```
<a name="isThereAnyActiveWords"></a>

## .isThereAnyActiveWords() ⇒ <code>bool</code>
inspect editor for an active words.

**Kind**: instance function  
**Returns**: <code>bool</code> - - if we have some active word.  
**Mamberof**: Director  
<a name="isCursorFirstOnALine"></a>

## .isCursorFirstOnALine(cursor_marker) ⇒ <code>bool</code>
chacking is cursor plased on start of line.

**Kind**: instance function  
**Returns**: <code>bool</code> - - entity of previouse for active element.  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| cursor_marker | <code>String</code> | marker of cursor. |

<a name="isCursorBeforeWord"></a>

## .isCursorBeforeWord(cursor_marker) ⇒ <code>bool</code>
chacking, is cursor placed before word.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| cursor_marker | <code>object</code> | marker of active element. |

<a name="isStart"></a>

## .isStart(element) ⇒ <code>bool</code>
chacking element, is it start one.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | html element for checking. |

<a name="isSignifier"></a>

## .isSignifier(element) ⇒ <code>bool</code>
chacking element is signifer.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | html element for checking. |

<a name="isWord"></a>

## .isWord(element) ⇒ <code>bool</code>
chacking element is it word.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | html element for checking. |

<a name="isParentWord"></a>

## .isParentWord(element) ⇒ <code>bool</code>
chacking element is it word.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | html element for checking |

<a name="isCharacter"></a>

## .isCharacter(element) ⇒ <code>bool</code>
checking element is it character.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | html element for checking. |

<a name="isCursoreBeforeWord"></a>

## .isCursoreBeforeWord(element) ⇒ <code>bool</code>
checking element is it before word.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | html element for checking. |

<a name="getCursorEntity"></a>

## .getCursorEntity(cursor_marker) ⇒ <code>object</code>
geting cursor entity from code.

**Kind**: instance function  
**Returns**: <code>object</code> - - entity of active element.  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| cursor_marker | <code>String</code> | marker of active element. |

<a name="getBeforeEntity"></a>

## .getBeforeEntity(cursor_marker) ⇒ <code>object</code>
getting entity that goes before element.

**Kind**: instance function  
**Returns**: <code>object</code> - - entity of previouse elemtnt of active element.  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| cursor_marker | <code>String</code> | marker of active element. |

<a name="getParentWord"></a>

## .getParentWord() ⇒ <code>object</code>
getting parent word entity if it hase.

**Kind**: instance function  
**Returns**: <code>object</code> - - entity of parent word.  
**Mamberof**: Director  
<a name="getLastElement"></a>

## .getLastElement(word) ⇒ <code>object</code>
searching for an last element of word.

**Kind**: instance function  
**Returns**: <code>object</code> - - entity of last element of word.  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>object</code> | entity of word. |

<a name="getCursorPosition"></a>

## .getCursorPosition(cursor) ⇒ <code>number</code>
returning position of cursor inside of word or etc.

**Kind**: instance function  
**Returns**: <code>number</code> - - index of cursor.  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| cursor | <code>object</code> | cursor entity. |

<a name="makeItParentWord"></a>

## .makeItParentWord(before_entity)
making a word an a parent word.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| before_entity | <code>object</code> | element what must became a parent word. |

<a name="makeItWord"></a>

## .makeItWord(element)
give the class name of word.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | element that must became a word. |

<a name="activate"></a>

## .activate(element)
activate a cursor for an element.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | html element for wich will be generated class name        with "active" ending. |

<a name="deactivate"></a>

## .deactivate(element)
deactivate a cursor for an element

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | html element for wich will be generated class name. |

<a name="setClass"></a>

## .setClass(element)
give class according an element.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | html element for wich will be generated class name. |

<a name="deactivatePreviouse"></a>

## .deactivatePreviouse()
deactivating cursor if it on word space.

**Kind**: instance function  
**Mamberof**: Director  
<a name="delete"></a>

## .delete(element)
delete some element.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | html element wich will be deleted. |

<a name="plus"></a>

## .plus(element, content)
add some element after this, if this have a next element.

**Kind**: instance function  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | element after wich will be added content. |
| content | <code>String</code> | content wich will be added after element. |

<a name="create"></a>

## .create(type, content, status) ⇒ <code>object</code>
create some element.

**Kind**: instance function  
**Returns**: <code>object</code> - - entity of created object.  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>object</code> | wich element must be created. |
| content | <code>String</code> | text wich will be in content when it will be created. |
| status | <code>String</code> | is element active or not. |

<a name="createLineStart"></a>

## .createLineStart(content, status) ⇒ <code>object</code>
create start element.

**Kind**: instance function  
**Returns**: <code>object</code> - - entity of created object.  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | text wich will be in content when it will be created. |
| status | <code>String</code> | is element active or not. |

<a name="createWord"></a>

## .createWord(content, status) ⇒ <code>object</code>
create word entity.

**Kind**: instance function  
**Returns**: <code>object</code> - - entity of created object.  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | text wich will be in content when it will be created. |
| status | <code>String</code> | is element active or not. |

<a name="createChar"></a>

## .createChar(content, status) ⇒ <code>object</code>
create character entity.

**Kind**: instance function  
**Returns**: <code>object</code> - - entity of created object.  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | text wich will be in content when it will be created. |
| status | <code>String</code> | is element active or not. |

<a name="createSpace"></a>

## .createSpace(content, status) ⇒ <code>object</code>
create space entity.

**Kind**: instance function  
**Returns**: <code>object</code> - - entity of created object.  
**Mamberof**: Director  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | text wich will be in content when it will be created. |
| status | <code>String</code> | is element active or not. |

