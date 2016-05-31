	///////////////////////////////////
	/*          BUILDER              */
	///////////////////////////////////
/**
	* @name Char_Class_Generator
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @License cc-by-nc-sa 4.0
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
		* @desc adding main class
		* @param {String} user_char - char from cher buffer 
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
			return this;
		}

	/**
		* @public
		* @function
		* @name subClass
		* @mamberof Char_Class_Generator
		* @instance
		* @desc adding subclass to main 
		* @param {String} user_char - char from cher buffer 
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
		* @desc addpace between classes
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