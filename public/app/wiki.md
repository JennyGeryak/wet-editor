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
</dl>

## Members

<dl>
<dt><a href="#backspase">backspase</a></dt>
<dd><p>this module need to emulate &quot;backspase&quot; key features</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#mainClass">mainClass(user_char)</a></dt>
<dd><p>adding main class</p>
</dd>
<dt><a href="#subClass">subClass(user_char)</a></dt>
<dd><p>adding subclass to main</p>
</dd>
<dt><a href="#setPrefix">setPrefix(user_prefix)</a></dt>
<dd><p>setting prefix, which will be adding to every class</p>
</dd>
<dt><a href="#space">space()</a></dt>
<dd><p>addpace between classes</p>
</dd>
<dt><a href="#generate">generate()</a></dt>
<dd><p>builder function</p>
</dd>
<dt><a href="#subscribe">subscribe(observer)</a></dt>
<dd><p>for subscribing observers</p>
</dd>
<dt><a href="#unsubscribe">unsubscribe(observer)</a></dt>
<dd><p>for unsubscribing observers</p>
</dd>
<dt><a href="#publish">publish(data, counter)</a></dt>
<dd><p>calling observers constructors</p>
</dd>
<dt><a href="#keyDown">keyDown(e)</a></dt>
<dd><p>catching code frome event and adding it to key map, on some action</p>
</dd>
<dt><a href="#keyUp">keyUp(e)</a></dt>
<dd><p>catching code frome event and removing it to key map, on some action</p>
</dd>
<dt><a href="#getKeyMap">getKeyMap()</a> ⇒ <code>Array</code></dt>
<dd><p>return key map</p>
</dd>
<dt><a href="#getStringKeyMap">getStringKeyMap()</a> ⇒ <code>String</code></dt>
<dd><p>return key map like a string</p>
</dd>
<dt><a href="#clearKeyMap">clearKeyMap()</a></dt>
<dd><p>refreshing key map</p>
</dd>
<dt><a href="#addFunction">addFunction(key_combination, function_name)</a></dt>
<dd><p>this method need for adding new functions and hotkeys for them</p>
</dd>
<dt><a href="#dump">dump()</a> ⇒ <code>Array</code></dt>
<dd><p>list of all hotkeys and functions</p>
</dd>
<dt><a href="#runFunction">runFunction(combination)</a></dt>
<dd><p>this function initializing the function according pressed hotkey</p>
</dd>
<dt><a href="#setOptions">setOptions(user_options)</a></dt>
<dd><p>adding arguments before function will be initialized</p>
</dd>
</dl>

<a name="Editor"></a>

## Editor ⇐ <code>[Observable](#Observable)</code>
this class is creating editor object

**Kind**: global class  
**Extends:** <code>[Observable](#Observable)</code>  
**Version**: 1.0.0  
**Author:** Ivan Kaduk  
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
**Copyright**: Ivan Kaduk 2016.  
<a name="Module"></a>

## Module
it is solution that helps to create additional mudules more easy and implement it to application

**Kind**: global class  
**Author:** Ivan Kaduk  
**Copyright**: Ivan Kaduk 2016.  
<a name="backspase"></a>

## backspase
this module need to emulate "backspase" key features

**Kind**: global variable  
**Author:** Ivan Kaduk  
**Copyright**: Ivan Kaduk 2016.  
<a name="mainClass"></a>

## mainClass(user_char)
adding main class

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| user_char | <code>String</code> | char from cher buffer |

<a name="subClass"></a>

## subClass(user_char)
adding subclass to main

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| user_char | <code>String</code> | char from cher buffer |

<a name="setPrefix"></a>

## setPrefix(user_prefix)
setting prefix, which will be adding to every class

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| user_prefix | <code>String</code> | prefix for class |

<a name="space"></a>

## space()
addpace between classes

**Kind**: global function  
**Access:** public  
<a name="generate"></a>

## generate()
builder function

**Kind**: global function  
**Access:** public  
<a name="subscribe"></a>

## subscribe(observer)
for subscribing observers

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| observer | <code>Object</code> | object wich containe observer instans |

<a name="unsubscribe"></a>

## unsubscribe(observer)
for unsubscribing observers

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| observer | <code>Object</code> | object wich containe observer instans |

<a name="publish"></a>

## publish(data, counter)
calling observers constructors

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | some objects collection to do some actions with |
| counter | <code>int</code> | index of sub object in data collection |

<a name="keyDown"></a>

## keyDown(e)
catching code frome event and adding it to key map, on some action

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | event which contain code of pressed button |

<a name="keyUp"></a>

## keyUp(e)
catching code frome event and removing it to key map, on some action

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | event which contain code of pressed button |

<a name="getKeyMap"></a>

## getKeyMap() ⇒ <code>Array</code>
return key map

**Kind**: global function  
**Returns**: <code>Array</code> - - key map content  
**Access:** public  
<a name="getStringKeyMap"></a>

## getStringKeyMap() ⇒ <code>String</code>
return key map like a string

**Kind**: global function  
**Returns**: <code>String</code> - - key map content  
**Access:** public  
<a name="clearKeyMap"></a>

## clearKeyMap()
refreshing key map

**Kind**: global function  
**Access:** public  
<a name="addFunction"></a>

## addFunction(key_combination, function_name)
this method need for adding new functions and hotkeys for them

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| key_combination | <code>String</code> | string of the key combination |
| function_name | <code>String</code> | function which will be added to a module |

<a name="dump"></a>

## dump() ⇒ <code>Array</code>
list of all hotkeys and functions

**Kind**: global function  
**Returns**: <code>Array</code> - - array of hotkeys and functions  
**Access:** public  
<a name="runFunction"></a>

## runFunction(combination)
this function initializing the function according pressed hotkey

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| combination | <code>String</code> | combination of keys converted to a string |

<a name="setOptions"></a>

## setOptions(user_options)
adding arguments before function will be initialized

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| user_options | <code>Array</code> | array of arguments for function |

