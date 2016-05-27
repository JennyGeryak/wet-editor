var Divider = (function()
{
	function Divider(){
		this.divide = function()
		{
			console.log('divide');
		}
		
		this.concat = function()
		{
			console.log('concat');
		}
	}
	
	return Divider;
})()