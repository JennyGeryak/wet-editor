## Classes

<dl>
<dt><a href="#Editor">Editor</a> ⇐ <code><a href="#Observable">Observable</a></code></dt>
<dd><p>this class is creating editor object</p>
</dd>
<dt><a href="#Char_Class_Generator">Char_Class_Generator</a></dt>
<dd><p>this class is returning string for elements class</p>
</dd>
<dt><a href="#Observable">Observable</a></dt>
<dd><p>standart subject for obsrver</p>
</dd>
<dt><a href="#Key_Observer">Key_Observer</a></dt>
<dd><p>it is reaction of observer on key event</p>
</dd>
<dt><a href="#Key_Scope">Key_Scope</a></dt>
<dd><p>it singelton which contain current key combinations</p>
</dd>
<dt><a href="#Module">Module</a></dt>
<dd><p>it is solution that helps to create additional mudules more easy and implement it to application</p>
</dd>
<dt><a href="#Divider">Divider</a></dt>
<dd><p>this class is need to separating character by character or to concate them into one word</p>
</dd>
</dl>

<a name="Editor"></a>

## Editor ⇐ <code>[Observable](#Observable)</code>
this class is creating editor object

**Kind**: global class  
**Extends:** <code>[Observable](#Observable)</code>  
**Version**: 1.0.1  
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
<a name="Observable"></a>

## Observable
standart subject for obsrver

**Kind**: global class  
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
it singelton which contain current key combinations

**Kind**: global class  
**Version**: 1.0.0  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  
<a name="Module"></a>

## Module
it is solution that helps to create additional mudules more easy and implement it to application

**Kind**: global class  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

* [Module](#Module)
    * [.backspase()](#Module+backspase)
    * [.left_arrow()](#Module+left_arrow)
    * [.backspase()](#Module+backspase)
    * [.enter()](#Module+enter)

<a name="Module+backspase"></a>

### module.backspase()
this module need to emulate "backspase" key features

**Kind**: instance method of <code>[Module](#Module)</code>  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

| Param | Type | Description |
| --- | --- | --- |
| options.object | <code>object</code> | entity of editors object |
| options.index | <code>int</code> | index of current editor element on document |

<a name="Module+left_arrow"></a>

### module.left_arrow()
this module need to emulate "left arrow" key features

**Kind**: instance method of <code>[Module](#Module)</code>  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

| Param | Type | Description |
| --- | --- | --- |
| options.object | <code>object</code> | entity of editors object |
| options.index | <code>int</code> | index of current editor element on document |

<a name="Module+backspase"></a>

### module.backspase()
this module need to emulate "space" key features

**Kind**: instance method of <code>[Module](#Module)</code>  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

| Param | Type | Description |
| --- | --- | --- |
| options.object | <code>object</code> | entity of editors object |
| options.index | <code>int</code> | index of current editor element on document |

<a name="Module+enter"></a>

### module.enter()
this module need to emulate "enter" key features

**Kind**: instance method of <code>[Module](#Module)</code>  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  

| Param | Type | Description |
| --- | --- | --- |
| options.object | <code>object</code> | entity of editors object |
| options.index | <code>int</code> | index of current editor element on document |

<a name="Divider"></a>

## Divider
this class is need to separating character by character or to concate them into one word

**Kind**: global class  
**Version**: 1.0.0  
**Author:** Ivan Kaduk  
**License**: cc-by-nc-sa 4.0  
**Copyright**: Ivan Kaduk 2016.  
<a name="mainClass"></a>

## .mainClass(user_char)
adding main class

**Kind**: instance function  
**Access:** public  
**Mamberof**: Char_Class_Generator  

| Param | Type | Description |
| --- | --- | --- |
| user_char | <code>String</code> | char from cher buffer |

<a name="subClass"></a>

## .subClass(user_char)
adding subclass to main

**Kind**: instance function  
**Access:** public  
**Mamberof**: Char_Class_Generator  

| Param | Type | Description |
| --- | --- | --- |
| user_char | <code>String</code> | char from cher buffer |

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
addpace between classes

**Kind**: instance function  
**Access:** public  
**Mamberof**: Char_Class_Generator  
<a name="generate"></a>

## .generate()
builder function

**Kind**: instance function  
**Access:** public  
**Mamberof**: Char_Class_Generator  
<a name="subscribe"></a>

## .subscribe(observer)
for subscribing observers

**Kind**: instance function  
**Access:** public  
**Mamberof**: Observable  

| Param | Type | Description |
| --- | --- | --- |
| observer | <code>Object</code> | object wich containe observer instans |

<a name="unsubscribe"></a>

## .unsubscribe(observer)
for unsubscribing observers

**Kind**: instance function  
**Access:** public  
**Mamberof**: Observable  

| Param | Type | Description |
| --- | --- | --- |
| observer | <code>Object</code> | object wich containe observer instans |

<a name="publish"></a>

## .publish(data, counter)
calling observers constructors

**Kind**: instance function  
**Access:** public  
**Mamberof**: Observable  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | some objects collection to do some actions with |
| counter | <code>int</code> | index of sub object in data collection |

<a name="keyDown"></a>

## .keyDown(e)
catching code frome event and adding it to key map, on some action

**Kind**: instance function  
**Access:** public  
**Mamberof**: Key_Scope  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | event which contain code of pressed button |

<a name="keyUp"></a>

## .keyUp(e)
catching code frome event and removing it to key map, on some action

**Kind**: instance function  
**Access:** public  
**Mamberof**: Key_Scope  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | event which contain code of pressed button |

<a name="getKeyMap"></a>

## .getKeyMap() ⇒ <code>Array</code>
return key map

**Kind**: instance function  
**Returns**: <code>Array</code> - - key map content  
**Access:** public  
**Mamberof**: Key_Scope  
<a name="getStringKeyMap"></a>

## .getStringKeyMap() ⇒ <code>String</code>
return key map like a string

**Kind**: instance function  
**Returns**: <code>String</code> - - key map content  
**Access:** public  
**Mamberof**: Key_Scope  
<a name="clearKeyMap"></a>

## .clearKeyMap()
refreshing key map

**Kind**: instance function  
**Access:** public  
**Mamberof**: Key_Scope  
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
list of all hotkeys and functions

**Kind**: instance function  
**Returns**: <code>Array</code> - - array of hotkeys and functions  
**Access:** public  
**Mamberof**: Module  
<a name="runFunction"></a>

## .runFunction(combination)
this function initializing the function according pressed hotkey

**Kind**: instance function  
**Access:** public  
**Mamberof**: Module  

| Param | Type | Description |
| --- | --- | --- |
| combination | <code>String</code> | combination of keys converted to a string |

<a name="setOptions"></a>

## .setOptions(user_options)
adding arguments before function will be initialized

**Kind**: instance function  
**Access:** public  
**Mamberof**: Module  

| Param | Type | Description |
| --- | --- | --- |
| user_options | <code>Array</code> | array of arguments for function |

<a name="divide"></a>

## .divide(word) ⇒ <code>String</code>
separating word to a single characters in container

**Kind**: instance function  
**Returns**: <code>String</code> - - string with html code that containe separated characters  
**Mamberof**: Divider  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>Object</code> | container that contain string with word that must be exploded |

<a name="concat"></a>

## .concat(word) ⇒ <code>String</code>
joining all separate characters to a one string

**Kind**: instance function  
**Returns**: <code>String</code> - - string with word  
**Mamberof**: Divider  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>Object</code> | container that contain separated characters with word that must be exploded |

<a name="bisect"></a>

## .bisect(word) ⇒ <code>Array</code>
divide a massive of characters in the word to two parts

**Kind**: instance function  
**Returns**: <code>Array</code> - - string with word  
**Mamberof**: Divider  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>Object</code> | container that contain separated characters with word that must be exploded |

